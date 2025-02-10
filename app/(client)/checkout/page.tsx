import { notFound, redirect } from "next/navigation";

import { getProfileData } from "@/actions/get-profile-data";
import { auth } from "@/auth";
import CheckoutForm from "@/features/client/checkout/components/checkout-form";
import CheckoutSummary from "@/features/client/checkout/components/checkout-summary";
import CheckoutSummaryDropDown from "@/features/client/checkout/components/checkout-summary-drop-down";

const CheckoutPage = async () => {
    const session = await auth();
    if (!session) {
        return redirect("/sign-in");
    }
    const profile = await getProfileData(session.user.id);
    if (!profile) {
        return notFound();
    }
    return (
        <div
            className={
                "p-6 lg:grid grid-cols-2 lg:h-[90vh] lg:py-8 lg:overflow-y-scroll lg:px-24"
            }
        >
            <CheckoutSummaryDropDown />
            <div className={"overflow-y-scroll"}>
                <CheckoutForm defaultValues={profile} />
            </div>
            <section className={"hidden md:block lg:pr-25 lg:pl-10"}>
                <h3 className={"font-bold text-2xl mb-4"}>Order Summary</h3>
                <CheckoutSummary />
            </section>
        </div>
    );
};

export default CheckoutPage;

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileLayout from "@/features/client/user/profile/components/profileLayout";

const ProfilePage = async () => {
    const session = await auth();
    if (!session) {
        return redirect("/sign-in");
    }
    return <ProfileLayout userId={session.user.id} />;
};

export default ProfilePage;

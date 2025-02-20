"use client";

import { useSession } from "next-auth/react";

import { Skeleton } from "@/components/ui/skeleton";
import ComplainCard from "@/features/client/user/complains/components/complain-card";
import { useGetComplains } from "@/features/client/user/complains/use-get-complains";

const ComplainTable = () => {
    const { data: session } = useSession();
    const { data: complains, isLoading } = useGetComplains(
        session?.user?.id ?? "",
    );

    return (
        <div
            className={
                "h-fit p-6 border border-black/50 rounded-lg overflow-y-scroll"
            }
        >
            <h2 className={"mb-4 font-bold text-lg"}>Your Complains</h2>
            <div className={"flex flex-col gap-y-3"}>
                {isLoading &&
                    Array.from({ length: 5 }, (_, idx) => (
                        <Skeleton className={"w-full h-14"} key={idx} />
                    ))}
                {complains && complains.length === 0 && (
                    <p className={"py-2 text-center font-semibold"}>
                        No Complaints
                    </p>
                )}
                {complains &&
                    complains.map((item) => (
                        <ComplainCard data={item} key={item.id} />
                    ))}
            </div>
        </div>
    );
};

export default ComplainTable;

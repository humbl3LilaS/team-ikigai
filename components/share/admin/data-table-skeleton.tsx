import { Skeleton } from "@/components/ui/skeleton";

const DataTableSkeleton = ({ paginationOn }: { paginationOn?: boolean }) => {
    return (
        <div className={"mt-4 flex flex-col gap-y-3"}>
            {new Array(5).fill(0).map((_, idx) => (
                <Skeleton key={idx} className={"w-full h-[80px]"} />
            ))}
            {paginationOn && (
                <div className={"flex items-center justify-between"}>
                    <Skeleton className={"h-[50px] w-[100px]"} />
                    <div>
                        <Skeleton
                            className={"h-[50px] w-[80px] inline-block mr-2"}
                        />
                        <Skeleton
                            className={"h-[50px] w-[80px] inline-block"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTableSkeleton;

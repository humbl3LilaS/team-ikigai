import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div
            className={
                "w-dvw h-[80dvh] md:w-screen md:h-screen flex items-center justify-center"
            }
        >
            <p className={"flex items-center gap-x-3"}>
                <span className={"text-2xl font-bold"}>Loading....</span>
                <span className="block text-lg">
                    <Loader2 className={"animate-spin"} />
                </span>
            </p>
        </div>
    );
};

export default Loading;

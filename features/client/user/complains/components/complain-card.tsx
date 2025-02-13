import { TComplainDetails } from "@/features/client/user/complains/actions/get-complains";
import ComplainDialog from "@/features/client/user/complains/components/complain-dialog";

const ComplainCard = ({ data }: { data: TComplainDetails }) => {
    return (
        <div
            className={
                "flex items-center justify-between p-4 border border-black/50 rounded-lg"
            }
        >
            <ComplainDialog data={data} />
            <p className={"capitalize text-sm"}>{data.status.toLowerCase()}</p>
        </div>
    );
};

export default ComplainCard;

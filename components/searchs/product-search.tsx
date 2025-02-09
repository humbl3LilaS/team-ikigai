import { X } from "lucide-react";

const ProductSearch = () => {
    return (
        <>
            <div className="bg-black/5 flex w-full items-center gap-1 rounded-md px-3">
                <input
                    className="focus:outline-none w-full min-h-7 bg-transparent text-black"
                    placeholder="Search..."
                />
                <X className="p-1 size-7 text-red-600 cursor-pointer" />
            </div>
        </>
    );
};

export default ProductSearch;

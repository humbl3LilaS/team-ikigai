import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface Props{
    handleSearch:()=>void
}

const ProductSearch = ({handleSearch}:Props) => {
    const [searchOpen,setSearchOpen] = useState(false);

    const [searchValue,setSearchValue] = useState('');
    const handleSearchFunc = ()=>{
        handleSearch();
        setSearchValue('');
    }
   
   

    return (
        <>
            <div className="bg-black/5 flex gap-2 rounded-lg px-2">
                
                    <input
                        className="focus:outline-none w-full bg-transparent text-black"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                        onFocus={()=>setSearchOpen(true)}
                    />
                    <button onClick={handleSearchFunc}>
                        <X className="p-1 size-7 text-red-600 cursor-pointer"/>
                    </button>
        
                
            </div>
        </>
    );
};

export default ProductSearch;

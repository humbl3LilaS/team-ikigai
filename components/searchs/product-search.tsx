import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Product, useProductContext } from "@/features/category/contexts/product-context";
interface Props{
    handleSearch:()=>void
}

const ProductSearch = ({handleSearch}:Props) => {
    const [searchValue,setSearchValue] = useState("");
    const router = useRouter();
    const [filterProducts,setFilterProducts] = useState<Product[]>([]);
    const { products } = useProductContext();
    useEffect(()=>{
        setFilterProducts(products);
    },[products]);
    const handleNavigate = (route:string)=>{
        handleSearch();
        router.push(`/product/${route}`);
    };

    const handleSearchFunc = (e:string)=>{
        
        setSearchValue(e);

        const value = e.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
        const existProduct = products.filter((product)=>product.brand.replace(/[^a-zA-Z0-9]/g,"").toLowerCase().includes(value) || product.category.replace(/[^a-zA-Z0-9]/g,"").toLowerCase().includes(value) || product.name.replace(/[^a-zA-Z0-9]/g,"").toLowerCase().includes(value));

        if(existProduct){
            setFilterProducts(existProduct);
        }
    };   
  

    const handleClick = (e:React.MouseEvent)=>{
        e.stopPropagation();
    };

    return (
        <>
            <div className="bg-black/5 fixed backdrop-blur-lg inset-0 z-50 px-5" onClick={handleSearch}>
                <div onClick={handleClick} className="absolute w-full py-10 px-10 h-3/5 items-center max-w-lg rounded-lg flex flex-col gap-5 top-14 left-[50%] translate-x-[-50%]">
                    <div className="flex gap-2 w-full px-4 bg-white rounded-lg">
                        <input
                                className="focus:outline-none w-full min-h-10 sm:min-h-12 bg-transparent text-black"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={(e)=>handleSearchFunc(e.target.value)}
                                // onFocus={()=>setSearchOpen(true)}
                                autoFocus
                            />
                            <button onClick={()=>setSearchValue("")}>
                                <X className="p-1 size-7 text-red-600 cursor-pointer"/>
                            </button>
                    </div>

                    <div className="max-w-lg p-2 bg-white w-full rounded-md mx-auto">
                        <ul className="flex flex-col gap-3">
                            {
                                searchValue.length > 0 && filterProducts.length <= 0 ? 
                                <li className="text-gray-400 text-sm">No Product Found</li> : 
                                    filterProducts.length > 0 && searchValue.length > 0 ? filterProducts.map((item)=>(
                                    <li key={item.id} onClick={()=>handleNavigate(item.id)} className="px-5 py-3 text-black rounded-sm font-bold hover:bg-gray-200 text-sm border-b-[1px] sm:text-md hover:text-blue-500 flex justify-between cursor-pointer">
                                        <p>{item.name}</p>
                                        <p>{item.category}</p>
                                    </li>
                                )) : searchValue.length <= 0 || filterProducts.length > 0 ? products.map((item)=>(
                                    <li key={item.id} onClick={()=>handleNavigate(item.id)} className="px-5 py-3 text-black rounded-sm font-bold hover:bg-gray-200 text-sm border-b-[1px] sm:text-md hover:text-blue-500 flex justify-between cursor-pointer">
                                        <p>{item.name}</p>
                                        <p>{item.category}</p>
                                    </li>
                                )) : <></>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductSearch;

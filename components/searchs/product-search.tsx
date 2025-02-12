"use client";

import debounce from "debounce";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { getAllProducts } from "@/features/client/category/actions/get-products";
import {
    Product,
} from "@/features/client/category/contexts/product-context";


const ProductSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const [openSearch ,setOpenSearch] = useState(false);
    const [products,setProducts] = useState<Product[]>([]);
    const router = useRouter();
    const [filterProducts, setFilterProducts] = useState<Product[]>([]);
    

    useEffect(() => {
        const fetchProduct = async ()=>{
            const products = await getAllProducts();
            setProducts(products as Product[]);
        };
       fetchProduct();
    }, []);

    useEffect(()=>{
        if(!openSearch){
            setSearchValue("");
        }
    },[openSearch]);

    const handleNavigate = (route: string) => {
        router.push(`/product/${route}`);
        setOpenSearch(!openSearch);
    };

    const handleDebounceSearch = useCallback(
        debounce((e: string) => {
            const value = e.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const existProduct = products.filter(
                (product) =>
                    product.brand
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toLowerCase()
                        .includes(value) ||
                    product.category
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toLowerCase()
                        .includes(value) ||
                    product.name
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toLowerCase()
                        .includes(value),
            );
            setFilterProducts(existProduct);
            
        }, 600), 
        [products],
    );

    const handleSearchFunc = (e:string)=>{
        setSearchValue(e);
        handleDebounceSearch(e);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleOpenSearch = ()=>{
        setOpenSearch(!openSearch);
    };

    return (
        <>
            <button className="flex gap-1 md:gap-3 w-full bg-gray-100 items-center md:bg-white md:border md:py-1.5 md:px-3 py-1 px-2 rounded-md" onClick={handleOpenSearch}>
                <input className="md:hidden focus:outline-none w-full bg-transparent " placeholder="search..." />
                <Search className="text-gray-400 size-5 hover:text-blue-600" />
            </button>
            {
                openSearch &&
                <div
                className="bg-black/5 fixed backdrop-blur-lg inset-0 z-50"
                onClick={handleOpenSearch}
            >
                <div
                    onClick={handleClick}
                    className="absolute w-[90%] md:w-full p-2 items-center max-h-[450px] md:max-h-[500px] max-w-lg rounded-lg flex flex-col gap-5 top-14 left-[50%] translate-x-[-50%]"
                >
                    <div className="flex gap-2 w-full px-4 bg-white rounded-lg">
                        <input
                            className="focus:outline-none w-full min-h-10 sm:min-h-12 bg-transparent text-black"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => handleSearchFunc(e.target.value)}
                            autoFocus
                        />
                        {
                            searchValue.length > 0 && 
                            <button onClick={() => setSearchValue("")}>
                            <X className="p-1 size-7 text-red-600 cursor-pointer" />
                        </button>
                        }
                    </div>

                    <div className="max-w-lg p-2 bg-white py-5 h-full max-h-[450px]  md:max-h-[500px] overflow-auto w-full rounded-md mx-auto">
                        <ul className="flex flex-col gap-3">
                            { searchValue.length > 0 &&
                            filterProducts.length <= 0 ? (
                                <li className="text-gray-400 text-sm">
                                    No Product Found
                                </li>
                            ) : filterProducts.length > 0 &&
                              searchValue.length > 0 ? (
                                filterProducts.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => handleNavigate(item.id)}
                                        className="px-5 py-3 text-black rounded-sm font-bold hover:bg-gray-100 text-sm border-b-[1px] sm:text-md hover:text-blue-500 flex justify-between cursor-pointer"
                                    >
                                        <p>{item.name}</p>
                                        <p className="hidden sm:block text-gray-400">{item.category}</p>
                                    </li>
                                ))
                            ) : searchValue.length <= 0 ||
                              filterProducts.length > 0 ? (
                                products.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => handleNavigate(item.id)}
                                        className="px-5 py-3 text-black rounded-sm font-bold hover:bg-gray-100 text-sm border-b-[1px] sm:text-md hover:text-blue-500 flex justify-between cursor-pointer"
                                    >
                                        <p>{item.name}</p>
                                        <p className="hidden sm:block text-gray-400">{item.category}</p>
                                    </li>
                                ))
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default ProductSearch;

'use client';

import { useEffect, useState } from "react";
import { getProductByWareHouseId, getWareHouseById, TWarehouse } from "../actions/get-warehouses";
import { useRouter } from "next/navigation";
import { IWarehouses } from "@/database/schema";

interface Props {
  productName:string,
  category:string,
  brand:string,
  stock:number
}

const WareHouseDetail = ({id}:{id:string}) => {
  const [products,setProducts] = useState<Props[]>([]);
  const [warehouseDetail,setWarehouseDetail] = useState<IWarehouses>();
  const router = useRouter();

  const handleGoBack = ()=>{
    router.back();
  }
    useEffect(()=>{
        const fetchData = async ()=>{
            // const product = await getProductByWareHouseId(id);
            // const warehouse = await getWareHouseById(id);
            const [warehouse,product] = await Promise.all([
              getWareHouseById(id),
              getProductByWareHouseId(id)
            ])
            setProducts(product);
            setWarehouseDetail(warehouse[0] as IWarehouses);
        }
        fetchData();
    },[id])
    console.log(warehouseDetail);
  return (
    <>
      <div className=" mt-20 px-10">
        <div className="flex gap-4 p-4 font-bold text-xl">
            <span>{warehouseDetail?.region}</span>
            <span>&gt;</span>
            <span>{warehouseDetail?.city}</span>
            <span>&gt;</span>
            <span>{warehouseDetail?.address}</span>
        </div>
        <table className="w-full text-start">
          <thead>
            <tr className="text-start bg-gray-200">
              <th className="text-start px-3 py-2">Product Name</th>
              <th className="text-start px-3 py-2" >Category</th>
              <th className="text-start px-3 py-2" >Brand</th>
              <th className="text-start px-3 py-2" >Stock</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index)=>(
              <tr className="border-b" key={index}>
                <td className="px-3 py-2 ">{product.productName}</td>
                <td className="px-3 py-2">{product.category}</td>
                <td className="px-3 py-2">{product.brand}</td>
                <td className="px-3 py-2">{product.stock}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <button onClick={handleGoBack} className="px-4 mt-5 text-white w-full bg-[#2c3e50] py-2 mx-auto rounded-lg font-oswald">Back</button>
      </div>
    </>
  )
}

export default WareHouseDetail
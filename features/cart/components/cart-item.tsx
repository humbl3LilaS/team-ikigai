import React from 'react'


const CartItem = () => {
  return (
   <>
        <div className='flex items-center gap-x-4 md:justify-between'>
        <div className="flex items-center w-full gap-x-4 md:justify-between">
                    <div className={"aspect-square w-20"}>
                        <span className=''>Image</span>
                    </div>
                    <div className={"md:flex-1"}>
                        <h3 className={"flex items-center justify-between uppercase  gap-x-4"}>
                            <span className={"font-bold text-lg line-clamp-1"}>Name</span>
                            <button className='text-sm'>
                                remove
                            </button>
                        </h3>
                        <p className={"flex items-center gap-x-4"}>
                            <span className={"text-sm"}>Color: </span>
                            <span className={"sr-only"}>    </span>
                            <span
                                className={"block w-6 aspect-square rounded-full"}
                            />
                        </p>
                        <p className={"text-sm"}>
                            <span>Size: </span>
                            <span className={"capitalize"}>S</span>
                        </p>
                        <p className={"text-sm"}>
                            <span>Quantity: </span>
                            <span>3</span>
                        </p>
                        <div className={"flex items-center justify-between"}>
                            <p className={"text-xl font-bold"}>Total Price</p>
                        </div>
                    </div>
                </div>
        </div>
   </>
  )
}

export default CartItem
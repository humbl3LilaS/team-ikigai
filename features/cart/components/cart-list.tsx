import React from 'react'
import CartItem from './cart-item';

const CartList = () => {
    const cart : number[] = [];
  return (
    <>
        <div className='mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg md:col-span-2'>
            {cart.length === 0  && (
                <div className='flex items-center justify-center'>
                    <h3>Cart is empty!</h3>
                </div>
            )}

            {/* {
                 cart.length > 0 && (
                    cart.map((item) => <CartItem/>)
                 )
            } */}

            <CartItem/>
        </div>
    </>
  )
}

export default CartList
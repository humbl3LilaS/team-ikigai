"use client";
type AddToCartBtnProps = {
    data: {
        id: string;
    };
};
const AddToCartBtn = ({ data }: AddToCartBtnProps) => {
    console.log(data);
    return <div></div>;
};

export default AddToCartBtn;

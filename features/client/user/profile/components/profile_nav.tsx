import { User2Icon, ShoppingCart, MessageCircleDashed } from "lucide-react";
import Link from "next/link";

export const ProfileCard = () => {
    return (
        <div className="w-[100%] bg-gray-100 rounded-lg p-4 text-center">
            {/* Navigation Links */}
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/profile/details" className="">
                            <h5 className="w-full flex p-1 rounded hover:bg-gray-200 text-gray-700 text-start   ">
                                <User2Icon
                                    size={25}
                                    className="mr-3"
                                ></User2Icon>{" "}
                                Account Details
                            </h5>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/orders" className="">
                            <h5 className="w-full flex  p-1 rounded hover:bg-gray-200 text-gray-700 text-start">
                                <ShoppingCart
                                    size={25}
                                    className="mr-3"
                                ></ShoppingCart>{" "}
                                Orders
                            </h5>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/complains" className="">
                            <h5 className="w-full flex  p-1 rounded hover:bg-gray-200 text-gray-700 text-start">
                                <MessageCircleDashed
                                    size={25}
                                    className="mr-3"
                                ></MessageCircleDashed>{" "}
                                Complain
                            </h5>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

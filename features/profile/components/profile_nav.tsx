import Image from "next/image";
import Link from "next/link";

const ProfileCard = () => {
    return (
        <div className="w-[100%] bg-gray-100 rounded-lg p-6 text-center">
            {/* Navigation Links */}
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/profile/details">
                            <h5 className="block px-4 py-2 rounded hover:bg-gray-200 text-gray-700 text-start   ">
                                Account Details
                            </h5>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/orders">
                            <h5 className="block px-4 py-2 rounded hover:bg-gray-200 text-gray-700 text-start">
                                Orders
                            </h5>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/history">
                            <h5 className="block px-4 py-2 rounded hover:bg-gray-200 text-gray-700 text-start">
                                History
                            </h5>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/wishlist">
                            <h5 className="block px-4 py-2 rounded hover:bg-gray-200 text-gray-700 text-start">
                                Wishlist
                            </h5>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProfileCard;

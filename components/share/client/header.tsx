import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/share/client/mobile-nav";

const Header = () => {
    return (
        <header className={"p-6"}>
            <div className={"flex items-center justify-between"}>
                <div>
                    <Link href={"/"}>
                        <Image
                            src={"/logos/logo.svg"}
                            alt={"Logo"}
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
                <MobileNav />
            </div>
        </header>
    );
};

export default Header;

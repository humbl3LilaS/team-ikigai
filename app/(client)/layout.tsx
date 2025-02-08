import { ReactNode } from "react";
import Header from "@/components/share/client/header";

const ClientLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};

export default ClientLayout;

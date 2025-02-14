import { ReactNode } from "react";

import Header from "@/components/share/client/header";

const ClientLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative bg-white">
            <div className="fixed top-0 z-50 right-0 left-0 border-b">
                <Header />
            </div>
            <div className="mt-16">{children}</div>
        </main>
    );
};

export default ClientLayout;

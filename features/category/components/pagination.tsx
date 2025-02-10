"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductContext } from "../contexts/product-context";

export default function Pagination() {
    const { currentPage, totalPages, setCurrentPage } = useProductContext();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
                <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
}

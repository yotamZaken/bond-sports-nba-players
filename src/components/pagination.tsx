import clsx from "clsx";
import React from "react";
import { usePlayerContext } from "../player-context";

export default function Pagination() {
    const { currentPage, setCurrentPage, totalPages} = usePlayerContext();

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="grid grid-flow-col justify-between">
            <button className={ clsx("border border-1 border-purple-400", currentPage === 1 && "text-gray-500") }
                    onClick={ () => handlePageChange(currentPage - 1) } disabled={ currentPage === 1 }>
                Previous
            </button>
            <button
                className={clsx("border border-1 border-purple-400", currentPage === totalPages && "text-gray-500")}
                onClick={ () => handlePageChange(currentPage + 1) } disabled={ currentPage === totalPages }>
                Next
            </button>
        </div>
    )
}

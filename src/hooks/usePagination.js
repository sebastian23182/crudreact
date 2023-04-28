import React from "react";

const INITIAL_PAGE = 1;

function usePagination() {
    const [page, setPage] = React.useState(INITIAL_PAGE);
    const [dataPerPage, setDataPerPage] = React.useState(10);
    const indexOfLastData = page * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    return { page, setPage, dataPerPage, indexOfFirstData, indexOfLastData };
}

export { usePagination };
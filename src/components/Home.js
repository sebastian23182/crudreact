import React from "react";
import { CrudButtons } from "../components/CrudButtons";
import { SearchBar } from "../components/SearchBar";
import { PaginationBar } from "./PaginationBar";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "./Pagination";
import { ProductTable } from "./ProductTable";
import { ProductData } from "./ProductData";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { Modal } from "../modal/modal";
import { ConfirmDelete } from "./ConfirmDelete";
import { Logout } from "./Logout";
import { useGetTokenStatus } from "../hooks/useGetTokenStatus";

useGetTokenStatus();

function Home({searchedValues, setSearchedValues, searchValue, deleteValues, setSearchValue, setDeleteValues, openModal, setOpenModal, modal, setModal, productID, setProductID, products, setProducts, pageNumbers, setPageNumbers, loading, error }) {
    const { page, setPage, dataPerPage, indexOfFirstData, indexOfLastData } = usePagination();
    const [productName, setProductName] = React.useState("");
    const currentPage = searchedValues.slice(indexOfFirstData, indexOfLastData)
    //const [currentPage, setCurrentPage] = React.useState(searchedValues.slice(indexOfFirstData, indexOfLastData))

    return ( 
        <section className="Home">
            {loading && <Loading/>}
            {error && <Error/>}
            {loading === false && error === false && (
                <>
                <h2 className="Logo">Gamers</h2>
                <Logout/>
                <SearchBar 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setPage={setPage}
                />
                <ProductTable
                error={error}
                loading={loading}
                products={searchedValues}
                indexOfFirstData={indexOfFirstData} 
                indexOfLastData={indexOfLastData}
                page={page}
                setPage={setPage}
                currentPage={currentPage}
                render={(row) => (
                <ProductData 
                key={row[0]}
                ID={row[0]}
                productName={row[1]}
                category={row[2]}
                stock={row[3]}
                status={row[4]}
                price={row[5]}
                searchedValues={searchedValues}
                setSearchedValues={setSearchedValues}
                deleteValues={deleteValues}
                setDeleteValues={setDeleteValues}
                page={page}
                setProductName={setProductName}
                setOpenModal={setOpenModal}
                setProductID={setProductID}
                setModal={setModal}
                />   
            )}
            />
            <PaginationBar 
            error={error}
            loading={loading}
            product={searchedValues}
            dataPerPage={dataPerPage} 
            page={page}
            pageNumbers={pageNumbers}
            setPageNumbers={setPageNumbers}
            currentPage={currentPage}
            render={(row) => (
                <Pagination key={row}
                value={row}
                setPage={setPage}/>
            )}
            />
            {!!openModal && (
            <Modal>
            <div className="InvisibleContainer" onPointerUp={() => setOpenModal(false)}></div>
            <ConfirmDelete
            deleteValues={deleteValues}
            setDeleteValues={setDeleteValues}
            setOpenModal={setOpenModal}
            productName={productName}
            productID={productID}
            searchedValues={searchedValues}
            setSearchedValues={setSearchedValues}
            modal={modal}
            products={products}
            setProducts={setProducts}
            />
            </Modal>
            )}
            <CrudButtons
            deleteValuesSize={deleteValues.length}
            setProductName={setProductName}
            deleteValues={deleteValues}
            setOpenModal={setOpenModal}
            setModal={setModal}/>
            </>
            )}
        </section>
    )
}

export { Home };
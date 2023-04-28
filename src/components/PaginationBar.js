import React from "react";

const PaginationBar = (props) => {
    const renderFunc = props.children || props.render;
    const [lastPageNumbers, setLastPageNumbers] = React.useState([])
    const products = [...(props.product || [])];
    const listTop = Math.ceil(products.length / props.dataPerPage);

    React.useEffect(() => {
        if(!props.currentPage.length && props.pageNumbers.length === 1 && props.page > 4){
            const newPageNumbers = []
            for(let i = props.pageNumbers[0]-1; i <= Math.ceil(products.length / props.dataPerPage) && newPageNumbers.length <= 3; i--){
                newPageNumbers.push(i)
            }
            newPageNumbers.reverse();
            console.log(newPageNumbers)
            props.setPageNumbers(newPageNumbers)
        }else{
            const barList = []
            for (let i = 1; i <= Math.ceil(products.length / props.dataPerPage) && barList.length <= 3; i++) {
                barList.push(i)
            }
            props.setPageNumbers(barList)
        }
    }, [props.product])


    const nextClick = () => {
        if(props.pageNumbers.length === 4){
            setLastPageNumbers(props.pageNumbers)
            const newPageNumbers = []
            for (let i = props.pageNumbers[3]+1; i <= Math.ceil(products.length / props.dataPerPage) && newPageNumbers.length <= 3; i++) {
                newPageNumbers.push(i)
            }
            props.setPageNumbers(newPageNumbers)
        }
    }

    const lastClick = () => {
        const newPageNumbers = []
        for(let i = props.pageNumbers[0]-1; i <= Math.ceil(products.length / props.dataPerPage) && newPageNumbers.length <= 3; i--){
            newPageNumbers.push(i)
        }
        newPageNumbers.reverse();
        props.setPageNumbers(newPageNumbers)
    }

    //Se podrian añadir botones de primera y ultima pagina de ser necesario
    return (
        <nav className="PaginationBar-Container">
            {!props.pageNumbers.includes(1) && (
                <button onPointerUp={lastClick}>&laquo;</button>
            )}
            <ul className="PaginationBar">
                {props.error}
                {props.loading}
                {(!props.loading && !props.error) && props.pageNumbers.map(renderFunc)}
            </ul>
            {!props.pageNumbers.includes(listTop) && (
                <button onPointerUp={nextClick}>&raquo;</button>
            )}
        </nav>
    )
}

export { PaginationBar };
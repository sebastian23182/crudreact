import React from "react";

function Pagination(props) {
    const onPaginationChange = () => {
        props.setPage(props.value)
    }
    
    return(
        <li>
            <button onPointerUp={onPaginationChange}>
                <a href="#">
                    {props.value}
                </a>
            </button>
        </li>
    )
}

export { Pagination };
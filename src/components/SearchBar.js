import React from "react";

function SearchBar({ searchValue, setSearchValue, setPage }) {
    const onSearchValueChange = (e) => {
        setSearchValue(e.target.value);
        setPage(1)
    }

    return (
        <input className="Search-Bar" placeholder="Buscar" value={searchValue} onChange={onSearchValueChange}/>  
    );
}

export { SearchBar };
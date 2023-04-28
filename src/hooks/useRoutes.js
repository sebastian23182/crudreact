function useRoutes() {
    return { routes };
}

const routes = {
    home: "/",
    newProduct: "/newProduct",
    update: "/update/:ID",
    login: "/login"
}

export { useRoutes };
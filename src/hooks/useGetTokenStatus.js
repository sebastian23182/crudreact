const useGetTokenStatus = async () => {
    const API = "http://localhost:3001/login";
    const options = {
        method: "GET",
        headers: {
            "authorization": localStorage.getItem("token")
        }, 
    }
    const response = await fetch(API, options);
    const data = await response.json();
    
    if(await data.res){
        if(window.location.pathname === "/login"){
            window.location.replace("/")
            return data.res
        }
    }else{
        if(window.location.pathname !== "/login"){
            window.location.replace("/login")
            return data.res
        }
    }
}

export { useGetTokenStatus };
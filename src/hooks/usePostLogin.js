const usePostLogin = async (admin, setStatus) => {
    try {
        const API = "http://localhost:3001/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        }
        const res = await fetch(API, options);
        if(res.status === 200){
            const data = await res.json();
            localStorage.setItem("token", data.jwt)
            window.location.replace("/")
        }else{
            setStatus(401)
        }
    } catch(error){
        console.log(error)
    }
}

export { usePostLogin };
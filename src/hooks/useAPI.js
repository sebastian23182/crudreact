import React from "react";

function useAPI({ searchedValues }) {
  const API = "http://localhost:3001/products";
  const options = {
    method: "GET"
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [products, setProducts] = React.useState([]);
  const {
        error,
        loading,
        item
  } = state;

    const onError = (error) => dispatch({ type: actionTypes.error, payload: error });
    const onSuccess = (parsedItem) => dispatch({ type: actionTypes.success, payload: parsedItem });
    const onSave = (newitem) => dispatch({type: actionTypes.save, payload: newitem })
    const onLoading = () => dispatch({type: actionTypes.loading})

    React.useEffect(() => {
        onLoading();
            (async ()=> {
                try{
                    const response = await fetch(API, options);
                    setProducts(await response.json());
                    onSuccess();
                    } catch(error){
                        onError(error);
                    }
            })();
    },[])

    return {item, loading, error, onError, onSuccess, onSave, onLoading, products, setProducts}
}
    
const initialState = ({ searchedValues }) => ({
    error: false,
    loading: false,
    item: searchedValues
});

const actionTypes = {
    error: "ERROR",
    success: "SUCESS",
    save: "SAVE",
    loading: "LOADING"
}

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.success]: {
        ...state,
        error: false,
        item: payload,
        loading: false
    },
    [actionTypes.save]: {
        ...state,
        item: payload
    },
    [actionTypes.loading]: {
        ...state,
        loading: true
    }
})

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
}

export { useAPI };
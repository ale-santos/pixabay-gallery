import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer'

//Initial state 
const initialState = {
    shoppingCart: []
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const localState = JSON.parse(localStorage.getItem("shoppingCart"));
    const [state, dispatch] = useReducer(AppReducer, localState || initialState);
    
    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(state));
      }, [state]);

    //Actions
    function addCart(newItem){
        dispatch({
            type: 'ADD_CART',
            payload: newItem
        });
    }

    function removeCart(id){
        dispatch({
            type: 'REMOVE_CART',
            payload: id
        });
    }

    return (
        <GlobalContext.Provider value={{
            shoppingCart: state.shoppingCart,
            addCart,
            removeCart
        }}>
            {children}
        </GlobalContext.Provider>
    )

}
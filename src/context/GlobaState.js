import React, { createContext, useReducer, useEffect, useState } from 'react';
import AppReducer from './AppReducer'

//Initial state 
const initialState = {
    shoppingCart: [],
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const localState = JSON.parse(localStorage.getItem("shoppingCart"));
    const [state, dispatch] = useReducer(AppReducer, localState || initialState);
    const [search, setSearch] = useState({
        term: '',
        imageType: 'all',
        category: '',
        perPage: 8,
        currentPage: 1
    });
     
    const [searchMobileOpen, setSearchMobileOpen] = useState(false);
    const [menuMobileOpen, setMenuMobileOpen] = useState(false);

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

    function handleButtonFavorites(image) {
        if (state.shoppingCart.filter(item => item.id === image.id).length === 0) {
            const newItem = image
            addCart(newItem);
        } else {
            removeCart(image.id);
        }
    }

    
    return (
        <GlobalContext.Provider value={{
            shoppingCart: state.shoppingCart,
            search,
            setSearch,
            searchMobileOpen,
            setSearchMobileOpen,
            menuMobileOpen,
            setMenuMobileOpen,
            addCart,
            removeCart,
            handleButtonFavorites
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

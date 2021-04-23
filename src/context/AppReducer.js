export default function AppReducer(state, action){
    switch (action.type) {
        case 'REMOVE_CART':
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(shoppingCart => shoppingCart.id !== action.payload)
            }
        case 'ADD_CART':
            return {
                ...state,
                shoppingCart: [action.payload, ...state.shoppingCart]
            }
        default:
            return state;
    }

}

// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// For login
export const login = (user) =>{
    return {
        type:"LOGIN",
        payload:user
    }
}

// For logout
export const logout = () =>{
    return {
        type:"LOGOUT"
    }
}
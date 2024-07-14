const cart = []

const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":
            // Check if product already in cart
            const exist = state.find((x) => x.idProduto === product.idProduto)
            if(exist){
                // Increase the quantity
                return state.map((x)=>x.idProduto ===product.idProduto?{...x, qty: x.qty+1}:x)
            }
            else{
                return [...state, {...product, qty:1}]
            }
        case "DELITEM":
            const exist2 = state.find((x) => x.idProduto === product.idProduto)
            if(exist2.qty === 1){
                return state.filter((x)=>x.idProduto!==exist2.idProduto)
            }
            else{
                return state.map((x)=> x.idProduto===product.idProduto?{...x, qty:x.qty-1}:x)
            }

        default:
            return state
    }
}

export default handleCart
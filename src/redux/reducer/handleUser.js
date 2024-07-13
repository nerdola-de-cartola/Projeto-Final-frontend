const user={}

const handleUser = (state=user, action) =>{
    const newUser = action.payload

    switch(action.type){
        case "LOGIN":
            return newUser;

        case "LOGOUT":
            return {}

        default:
            return state
    }
}

export default handleUser
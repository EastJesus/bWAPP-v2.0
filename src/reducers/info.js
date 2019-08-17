const initialState = {
    isAuth: false,
    login: 'Alexey',
    isAdmin: false
}

export default function authInfo(state = {initialState}, action) {
    switch (action.type) {
        case "ACTIVATE":
           return {
                ...state, 
                isAuth: action.payload.isAuth,
                login: action.payload.login,
                isAdmin: action.payload.isAdmin
            } 

        case "ACTIVATE_FAILED":
            return {
                ...state, 
                message: action.payload.message
            }    
            
        case "DEACTIVATE":
            return {
                ...state, 
                isAuth: action.payload.isAuth,
                isAdmin: false
            }  
              
        default:
            return state    
    }
}
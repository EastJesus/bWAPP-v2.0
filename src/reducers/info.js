const initialState = {
    isAuth: false,
    login: 'Alexey'
}

export default function authInfo(state = {initialState}, action) {
    switch (action.type) {
        case "ACTIVATE":
            return {
                ...state, 
                isAuth: action.payload.isAuth,
                login: action.payload.login
            }
            
        case "DEACTIVATE":
            return {
                ...state, 
                isAuth: action.payload.isAuth
            }  
              
        default:
            return state    
    }
}
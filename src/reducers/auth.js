const initialState = {
    isAuth: false,
    login: null,
    isAdmin: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REQUEST_AUTH':
            return state

        case 'REQUEST_DEACTIVATE_AUTH':
            return state    
        
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user: action.currentUser
            }

        case "DEACTIVATE_AUTH_SUCCESS":
            return {
                ...state,
                user: {
                    isAuth: false,
                    isAdmin: false
                }
            }    

        case 'AUTH_FAILED':
            return state

        default:
            return state
    }
}
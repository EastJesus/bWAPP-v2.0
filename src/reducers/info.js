const initialState = {
    users: null,
    user: null
}

 export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_REQUEST':
            return state

        case 'GET_ONE_USER_REQUEST':
            return state    

        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: action.users
            }

        case 'GET_ONE_USER_SUCCESS':
                return {
                    ...state,
                    users: action.users
                }  

        case 'GET_USERS_FAILED':
            return {
                ...state
            } 
            
        case 'GET_ONE_USER_FAILED':
            return {
                 ...state
            }    

        case 'ADD_USER_REQUEST':
            return {
                ...state
            }    
            
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                user: action.user
            }    

        case 'ADD_USER_ERROR':
            return {
                ...state
            }    

        case 'DELETE_USER_REQUEST':
            return state
            
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                user: action.user
            }  
            
        case 'DELETE_USER_ERROR':
            return state    

        default:
            return state
    }
}
export default function activate(isAuth2, login2, isAdmin2) {
    return {
        type: "ACTIVATE",
        payload: {
            isAuth: isAuth2,
            login: login2,
            isAdmin: isAdmin2
        }
    }
}

export function activate_failed(message) {
    return {
        type: "ACTIVATE_FAILED",
        payload: {
            message: message
        }
    }
}

export const deactivate = (newAuth) => {
    return {
        type: "DEACTIVATE",
        payload: {
            isAuth: false,
            isAdmin: false
        }
    }
}

export const runSaga = () => {
    return { type: 'ACTIVATE_REQUEST' }
};

export const deactivateRunSaga = () => {
    return { type: 'DEACTIVATE_REQUEST' }
}
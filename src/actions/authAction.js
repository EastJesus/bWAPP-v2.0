export default function activate(newAuth, login) {
    return {
        type: "ACTIVATE",
        payload: {
            isAuth: newAuth,
            login: login
        }
    }
}

export function deactivate(newAuth) {
    return {
        type: "DEACTIVATE",
        payload: {
            isAuth: newAuth
        }
    }
}
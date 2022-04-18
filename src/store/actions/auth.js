import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionsType";

export function authAction(user) {

    return dispatch => {
        const userId = user.user.multiFactor.user.email;
        const lastSignInTime = user.user._delegate.metadata.lastSignInTime;
        const token = user.user.multiFactor.user.accessToken;


        let date = new Date(lastSignInTime);
        let endTime = date.getTime() + 3600 * 1000;
        endTime = new Date(endTime);

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationDate', endTime);

        dispatch(authSuccess(token));
        dispatch(autoLogout());
    }
}

export function autoLogout() {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, 3600*1000)
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_LOGOUT
    }
}
export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const endTime = new Date(localStorage.getItem('expirationDate'));
            if (endTime <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((endTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}


export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
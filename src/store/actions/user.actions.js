import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducer/user.reducer.js";
import { store } from "../store.js";


export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
        })
}


export async function signup(credentials) {
    const allUsers = await userService.query()
    const isUsernameExists = allUsers.find(user =>
         user.username === credentials.username)

    if(!isUsernameExists){
        return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            throw err
        })
    }
    else console.log('Username Already existas')
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}

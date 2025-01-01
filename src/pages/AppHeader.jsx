import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AppHeader() {

    const user = useSelector(storeState =>
         storeState.userModule.loggedInUser)

    return (
        <header className="app-header full main-layout">
            <nav className="app-nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/toys">Toys</NavLink>
                <NavLink to="/login">{user?user.username:'login'}</NavLink>
            </nav>
        </header>
    )
}

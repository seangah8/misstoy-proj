import { userService } from '../services/user.service.js'
import { login , signup } from '../store/actions/user.actions.js'

import { useState } from 'react'

export function LoginSignup() {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignup, setIsSignUp] = useState(true)
    
    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function onLogin(ev) {
        ev.preventDefault()
        !isSignup ? signup(credentials) : login(credentials)
    }

    return (
        <div className="login-signup">
            <section className='window'>
                <h3>
                    {isSignup ? "Login" : "Signup"} to your account
                </h3>
                <p>"admin" user has accese to all</p>
                <form onSubmit={onLogin}>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <button>{!isSignup ? 'Signup' : 'Login'}</button>
                </form>

                <div className="switch">
                    <a onClick={() => setIsSignUp(!isSignup)}>
                        {!isSignup ?
                            'Already a member? Login' :
                            'New user? Signup here'
                        }
                    </a >
                </div>
            </section>
            
        </div >
    )
}

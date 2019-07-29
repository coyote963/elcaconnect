import React from "react"
import LoginForm from "./LoginForm";
class Login extends React.Component { 
    render () {
        return (
            <div className="container mt-5">
                <h1>Log In Below </h1>
                <LoginForm />
                <a href="/register/">Don't have an account? Register Here!</a>
            </div>
        )
    }
}
export default Login;
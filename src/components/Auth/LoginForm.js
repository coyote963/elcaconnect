import React from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
class LoginForm extends React.Component {
    constructor () {
        super();
        this.state = {
            email : "",
            password : "",
            errors : {}
        };
    }

    onChange = e => {
        this.setState( { [e.target.id] : e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + "auth/login", {
            email : this.state.email,
            password : this.state.password
        })
        .then(response => {
            localStorage.setItem('jwt', response.data.token)
            this.props.history.push('/profile');
        })
        .catch(error => {
            
            if (error.response.status)
            {
                if (error.response.status === 404){
                    this.setState({
                    errors : { email : "email not found"}
                    })
                }
                if (error.response.status === 400) {
                    this.setState({
                        errors : {password : "password not found"}
                    })
                }
                else {
                    this.setState({
                        errors : {password : "an error occurred"}
                    })
                }
            } else {
                this.setState({
                    errors : {password : "a server error occurred"}
                })
            }
        })
    }
        

    render () {
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="useremail">Email Address</label>
                        <input
                            onChange = {this.onChange}
                            value = { this.state.email }
                            
                            type="email" className={"form-control " + (this.state.errors.email ? "is-invalid" : '')} id="email" placeholder="Enter your email address" />
                        <div className="invalid-feedback">
                            {this.state.errors.email}
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="userpassword">Password</label>
                        <input 
                            onChange={this.onChange}
                            value={this.state.password}
                            
                            type="password" className={"form-control " + (this.state.errors.password ? "is-invalid" : '')} id="password" />
                        <div className="invalid-feedback">
                            {this.state.errors.password}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        )
    }
}
export default withRouter(LoginForm);
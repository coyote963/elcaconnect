import React from 'react';
import axios from 'axios'
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
            console.log(response.data.token)
            localStorage.setItem('jwt', response.data.token)

        })
        .catch(error => {
            this.setState({
                errors : error.response.data
            })
        })
    }

    render () {
        const { errors } = this.state;
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="useremail">Email Address</label>
                        <input
                            onChange = {this.onChange}
                            value = { this.state.email }
                            error = { errors.email }
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
                            error={errors.password}
                            type="password" className={"form-control " + (this.state.errors.password ? "is-invalid" : '')} id="password" />
                        <div className="invalid-feedback">
                            {this.state.errors.password}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Log In</button>
                </form>
            </div>
        )
    }
}
export default LoginForm;
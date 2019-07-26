import React from 'react';
import axios from 'axios'
require('dotenv').config();

class Register extends React.Component {
    constructor () {
        super();
        this.state = {
            email : "",
            password1 : "",
            password2 : "",
            first_name : "",
            last_name : "",
            errors : {}
        };
    }

    onChange = e => {
        this.setState( { [e.target.id] : e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + "auth/register", {
            email : this.state.email,
            password1 : this.state.password1,
            password2 : this.state.password2,
            first_name : this.state.first_name,
            last_name : this.state.last_name
        })
        .then(response => {
            console.log(response);
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
            <div className="container">
                <h3>Register for a new account!</h3>
                <form noValidate className="needs-validation" onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="first_name">First Name</label>
                            <input
                                onChange = {this.onChange}
                                value = { this.state.first_name }
                                error = { errors.first_name }
                                type="text" className={"form-control " + (this.state.errors.last_name ? 'is-invalid' : '')} id="first_name" placeholder="Enter your first name" />
                                <div className="invalid-feedback">
                                    {this.state.errors.first_name}
                                </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="last_name">Last Name</label>
                            <input
                                onChange = {this.onChange}
                                value = { this.state.last_name }
                                error = { errors.last_name }
                                type="text" className={"form-control " + (this.state.errors.last_name ? 'is-invalid' : '')} id="last_name" placeholder="Enter your last name" />
                                <div className="invalid-feedback">
                                    {this.state.errors.last_name}
                                </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="email">Email Address</label>
                        <input
                            onChange = {this.onChange}
                            value = { this.state.email }
                            error = { errors.email }
                            type="email" className={"form-control " + (this.state.errors.email ? 'is-invalid' : '')} id="email" placeholder="Enter your email address" />
                            <div className="invalid-feedback">
                                {this.state.errors.email}
                            </div>
                    </div>
                    <div className="form-group">
                        
                        <label for="password">Password</label>
                        <input 
                            onChange={this.onChange}
                            value={this.state.password1}
                            error={errors.password1}
                            type="password" className={"form-control " + (this.state.errors.password1 ? 'is-invalid' : '')} id="password1" />
                        <div className="invalid-feedback">
                            {this.state.errors.password1}
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="password2">Confirm Password</label>
                        <input 
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            type="password" className={"form-control " + (this.state.errors.password1 ? 'is-invalid' : '')} id="password2" />
                        <div className="invalid-feedback">
                            {this.state.errors.password2}
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <small>Already have an account? <a href="/login">Login Here</a></small>
            </div>
        )
    }
}

export default Register
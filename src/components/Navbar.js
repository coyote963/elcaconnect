import React from 'react';
import {withRouter} from 'react-router-dom';
import { AuthContext } from './withAuth';
class Navbar extends React.Component {
    onLogout = e =>  {
        localStorage.removeItem('jwt');
        this.context.clearUser();
        this.props.history.push('/');
    }
    render() {
        return (
            <AuthContext.Consumer>
                {context =>
                    context === null ? (<nav className = "navbar navbar-light bg-light justify-content-between">
                        <a href="/" className="navbar-brand">ELCA Connect</a>
                        <a href="/login/" className="btn btn-outline-success my-2">Log in</a>
                        </nav>) 
                    : (<nav className = "navbar navbar-light bg-light justify-content-between">
                        <a href="/profile" className="navbar-brand">ELCA Connect</a>
                        <button onClick={this.onLogout} className="btn btn-outline-success my-2">Log out, {context.userAuth.first_name}</button>
                        </nav>)
                }
            </AuthContext.Consumer>
        )
    }
};
Navbar.contextType = AuthContext;
export default withRouter(Navbar);
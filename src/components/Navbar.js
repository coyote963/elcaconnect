import React from 'react';
import {withRouter} from 'react-router-dom';
import { AuthContext } from './withAuth';
class Navbar extends React.Component {
    onLogout = e =>  {
        this.context.clearUser();
        this.props.history.push('/');
    }
    render() {
        return (
            <nav className = "navbar navbar-light bg-light justify-content-between">           
            
                <a href="/" className="navbar-brand">ELCA Connect</a>
                <AuthContext.Consumer>
                    {userAuth =>
                        !userAuth ? (<a href="/login/" className="btn btn-outline-success my-2">Log in</a>) 
                        : (<button onClick={this.onLogout} className="btn btn-outline-success my-2">Log out, {userAuth.first_name}</button>)
                    }
                </AuthContext.Consumer>
            </nav>
        )
    }
};
Navbar.contextType = AuthContext;
export default withRouter(Navbar);
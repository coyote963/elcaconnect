import React from 'react';
import {getJwt} from '../helpers/get-jwt'
import axios from 'axios'
import Navbar from './Navbar';
export const AuthContext = React.createContext(null);
const withAuth = (WrappedComponent) => {
    class AuthComponent extends React.Component {
        state = {
            userAuth : null
        };
        async componentDidMount() {
            const jwt = getJwt();
            if (!jwt) {
                this.props.history.push('/Login');
            }
            var headers =  { "Authorization" : jwt}
            await axios.get(process.env.REACT_APP_SERVER_URL +"getUser", {headers : headers })
            .then(res => {
                this.setState({userAuth:res.data })
            })
            .catch(err => {
                localStorage.removeItem('jwt');
                this.props.history.push('/login')
            })
        }
        
        render() {
            
            return (
                <AuthContext.Provider value={this.state}>
                    <Navbar></Navbar>
                    <WrappedComponent />
                </AuthContext.Provider>
            );
        }
    }
    AuthComponent.contextType = AuthContext;
    return AuthComponent;
};

export default withAuth;
import React from 'react';
import {getJwt} from '../helpers/get-jwt'
import axios from 'axios'
import Navbar from './Navbar';
export const AuthContext = React.createContext(null);
const withAuth = (WrappedComponent) => {
    class AuthComponent extends React.Component {
        constructor (props) {
            super(props);
            this.clearUser = () => {
                this.setState({clearUser : null});
            }
            this.state = {
                userAuth : null,
                clearUser : this.clearUser
            }
        }
        
        componentDidMount() {
            const jwt = getJwt();
            if (!jwt) {
                this.props.history.push('/Login');
            }
            var headers =  { "Authorization" : jwt}
            axios.get(process.env.REACT_APP_SERVER_URL +"getUser", {headers : headers })
            .then(res => {
                this.setState({userAuth:res.data })
            })
            .catch(err => {
                localStorage.removeItem('jwt');
                this.props.history.push('/login')
            })
        }
        
        render() {
            if (this.state.userAuth === null ) {
                return <h1>Loading</h1>
            }
            return (
                
                <AuthContext.Provider value={this.state}>
                    <Navbar />
                    <WrappedComponent />
                </AuthContext.Provider>
            );
        }
    }
    AuthComponent.contextType = AuthContext;
    return AuthComponent;
};

export default withAuth;
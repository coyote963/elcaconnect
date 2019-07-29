import React from 'react';
import {getJwt} from '../helpers/get-jwt';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { UserContext } from '../helpers/user-context';
class AuthenticatedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded : false
        }
    }
    // get the currently logged in user's jwt, set the state to the user object via api call
    // if either of these steps fail, fallback by removing invalid token and pushing back to login
    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/Login');
        }
        var headers =  { "Authorization" : jwt}
        axios.get(process.env.REACT_APP_SERVER_URL +"getUser", {headers : headers })
        .then(res => {
            this.context.setUser(res.data)
            console.log(this.context.user)
            this.setState({
                loaded : true
            })
        })
        .catch(err => {
            localStorage.removeItem('jwt');
            this.context.clearUser();
            this.props.history.push('/login')
        })
    }
    
    render() {
        if (this.state.loaded === false) {
            return (
                <div><h1>Loading...</h1></div>
            )
        }
        return (
                <div>
                    {this.context.user && 
                        this.props.children}
                    }
                </div>
        )
    }
}
AuthenticatedComponent.contextType = UserContext;
export default withRouter(AuthenticatedComponent);
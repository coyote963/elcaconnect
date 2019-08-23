import React from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from '../withAuth';

class Logout extends React.Component {
    componentDidMount () {
        localStorage.removeItem('jwt');
        console.log(this.context)
        this.props.history.push('/')
    }
    render () {
        return null
    }
}
Logout.contextType = AuthContext
export default withRouter(Logout)
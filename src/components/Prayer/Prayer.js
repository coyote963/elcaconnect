import React from 'react'
import axios from 'axios';
import { AuthContext } from '../withAuth'
import getHeader from '../../helpers/get-header'
import {withRouter} from 'react-router-dom';
class Prayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange (event) {
        this.setState({
            comment : event.target.value
        })
    }
    handleSubmit () {
        axios.post(process.env.REACT_APP_SERVER_URL + "prayer", {
            user : this.context.userAuth._id,
            comment : this.state.comment
        }, getHeader())
        .then(() => this.props.history.push('/history'))
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Make A Prayer Request</h1>
                        <p class="lead">Have a prayer you want your pastor to know? Send it via this simple form.</p>
                    </div>
                </div>
                <div className="container">
                    <form>
                        <div class="form-group">
                            <label for="commentArea">Submit your prayer</label>
                            <textarea onChange={this.handleChange} value={this.state.comment} class="form-control" id="commentArea" rows="3"></textarea>
                        </div>
                    </form>
                    <button onClick={this.handleSubmit} type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        )
    }
}
Prayer.contextType = AuthContext;
export default withRouter(Prayer);
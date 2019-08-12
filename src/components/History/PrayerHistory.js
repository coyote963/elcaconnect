import React from 'react'
import axios from 'axios'
import { AuthContext } from '../withAuth'
import Spinner from '../../helpers/Spinner'
import moment from 'moment'
import getHeader from '../../helpers/get-header'
class PrayerHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prayers : null
        }
    }

    componentDidMount () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'prayer/' + this.context.userAuth._id, getHeader())
        .then(response => {
            this.setState({prayers : response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    render () {
        if (this.state.prayers === null ) {
            return (<Spinner />)
        }
        return (
            <div className="container">
                <div class="card">
                    <div class="card-body">
                        <h5>Your Prayers</h5>
                        {this.state.prayers.map((prayer) => 
                            <blockquote class="blockquote text-center">
                            <p class="mb-0">{prayer.comment}</p>
                            <footer class="blockquote-footer"><cite>{moment(prayer.dateCreated).format("MMM DD, YYYY HH:MM a")}</cite></footer>
                            </blockquote>
                        )}
                    </div>
                    
                </div>
            </div>
        )
    }
}
PrayerHistory.contextType = AuthContext;
export default PrayerHistory;
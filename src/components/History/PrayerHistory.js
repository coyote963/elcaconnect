import React from 'react'
import axios from 'axios'
import { AuthContext } from '../withAuth'
import Spinner from '../../helpers/Spinner'
import moment from 'moment'
import getHeader from '../../helpers/get-header'
import ReactTable from 'react-table'
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
        if (this.props.view !== 'prayer') {
            return null
        }
        if (this.state.prayers === null ) {
            return (<Spinner />)
        }
        const columns =[{
            id : 'prayer',
            Header: 'Prayer',
            accessor : 'comment'
        }, {
            id : 'dateCreated',
            Header: 'Date Submitted',
            accessor : d => moment(d.dateCreated).format("MMM DD, YYYY HH:MM a")
        }]
        return (
            
            <ReactTable
                className="-striped -highlight"
                data={this.state.prayers}
                columns={columns}
            />
                
        )
    }
}
PrayerHistory.contextType = AuthContext;
export default PrayerHistory;
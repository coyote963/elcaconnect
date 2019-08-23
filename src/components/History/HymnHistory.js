import React from 'react'
import axios from 'axios'
import { AuthContext } from '../withAuth';
import getHeader from '../../helpers/get-header'
import ReactTable from 'react-table'
import Spinner from '../../helpers/Spinner'
import moment from 'moment'
class HymnHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions : null,
        }
    }
    
    componentDidMount () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'hymnsuggest/' + this.context.userAuth._id, getHeader())
        .then(response => {
            this.setState({ suggestions : response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        if (this.props.view !== 'hymn') {
            return null
        }
        if (this.state.suggestions === null) {
            return (<Spinner />)
        }
        
        const columns = [{
            id : 'title',
            Header: 'Title',
            accessor: d => d.hymn.displayTitle
        }, {
            id : 'comment',
            Header : 'Comment',
            accessor : 'comment'
        }, {
            id : 'dateCreated',
            Header : 'Date Submitted',
            accessor : d => moment(d.dateCreated).format("MMM DD, YYYY HH:MM a"),
        }]

        return (
            
            
            <ReactTable
                className="-striped -highlight"
                data={this.state.suggestions}
                columns={columns}
            />
                
        )
    }
}

HymnHistory.contextType = AuthContext;
export default HymnHistory ;
import React from 'react'
import axios from 'axios'
import Spinner from '../../helpers/Spinner';
import { AuthContext } from '../withAuth';
import moment from 'moment'
import getHeader from '../../helpers/get-header'
import ReactTable from 'react-table'

class VerseHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions : null,
        }
    }
    
    componentDidMount () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'versesuggest/' + this.context.userAuth._id, getHeader())
        .then(response => {
            this.setState({ suggestions : response.data })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        if (this.state.suggestions === null) {
            return (<Spinner />)
        }

        const columns = [{
            id : 'bible',
            Header: 'Bible',
            accessor: d => d.bibleAbbr,
            minWidth: 100
            
        }, {
            id : 'verse',
            Header : 'Verse',
            accessor : d => d.verseId,
            minWidth: 100
            
        }, {
            Header : 'Comment',
            accessor : 'comment',
            minWidth: 300
        }, {
            id : 'dateCreated',
            Header : 'Date Submitted',
            accessor : d => moment(d.dateCreated).format("MMM DD, YYYY HH:MM a"),
            minWidth: 300
        }]

        return (
            <div className="card text-center">
                <div className="card-header">Submitted Verses</div>
                <div className="card-body">
                    <ReactTable 
                        className="-striped -highlight"
                        data={this.state.suggestions}
                        columns={columns}
                    />
                </div>
            </div>    
        )
    }
}
VerseHistory.contextType = AuthContext;
export default VerseHistory;


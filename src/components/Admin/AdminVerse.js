import React from 'react'
import axios from 'axios'
import getHeader from '../../helpers/get-header'
import Spinner from '../../helpers/Spinner'
import ReactTable from 'react-table'
import moment from 'moment';
import { CSVLink } from "react-csv";
import { Download } from 'react-feather'
import BarChartExtend from '../../helpers/BarChartExtend'
class AdminVerse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            verses: null,
        }
    }
    updateData () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'versesuggest/', getHeader())
        .then (response => {
            this.setState({
                verses : response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount () {
        if (this.props.view === "Verse") {
            this.updateData()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view && this.props.view === "Verse") {
            this.updateData()
        }
    }
    render () {
        if (this.props.view !== "Verse") {
            return null
        }
        if (this.state.verses === null) {
            return (<Spinner />)
        }
        
        const columns = [{
            id : 'bibleAbbr',
            Header : 'Bible',
            accessor : 'bibleAbbr'
        }, {
            id : 'verse',
            Header: 'Verse',
            accessor: 'verseId'
        }, {
            id : 'comment',
            Header : 'Comment',
            accessor : 'comment',
        }, {
            id : 'first_name',
            Header : 'First Name',
            accessor : d => d.user.first_name
        }, {
            id : 'last_name',
            Header : 'Last Name',
            accessor : d => d.user.last_name
        }, {
            id : 'email',
            Header : "Email",
            accessor : d=>d.user.email
        }, {
            id : 'dateCreated',
            Header : "Date Submitted",
            accessor : d => moment(d.dateCreated).format("MMM DD, YYYY hh:mm a")
        }]
        
        return (
            <div>
                <div className="d-flex justify-content-between border-bottom pt-3 pb-2 mb-3">
                    <h1 class="h2">Verses Dashboards </h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                            <CSVLink data={this.state.verses}>
                                <button class="btn btn-sm btn-outline-secondary"><Download />Export CSV</button>
                            </CSVLink>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>Prayer Submission History</h5>
                    <BarChartExtend data={this.state.verses}/>
                </div>
                <h5>Verses Table</h5>
                <ReactTable
                    className="-striped -highlight"
                    data={this.state.verses}
                    columns={columns}
                />    
            </div>
        )
    }
}
export default AdminVerse ;
import axios from 'axios'
import React from 'react'
import getHeader from '../../helpers/get-header'
import Spinner from '../../helpers/Spinner'
import ReactTable from 'react-table'
import moment from 'moment'
import {CSVLink} from 'react-csv'
import { Download, PlusSquare } from 'react-feather';

import BarChartExtend from '../../helpers/BarChartExtend';
class AdminHymn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hymns: null,
            period : 10
        }
        this.handleChange = this.handleChange.bind(this);
    }
    updateData () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'hymnsuggest/', getHeader())
        .then (response => {
            this.setState({
                hymns : response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    handleChange(event) {
        this.setState({period : event.target.value})
    }


    componentDidMount () {
        if (this.props.view === "Hymn") {
            this.updateData()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view && this.props.view === "Hymn") {
            this.updateData()
        }
    }
    render () {
        if (this.props.view !== "Hymn") {
            return null
        }
        if (this.state.hymns === null) {
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
            accessor : d => moment(d.dateCreated).format("MMM DD, YYYY hh:mm a"),
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
        }]
        
        return (
            <div>
                <div className="d-flex justify-content-between border-bottom pt-3 pb-2 mb-3">
                    <h1 class="h2">Hymns Dashboard  </h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group">
                            <CSVLink data={this.state.hymns}>
                                <button class="btn btn-sm btn-outline-secondary"> <Download/> Download CSV</button>
                            </CSVLink>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>Hymn Submission History</h5>
                    <BarChartExtend data={this.state.hymns}/>
                </div>
                <div className="d-flex justify-content-between border-bottom pt-3 mb-3">
                    <h5>Hymns Table</h5>
                    <button class="btn btn-sm btn-link"><PlusSquare /></button>
                </div>
                <ReactTable
                    className="-striped -highlight"
                    data={this.state.hymns}
                    columns={columns}
                />    
                
            </div>
        )
    }
}
export default AdminHymn ;
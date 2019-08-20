import React from 'react'
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import getHeader from '../../helpers/get-header'
import moment from 'moment';
import ReactTable from 'react-table'
import { CSVLink } from 'react-csv'
import { Download, PlusSquare } from 'react-feather'
import BarChartExtend from '../../helpers/BarChartExtend'
class AdminPrayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prayer: null
        }
    }
    updateData () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'prayer/', getHeader())
        .then (response => {
            this.setState({
                prayer : response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount () {
        if (this.props.view === "Prayer") {
            this.updateData()
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view && this.props.view === "Prayer") {
            this.updateData()
        }
    }

    render () {
        if (this.props.view !== "Prayer") {
            return null
        }
        if (this.state.prayer === null) {
            return (<Spinner />)
        }
        const columns = [{
            id : 'prayer',
            Header: 'Prayer',
            accessor: 'comment'
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
                    <h1 class="h2">Prayers Dashboard </h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                            <CSVLink data={this.state.prayer}>
                                <button class="btn btn-sm btn-outline-secondary"><Download /> Download CSV</button>
                            </CSVLink>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>Prayer Submission History</h5>
                    <BarChartExtend data={this.state.prayer}/>
                </div>
                <div className="d-flex justify-content-between border-bottom pt-3 mb-3">
                    <h5>Prayers Table</h5>
                    <button class="btn btn-sm btn-link"><PlusSquare /></button>
                </div>
                <ReactTable
                    className="-striped -highlight"
                    data={this.state.prayer}
                    columns={columns}
                />
            </div>
        )
    }
}
export default AdminPrayer ;
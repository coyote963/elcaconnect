import axios from 'axios'
import React from 'react'
import getHeader from '../../helpers/get-header'
import Spinner from '../../helpers/Spinner'
import ReactTable from 'react-table'
import { CSVLink } from 'react-csv'
import { Download, PlusSquare } from 'react-feather'

class AdminUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users : null
        }
    }
    updateData () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'auth/', getHeader())
        .then(response => {
            this.setState({
                users : response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount () {
        if (this.props.view === "Users") {
            this.updateData()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view && this.props.view === "Users") {
            this.updateData()
        }
    }

    render () {
        if (this.props.view !== "Users") {
            return null
        }
        if (this.state.users === null) {
            return (<Spinner />)
        }

        const columns = [{
            id : 'first_name',
            Header: 'First Name',
            accessor: 'first_name'
        }, {
            id : 'last_name',
            Header : 'Last Name',
            accessor : 'last_name'
        }, {
            id : 'email',
            Header : 'email',
            accessor : 'email',
        }]

        return (
            <div>
                <div className="d-flex justify-content-between border-bottom pt-3 pb-2 mb-3">
                    <h1 class="h2">Users Dashboard </h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                            <CSVLink data={this.state.users}>
                                <button class="btn btn-sm btn-outline-secondary"><Download />Export</button>
                            </CSVLink>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between border-bottom pt-3 mb-3">
                    <h5>Users Table</h5>
                    <button class="btn btn-sm btn-link"><PlusSquare /></button>
                </div>
                <ReactTable
                    className="-striped -highlight"
                    data={this.state.users}
                    columns={columns}
                />    
            </div>
        )  
    }
}
export default AdminUser ;
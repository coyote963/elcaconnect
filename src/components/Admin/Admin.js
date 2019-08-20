import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import AdminHymn from './AdminHymn'
import AdminUser from './AdminUser'
import AdminVerse from './AdminVerse'
import AdminPrayer from './AdminPrayer'
import './Admin.css'
class Admin extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            view : "Hymn"
        }
        this.setView = this.setView.bind(this)
    }

    setView(view) {
        this.setState({
            view : view
        })
    }

    render () {
        return (
            <div>
                <AdminNavbar />
                <AdminSidebar setView={this.setView}/>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <AdminHymn view={this.state.view} />
                    <AdminPrayer view={this.state.view} />
                    <AdminUser view={this.state.view} />
                    <AdminVerse view={this.state.view} />
                </main>
                
                
            </div>
        )
    }
}
export default Admin
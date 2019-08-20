import React from 'react'

class AdminNavbar extends React.Component {
    render () {
        return (
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <div class="navbar-brand navbar-brand-admin col-sm-3 col-md-2 mr-0" href="#">ADLA CONNECT</div>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
            <ul class="navbar-nav px-3">
              <li class="nav-item text-nowrap">
                <a class="nav-link" href="#">Sign out</a>
              </li>
            </ul>
        </nav>
        )
    }
}
export default AdminNavbar;
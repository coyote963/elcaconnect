import React from 'react'

class AdminSidebar extends React.Component {
    
    
    handleClick(view) {
        this.props.setView(view)
    }
    render () {
        return (
            <div class="container-fluid">
                <div class="row">
                    <nav class="col-md-2 bg-light sidebar">
                        <div class="sidebar-sticky">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <button class="btn btn-link nav-link" onClick={this.handleClick.bind(this, 'Hymn')}>
                                        Hymn
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn btn-link nav-link" onClick={this.handleClick.bind(this, 'Prayer')}>
                                        Prayer
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn btn-link nav-link" onClick={this.handleClick.bind(this, 'Verse')}>
                                        Verse
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="btn btn-link nav-link" onClick={this.handleClick.bind(this, 'Users')}>
                                        Users
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default AdminSidebar
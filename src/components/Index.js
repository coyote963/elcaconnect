import React from "react"
import Navbar from './Navbar';
import {withRouter } from 'react-router-dom'
class Index extends React.Component { 
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        this.props.history.push('/login')
    }
    render () {
        return (
            <div>
                <Navbar></Navbar>
                <header className="masthead">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12 text-center">
                                <h1 className="font-weight-heavy text-white">ADLA Connect</h1>
                                <button onClick={this.handleClick} class="btn btn-outline-light">Get Started</button>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <h2 className="font-weight-light">Connect with fellow ELCA Members</h2>
                                <p>We aim to connect members of churches, one person at a time. Register an account and be instantly connected with other members of your congregation! Send messages to other users and customize your profile!</p>
                            </div>
                            <div className="col-sm">
                                <h2 className="font-weight-light">Prayer Requests</h2>
                                <p>Have a prayer for someone? Let your request be heard by directly sending it to your pastor! It is quick, secure and easy. </p>
                            </div>
                            <div className="col-sm">
                                <h2 className="font-weight-light">Verses and Hymns</h2>
                                <p>With a built in bible viewer, search for your favorite verses, save them and let your pastors know! Additionally with over 200,000 hymns, you'll be sure to find your favorite hymns as well!</p>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Index);
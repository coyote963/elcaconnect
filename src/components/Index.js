import React from "react"
import Navbar from './Navbar';
class Index extends React.Component { 
    render () {
        return (
            <div>
                <Navbar></Navbar>
                <header className="masthead">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12 text-center">
                                <h1 className="font-weight-heavy text-white">ADLA Connect</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <h2 className="font-weight-light">Connect with fellow ELCA Members</h2>
                                <p>Message them directly and socialize!</p>
                            </div>
                            <div className="col-sm">
                                <h2 className="font-weight-light">Make Requests</h2>
                                <p>Tell your church what you want in a service</p>
                            </div>
                            <div className="col-sm">
                                <h2 className="font-weight-light">Support Your Church</h2>
                                <p>Donations help local churches run smoothly</p>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default Index;
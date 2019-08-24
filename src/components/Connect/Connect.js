import React from 'react';
import io from 'socket.io-client'
import {AuthContext} from '../withAuth'
import axios from 'axios';
import moment from 'moment'
import getHeader from '../../helpers/get-header';
class Connect extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            message : '',
            messages: []
        };
        
        this.socket = io(process.env.REACT_APP_SOCKET_IP)
        
        console.log(this.state)

        this.socket.on('RECEIVE_MESSAGE', function(data) {
            addMessage(data)
        })

        const addMessage = data => {
            this.setState({messages : [...this.state.messages, data]})
        }

        this.sendMessage = e => {
            e.preventDefault();
            if (this.state.message !== "") {
                axios.post(process.env.REACT_APP_SERVER_URL + 'chat', {
                    message : this.state.message,
                    user : this.context.userAuth._id,
                }, getHeader())
                .catch((err) => {
                    console.log(err)
                })

                this.socket.emit("SEND_MESSAGE", {
                    first_name : this.context.userAuth.first_name,
                    last_name : this.context.userAuth.last_name,
                    dateCreated : Date(),
                    message : this.state.message
                })
                this.setState({
                    message : ''
                })
            }
        }
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ block: "end", behavior: "smooth" });
    }
    componentDidMount() {
        this.scrollToBottom();
        this.socket.emit("JOIN", {
            first_name : this.context.userAuth.first_name,
            last_name : this.context.userAuth.last_name
        })
        axios.get(process.env.REACT_APP_SERVER_URL + 'chat', getHeader())
        .then(response => {
            this.setState({
                messages : response.data
            })
        })
    }
    componentDidUpdate() {
        this.scrollToBottom();
    
    }

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 align-self-center">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Global Chat</h3>
                                <hr/>
                                <div className="card-text chatbox">
                                    {this.state.messages.map(message => {
                                        if (message.type) {
                                            return (
                                                <div>
                                                    <span className="text-info">
                                                        {message.first_name} {message.last_name} {message.message}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div><span className="text-secondary">[{moment(message.dateCreated).format("MMM DD, YYYY hh:mm a")}] </span>{message.first_name} {message.last_name}: {message.message}</div>
                                        )
                                    })}
                                    <div style={{ float:"left" }}
                                        ref={(el) => { this.messagesEnd = el; }}>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <form>
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                                    <br/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Connect.contextType = AuthContext
export default Connect
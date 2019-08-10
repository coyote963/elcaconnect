import React from 'react'
import axios from 'axios'
import { AuthContext } from '../withAuth';
import getHeader from '../../helpers/get-header';
class HymnModal extends React.Component {
    submitHymn () {
        console.log(getHeader())
        axios.post(process.env.REACT_APP_SERVER_URL + "hymnsuggest/", {
            hymn : this.props.hymn._id,
            user : this.context.userAuth._id,
            comment : ""
        }, getHeader())
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        if (this.props.hymn === null) {
            return null
        }
        return (
            <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Submit this Hymn?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            <h6>Hymn Information</h6>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th scope="row">Display Title</th>
                                        <td>{this.props.hymn.displayTitle}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">First line</th>
                                        <td>{this.props.hymn.firstLine}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Languages</th>
                                        <td>{this.props.hymn.languages}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Authors</th>
                                        <td>{this.props.hymn.authors}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Meter</th>
                                        <td>{this.props.hymn.meter}</td>
                                    </tr>
                                </tbody>
                            </table>
    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.submitHymn.bind(this)} class="btn btn-primary">Submit Hymn</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HymnModal.contextType = AuthContext;
export default HymnModal
import React from 'react'
import axios from 'axios'
import getHeader from '../../helpers/get-header'
import { AuthContext } from '../withAuth';
class VerseModal extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            comment : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    handleSubmit () {
        axios.post(process.env.REACT_APP_SERVER_URL + "versesuggest/", {
            user : this.context.userAuth._id,
            bibleId : this.props.verse.bibleId,
            bookId : this.props.verse.bookId,
            chapterId : this.props.verse.chapterId,
            verseId : this.props.bible.verse_id,
            bibleAbbr : this.props.bible.bible_abbr,
            comment : this.state.comment
        }, getHeader())
        .catch(err => {
            console.log(err)
        })
    }
    
    handleChange (event) {
        this.setState({
            comment : event.target.value
        })
    }

    render () {
        return (
            <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Submit</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Submit {this.props.bible.verse_id} to your pastor, click to confirm. Add comments if necessary.</p>
                            <form>
                                <div class="form-group">
                                    <label for="comments" class="col-form-label">Comments:</label>
                                    <input onChange={this.handleChange} value={this.state.comment} type="text"  class="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.handleSubmit.bind(this)} type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
VerseModal.contextType = AuthContext
export default VerseModal
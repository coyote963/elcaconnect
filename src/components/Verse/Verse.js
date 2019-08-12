import React from 'react';
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import getHeader from '../../helpers/get-header'
import { AuthContext } from '../withAuth';
class Verse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            verse : null,
            comment : ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (this.props.bible.currentStep !== prevProps.bible.currentStep && this.props.bible.currentStep === 5) {
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/versecontent/" + this.props.bible.bible_id + "/" + this.props.bible.verse_id, getHeader())
            .then(response => {
                this.setState({verse : response.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    handleNavClick (current_step) {
        this.props.setStep(current_step)
    }

    handleChange (event) {
        this.setState({
            comment : event.target.value
        })
    }

    handleSubmit () {
        axios.post(process.env.REACT_APP_SERVER_URL + "versesuggest/", {
            user : this.context.userAuth._id,
            bibleId : this.state.verse.bibleId,
            bookId : this.state.verse.bookId,
            chapterId : this.state.verse.chapterId,
            verseId : this.props.bible.verse_id,
            bibleAbbr : this.props.bible.bible_abbr,
            comment : this.state.comment
        }, getHeader())
        .catch(err => {
            console.log(err)
        })
    }
    render () {
        
        if (this.props.bible.currentStep !== 5) {
            return null
        }
        if (this.state.verse === null) {
            return (<Spinner />)
        }
        return(
            <div>
                <div className="row">
                    <span>Navigate to ></span>
                    <br></br>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 1)}>
                        {this.props.bible.bible_abbr}
                    </button>
                    <span>></span>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 2)}>
                        {this.props.bible.book_id}
                    </button>
                    <span>></span>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 3)}>
                        {this.props.bible.chapter_id}
                    </button>
                    <span>></span>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 4)}>
                        {this.props.bible.verse_id}
                    </button>
                </div>
                <h5>Selected Verse</h5>
                <div dangerouslySetInnerHTML={{__html: this.state.verse.content}} />
                <div class="col text-center">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Submit this verse
                    </button>
                </div>
                
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
            </div>
        )
    }
}


Verse.contextType = AuthContext;
export default Verse;
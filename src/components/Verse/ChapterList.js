import React from 'react';
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import getHeader from '../../helpers/get-header'
class ChapterList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chapter_list : null
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.bible.currentStep !== prevProps.bible.currentStep && this.props.bible.currentStep === 3) {
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/" + this.props.bible.bible_id + "/" + this.props.bible.book_id, getHeader())
            .then(response => {
                this.setState({chapter_list : response.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    handleClick (chapter_id) {
        this.props.setChapter(chapter_id)
    }

    handleNavClick (current_step) {
        this.props.setStep(current_step)
    }

    render () {

        if (this.props.bible.currentStep !== 3) {
            return null
        }
        if (this.state.chapter_list === null) {
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
                </div>
                <h5>Select a Chapter</h5>
                {this.state.chapter_list.map((chapter)=>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">
                                {chapter.reference}
                            </h5>
                            
                        </div>
                        <button onClick={this.handleClick.bind(this, chapter.id)} className="btn btn-primary">View section</button>
                    </div>
                )}
                
            </div>

        )
    }
}
export default ChapterList;
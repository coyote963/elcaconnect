import React from 'react';
import axios from 'axios'
import JsonViewer from 'react-json-view'
class ChapterList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chapter_list : null
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.book_id !== prevProps.book_id) {
            if (this.props.bible_id !== "" && this.props.book_id !== "") {
                axios.get(process.env.REACT_APP_SERVER_URL + "bible/" + this.props.bible_id + "/" + this.props.book_id)
                .then(response => {
                    this.setState({chapter_list : response.data})
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
    handleClick (chapter_id) {
        this.props.setChapter(chapter_id)
    }

    handleNavClick (current_step) {
        this.props.setStep(current_step)
    }

    render () {

        if (this.props.currentStep !== 3) {
            return null
        }
        if (this.state.chapter_list === null) {
            return (<h1>Loading...</h1>)
        }
        return(
            <div>
                <div className="row">
                    <span>Navigate to &#9658;</span>
                    <br></br>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 1)}>
                        {this.props.bible_abbr}
                    </button>
                    <span>&#9658;</span>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 2)}>
                        {this.props.book_id}
                    </button>
                </div>
                {this.state.chapter_list.map((chapter)=>
                    <div className="card mt-5">
                        <div className="card-body">
                            <h5 className="card-title">
                                {chapter.reference}
                            </h5>
                            <button onClick={this.handleClick.bind(this, chapter.id)} className="btn btn-primary">View section</button>
                        </div>
                    </div>
                )}
                
            </div>

        )
    }
}
export default ChapterList;
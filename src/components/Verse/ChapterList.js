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
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li class="breadcrumb-item">
                            <button className="btn btn-link p-0" 
                            onClick={this.handleNavClick.bind(this, 1)}>
                                Bible: {this.props.bible.bible_abbr}
                            </button>
                        </li>
                        <li class="breadcrumb-item">
                            <button className="btn btn-link p-0" 
                            onClick={this.handleNavClick.bind(this, 2)}>
                                Book: {this.props.bible.book_id}
                            </button>
                        </li>
                    </ol>
                </nav>
                
                <h5>Select a Chapter</h5>
                <div className="d-flex flex-wrap">
                    {this.state.chapter_list.map((chapter)=>
                        <div className="card col-3 m-1">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {chapter.reference}
                                </h5>
                                <button onClick={this.handleClick.bind(this, chapter.id)} className="btn btn-primary">View section</button>
                            </div>
                            
                        </div>
                    )}
                </div>
                
            </div>

        )
    }
}
export default ChapterList;
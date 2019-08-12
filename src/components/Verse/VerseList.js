import React from 'react';
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import getHeader from '../../helpers/get-header'
class VerseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content : null,
            verse_list : null
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.bible.currentStep !== prevProps.bible.currentStep && this.props.bible.currentStep === 4) {
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/chaptercontent/" + this.props.bible.bible_id + "/" + this.props.bible.chapter_id, getHeader())
            .then(response => {
                this.setState({content : response.data.content})
            })
            .catch(err => {
                console.log(err)
            })
            
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/verse/" + this.props.bible.bible_id + "/" + this.props.bible.chapter_id, getHeader())
            .then(response => {
                this.setState({verse_list : response.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    handleClick (verse_id) {
        this.props.setVerse(verse_id)
    }
    handleNavClick (current_step) {
        this.props.setStep(current_step)
    }
    render () {
        if (this.props.bible.currentStep !== 4) {
            return null
        }
        if (this.state.content === null || this.state.verse_list === null) {
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
                        <li class="breadcrumb-item">
                            <button className="btn btn-link p-0" 
                            onClick={this.handleNavClick.bind(this, 3)}>
                                Chapter: {this.props.bible.chapter_id}
                            </button>
                        </li>
                    </ol>
                </nav>
                <h5>Select the Verse</h5>
                
                {this.state.verse_list.map((verse, index) => 
                    <button onClick={this.handleClick.bind(this, verse.id)} type="button" className="btn btn-outline-primary mx-1 my-1">{verse.id}</button>
                )}
                <h5>For reference: </h5>
                <div className="scripture-styles" dangerouslySetInnerHTML={{__html: this.state.content}} />
            </div>

        )
    }
}
export default VerseList;
import React from 'react';
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
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
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/chaptercontent/" + this.props.bible.bible_id + "/" + this.props.bible.chapter_id)
            .then(response => {
                this.setState({content : response.data.content})
            })
            .catch(err => {
                console.log(err)
            })
            
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/verse/" + this.props.bible.bible_id + "/" + this.props.bible.chapter_id)
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
                </div>
                <h5>Select the Verse</h5>
                
                {this.state.verse_list.map((verse, index) => 
                    <button onClick={this.handleClick.bind(this, verse.id)} type="button" className="btn btn-outline-primary mx-1 my-1">{verse.id}</button>
                )}
                <h5>For reference: </h5>
                <div dangerouslySetInnerHTML={{__html: this.state.content}} />
            </div>

        )
    }
}
export default VerseList;
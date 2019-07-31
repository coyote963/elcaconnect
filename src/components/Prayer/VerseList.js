import React from 'react';
import axios from 'axios'
import JsonViewer from 'react-json-view'
class VerseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content : null,
            verse_list : null
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentStep !== prevProps.currentStep) {
            if (this.props.currentStep === 4) {
                axios.get(process.env.REACT_APP_SERVER_URL + "bible/chaptercontent/" + this.props.bible_id + "/" + this.props.chapter_id)
                .then(response => {
                    this.setState({content : response.data.content})
                })
                .catch(err => {
                    console.log(err)
                })
                
                axios.get(process.env.REACT_APP_SERVER_URL + "bible/verse/" + this.props.bible_id + "/" + this.props.chapter_id)
                .then(response => {
                    this.setState({verse_list : response.data})
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
    handleClick (verse_id) {
        this.props.setVerse(verse_id)
    }
    handleNavClick (current_step) {
        this.props.setStep(current_step)
    }
    render () {
        if (this.props.currentStep !== 4) {
            return null
        }
        if (this.state.chapter_list === null || this.state.verse_list === null) {
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
                    <span>&#9658;</span>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 3)}>
                        {this.props.chapter_id}
                    </button>
                </div>
                <h5>Select the Verse</h5>
                
                {this.state.verse_list.map((verse, index) => 
                    <button onClick={this.handleClick.bind(this, verse.id)} type="button" className="btn btn-outline-primary mx-1 my-1">{index}</button>
                )}
                <h5>For reference: </h5>
                <div dangerouslySetInnerHTML={{__html: this.state.content}} />            
            </div>

        )
    }
}
export default VerseList;
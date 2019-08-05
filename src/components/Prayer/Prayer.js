import React from 'react'
import BibleList from './BibleList'
import BookList from './BookList'
import ChapterList from './ChapterList';
import VerseList from './VerseList'
import Verse from './Verse';

class Prayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            bible_abbr: "",
            bible_id: "",
            book_id: "",
            chapter_id: "",
            verse_id: ""
        }
    }

    setBible = (bible_id, bible_abbr) => {
        this.setState({
            bible_id : bible_id,
            bible_abbr : bible_abbr,
            currentStep : 2
        }) 
    }

    setBook = (book_id) => {
        this.setState({
            book_id : book_id,
            currentStep : 3
        })
    }

    setChapter = (chapter_id) => {
        this.setState({
            chapter_id : chapter_id,
            currentStep : 4
        })
    }
    
    setVerse = (verse_id) => {
        this.setState({
            verse_id:  verse_id,
            currentStep : 5
        })
    }

    setStep =  (currentStep) => {
        this.setState({
            currentStep : currentStep
        })
    }
    render() {
        return (
            <div className="container">
                <h1>Request a Prayer</h1>
                <h3>(Step {this.state.currentStep} of 5)</h3>
                <hr></hr>
                <BibleList 
                    currentStep={this.state.currentStep}
                    setBible={this.setBible}
                />
                <BookList
                    bible={this.state}
                    setBook={this.setBook}
                    setStep={this.setStep}
                />
                <ChapterList
                    bible={this.state}
                    setChapter= {this.setChapter}
                    setStep={this.setStep}
                />
                <VerseList
                    bible={this.state}
                    setVerse = {this.setVerse}
                    setStep={this.setStep}
                />
                <Verse
                    bible={this.state}
                    setStep={this.setStep}
                />
            </div>
        )
    }
}
export default Prayer
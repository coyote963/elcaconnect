import React from 'react'
import BibleList from './BibleList'
import BookList from './BookList'
import ChapterList from './ChapterList';
import VerseList from './VerseList'
import Verse from './Verse';
import SearchBox from './SearchBox'
import VerseModal from './VerseModal'
import { Book } from 'react-feather'
class Prayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            bible_abbr: "",
            bible_id: "",
            book_id: "",
            chapter_id: "",
            verse_id: "",
            results : null,
            bibleView : true
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
    
    handleSearch = (results) => {
        this.setState({
            bibleView : false,
            results : results,
            currentStep : 1
        })
        
    }

    handleSearchClose = () => {
        this.setState({
            bibleView : true
        })
    }

    render() {
        if (!this.state.bibleView) {
            
            return (
                <div className="container">
                    <div className="row d-flex justify-content-between">
                        <h1>Results</h1>
                        <button onClick={this.handleSearchClose} className="btn btn-outline-secondary"><Book /> Browse</button>
                    </div>
                    {this.state.results.map((result)=> {
                        return (<div className="card mt-3">
                            <div className="card-body">
                                <button className="btn" data-toggle="modal" data-target="#exampleModal">
                                    <h5 className="card-title">
                                        {result.text}
                                    </h5>
                                </button>
                                <p >
                                    ~{result.reference}
                                </p>
                            </div>
                            <VerseModal
                                verse={result}
                                bible={{
                                    verse_id : result.id,
                                    bible_abbr : this.state.bible_abbr
                                }}
                            />
                        </div>)  
                    }
                    )}
                    
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <h1>Request a Prayer</h1>
                    {this.state.currentStep > 1 && 
                        <SearchBox
                            handleSearch={this.handleSearch}
                            bible={this.state}/>  
                    }
                </div>
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
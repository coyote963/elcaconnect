import React from 'react';
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import getHeader from '../../helpers/get-header'

class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book_list : null
        }
    }
    componentDidUpdate(prevProps) {
        
        if (this.props.bible.currentStep !== prevProps.bible.currentStep && this.props.bible.currentStep === 2) {
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/" + this.props.bible.bible_id, getHeader())
            .then(response => {
                this.setState({book_list : response.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    handleClick (book_id) {
        this.props.setBook(book_id)
    }

    handleNavClick (current_step) {
        this.props.setStep(current_step)
    }
    render () {
        
        if (this.props.bible.currentStep !== 2) {
            return null
        }
        if (this.state.book_list === null) {
            return (<Spinner />)
        }
        return(
            <div>
                <div className="row">
                    <span className="align-text-bottom">Navigate to ></span>
                    <br></br>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 1)}>
                        {this.props.bible.bible_abbr}
                    </button>
                </div>
                <h5>Select a Book</h5>
                {this.state.book_list.map((book)=>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">
                                [{book.abbreviation}] - {book.name}
                            </h5>
                            <p className="card-text">
                                {book.nameLong} 
                            </p>
                            <button onClick={this.handleClick.bind(this, book.id)} className="btn btn-primary">View section</button>
                        </div>
                    </div>
                )}
            </div>

        )
    }
}
export default BookList;
import React from 'react';
import axios from 'axios'
import JsonViewer from 'react-json-view'
class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book_list : null
        }
    }
    componentDidUpdate(prevProps) {
        
        if (this.props.currentStep !== prevProps.currentStep && this.props.currentStep === 2) {
            axios.get(process.env.REACT_APP_SERVER_URL + "bible/" + this.props.bible_id)
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

        if (this.props.currentStep !== 2) {
            return null
        }
        if (this.state.book_list === null) {
            return (<h1>Loading...</h1>)
        }
        return(
            <div>
                <div className="row">
                    <span class="align-text-bottom">Navigate to &#9658;</span>
                    <br></br>
                    <button className="btn btn-link p-0" 
                        onClick={this.handleNavClick.bind(this, 1)}>
                        {this.props.bible_abbr}
                    </button>
                </div>
                
                {this.state.book_list.map((book)=>
                    <div className="card mt-5">
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
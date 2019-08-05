import React from 'react';
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
class BibleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bible_list : null
        }
    }
    componentDidMount () {
        if (this.props.currentStep === 1) {
            axios.get(process.env.REACT_APP_SERVER_URL + "bible")
            .then(response => {
                this.setState({bible_list : response.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    handleClick (bible_id, bible_abbr) {
        this.props.setBible(bible_id, bible_abbr)
    }
    render () {
        if (this.props.currentStep !== 1) {
            return null
        }
        if (this.state.bible_list === null) {
            return (<Spinner />)
        }
        return(
            <div>
                <h5>Select a Bible</h5>

                {this.state.bible_list.map((bible)=>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">
                                {bible.name}
                            </h5>
                            <p className="card-text">
                                {bible.description} ({bible.abbreviation})
                            </p>
                            <button onClick={this.handleClick.bind(this, bible.id, bible.abbreviation)} className="btn btn-primary">View books</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default BibleList;
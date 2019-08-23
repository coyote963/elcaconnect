import React from 'react';
import axios from 'axios'
import getHeader from '../../helpers/get-header'
import { Search } from 'react-feather'
class SearchBox extends React.Component {
    constructor () {
        super();
        this.state = {
            query : ""
        };
        this.onChange = this.onChange.bind(this)
    }
    onChange = e => {
        this.setState({
            query : e.target.value
        })
    }
    onSubmit = e => {
        axios.get(process.env.REACT_APP_SERVER_URL + "bible/search/" + this.props.bible.bible_id + "/" + this.state.query, getHeader())
        .then(res => {
            this.props.handleSearch(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    render () {
        return (
            <div className="form-inline row">
                <input value={this.state.query} 
                    onChange={this.onChange}
                    class="form-control" 
                    placeholder={"Search " + (this.props.bible.bible_abbr)  + " ..."}
                />
                <button onClick={this.onSubmit} className="btn btn-primary py-1 px-2"><Search /></button>
            </div>
        )
    }
}
export default SearchBox
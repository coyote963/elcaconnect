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
        e.preventDefault()
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
            <form onSubmit={this.onSubmit} className="form-inline row">
                <input value={this.state.query}
                    type="search" 
                    onChange={this.onChange}
                    class="form-control" 
                    placeholder={"Search " + (this.props.bible.bible_abbr)  + " ..."}
                />
                <button type="submit" value="Submit" className="btn btn-primary py-1 px-2"><Search /></button>
            </form>
        )
    }
}
export default SearchBox
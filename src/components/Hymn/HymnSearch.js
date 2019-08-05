import React from 'react'
import './Hymn.css'
class HymnSearch extends React.Component {
    constructor (props) {
        super(props);
        this.state = { searchTerm : ""}
        this.onChange = this.onChange.bind(this)
    }
    onChange = e => {
        this.setState( { searchTerm : e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.searchTerm)
    }

    render () {
        return (
            <section class="d-flex text-center">
                <div class="container d-flex justify-content-center">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-10" >
                            <h1>Search for a Hymn</h1>
                            <p>Search from more than 20,000 hymns. Once you find the one you want, 
                                with a few clicks notify your pastor! Search via the first verse or title</p>
                            <form onSubmit={this.onSubmit}>
                                <div class="input-group input-group-lg">
                                    <input 
                                        placeholder="Search the hymn database" 
                                        type="text" class="form-control" aria-label="Large" 
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={this.onChange}    
                                        value={this.state.searchTerm}
                                    />
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-secondary">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default HymnSearch;
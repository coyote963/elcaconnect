import React from 'react';
import HymnSearch from './HymnSearch'
import TopHymnList from './TopHymnList'
import HymnResults from './HymnResults'
class Hymn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm : "",
            initialLoad : true
        }
    }
    
    onSubmit = (searchTerm) => {
        this.setState({ searchTerm : searchTerm, initialLoad : false})
    }
    handleClick = (hymn) => {
        
    }

    render () {
        if (this.state.initialLoad) {
            return (
                <div >
                    <HymnSearch onSubmit={this.onSubmit} />
                    <TopHymnList />
                </div>
            )
        }
        return (
            <div >
                <HymnSearch onSubmit={this.onSubmit} />
                <HymnResults  searchTerm={this.state.searchTerm} handleClick={this.handleClick}/>
                <TopHymnList />
            </div>
        )
    }
}
export default Hymn;
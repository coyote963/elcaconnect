import React from 'react'
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import HymnDetail from './HymnDetail'
import HymnModal from './HymnModal'
class HymnResults extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            results : null,
            loading : false,
            hymn : null
        }
    }
    componentDidMount () {
        this.setState({ loading : true})
        axios.get(process.env.REACT_APP_SERVER_URL + "hymn/search/" + this.props.searchTerm )
        .then(response => {
            this.setState({ results : response.data , loading : false })
        })
        .catch(err => {
            console.log(err)
        })
    }
    componentDidUpdate (prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.setState({ loading : true})
            axios.get(process.env.REACT_APP_SERVER_URL + "hymn/search/" + this.props.searchTerm )
            .then(response => {
                this.setState({ results : response.data , loading : false })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    selectHymn (hymn) {
        this.setState({hymn: hymn})
    }

    render () {
        if (this.state.results === null || this.state.loading) {
            return (<Spinner />)
        }
        if (this.state.results.length > 0) {
            return (
                <div>
                    <div className="container my-3">
                        <h1>Results for "{this.props.searchTerm}"</h1>
                    </div>
                    <div class="container">
                        {this.state.results.map((hymn) => 
                            <div class="card my-1">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <HymnDetail hymn={hymn}/>
                                        </div>
                                        <button onClick={this.selectHymn.bind(this, hymn)} data-toggle="modal" data-target="#exampleModal" type="button" class="btn btn-outline-secondary ">
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <HymnModal hymn={this.state.hymn}/>
                </div>
                
            )   
        } else {
            return <div className="container"><h1>No results for "{this.props.searchTerm}"</h1></div>
        }
    }
}
export default HymnResults;
import React from 'react'
import axios from 'axios'
import Spinner from '../../helpers/Spinner'
import getHeader from '../../helpers/get-header'
class TopHymnList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            topHymnList : null,
            startIndex : 0
        }
    }

    componentDidMount () {
        axios.get(process.env.REACT_APP_SERVER_URL + 'hymn/', getHeader())
            .then(response => {
                this.setState({topHymnList : response.data})
            })
            .catch(err => {
                console.log(err)
            })
        
    }
    
    render() {
        if (this.state.topHymnList === null) {
            return (<Spinner />)
        }
        return (
            <div class="container">
                <div class="d-flex justify-content-center my-5">
                    <h5>Currently Most Popular Hymns</h5>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col col-lg-4">
                        <ul class="list-group">
                        {this.state.topHymnList.slice(this.state.startIndex, this.state.startIndex + 5 ).map((hymn) =>
                            <li class="list-group-item">{hymn.displayTitle}</li>
                        )}
                        </ul>
                    </div>
                    <div class="col col-lg-4">
                        <ul class="list-group">
                        {this.state.topHymnList.slice(this.state.startIndex + 5, this.state.startIndex + 10 ).map((hymn) =>
                            <li class="list-group-item">{hymn.displayTitle}</li>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopHymnList;
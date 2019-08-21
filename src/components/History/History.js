import React from 'react'
import HymnHistory from './HymnHistory'
import VerseHistory from './VerseHistory'
import PrayerHistory from './PrayerHistory'
class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = { view : 'hymn' }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(view) {
        this.setState({ view : view})
    }
    render() {
        return (
            <div p-3>
                <h1 className="text-center">Your History</h1>
                <div class="card text-center">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <button onClick={this.handleClick.bind(this, "hymn")} className={"nav-link btn " + (this.state.view === 'hymn' ? 'active' : null)}>
                                    Hymns
                                </button>
                            </li>
                            <li className="nav-item">
                                <button onClick={this.handleClick.bind(this, "verse")} className={"nav-link btn " + (this.state.view ==='verse' ? 'active' : null)}>
                                    Verses
                                </button>
                            </li>
                            <li className="nav-item">
                                <button onClick={this.handleClick.bind(this, "prayer")} className={"nav-link btn " + (this.state.view ==='prayer' ? 'active' : null)}>
                                    Prayers
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <HymnHistory view={this.state.view} />
                        <VerseHistory view={this.state.view} />
                        <PrayerHistory view={this.state.view} />
                    </div>
                </div>
                
                
            </div>
        )
    }
}
export default History ;
import React from 'react'
import HymnHistory from './HymnHistory'
import VerseHistory from './VerseHistory'
import PrayerHistory from './PrayerHistory'
class History extends React.Component {
    render() {
        return (
            <div p-3>
                
                <h1 className="text-center">Your History</h1>
                <div class="card-deck m-5 p-5">
                    <HymnHistory />
                    <VerseHistory />
                </div>
                <PrayerHistory />
                
            </div>
        )
    }
}
export default History ;
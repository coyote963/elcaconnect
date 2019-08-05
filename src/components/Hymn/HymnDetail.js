import React from 'react'

function HymnDetail (props) {
    return (
        <div>
            
            <h5>{props.hymn.displayTitle}</h5>
            <p className="text-muted">{props.hymn.authors}</p>
            <p className="font-italic">"{props.hymn.firstLine}"</p>
        </div>
    )
}
export default HymnDetail
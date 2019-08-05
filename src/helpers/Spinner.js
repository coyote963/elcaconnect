import  { ClipLoader } from 'react-spinners'
import React from 'react'
function Spinner (props) {
    return (
        <div className='sweet-loading'>
        <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={true}
        />
        </div>
    )
}

export default Spinner;

import React from 'react'

const LinkComponent = (props) => {
    const { record } = props
    const lat  = record.params["address.location.coordinates.0"]
    const long = record.params["address.location.coordinates.1"]
  console.log(record)
  const mapsLink = `http://google.com/maps/@${lat},${long},15z`

  return (


      <a href={mapsLink} target="_blank" rel="noopener noreferrer">
        View Location
      </a>

    
  )
}

export default LinkComponent

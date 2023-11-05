import React, { Component } from 'react'

export class CancellationItems extends Component {
  render() {
    return (
      <div style={ backgroundStyle }>{ this.props.cancellations.title}</div>
    )
  }
}

const backgroundStyle = {
    padding: '10px',
    borderBottom: '.1px #000000 dotted',
}

export default CancellationItems
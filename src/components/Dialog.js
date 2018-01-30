import React from 'react'
import { createPortal } from 'react-dom'
import injectSheet from 'react-jss'

// define css
const styles = {
  dialog: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

class Dialog extends React.Component {
  constructor() {
    super(...arguments)

    const doc = window.document
    this.node = doc.createElement('div')
    doc.body.appendChild(this.node)
  }

  render() {
    return createPortal(
      <div className={this.props.classes.dialog}>{this.props.children}</div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    )
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node)
  }
}

export default injectSheet(styles)(Dialog)

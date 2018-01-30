import React from 'react'

class Play extends React.Component {
  constructor() {
    super(...arguments)

    this.onClick = this.onClick.bind(this)
    this.onClickLater = this.onClickLater.bind(this)

    this.state = {
      count: 0
    }
  }

  onClick() {
    this.setState({ count: this.state.count + 1 })
    console.log('# this.state', this.state)
  }

  onClickLater() {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log('# this.state', this.state)
    })
  }

  componentDidMount() {
    document.querySelector('#btn-raw').addEventListener('click', this.onClick)
  }

  render() {
    console.log('#enter render')
    return (
      <div>
        <div>
          {this.state.count}
          <button onClick={this.onClick}>Increment</button>
          <button id="btn-raw">Increment Raw</button>
          <button onClick={this.onClickLater}>Increment Later</button>
        </div>
      </div>
    )
  }
}

export default Play

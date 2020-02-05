import React, { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: 30,
    }
    this.timeoutId = undefined
  }

  componentDidMount() {
    this.timeoutId = setInterval(() => this.clock(), 1000)
  }

  clock = () => {
    this.setState({
      timeRemaining: this.state.timeRemaining - 1,
    })
    if (this.state.timeRemaining === 25) {
      clearTimeout(this.timeoutId)
    }
  }

  onResetTimer = () => {
    clearTimeout(this.timeoutId)
  }

  onGetTimeRemaining = () => {
    return 30 - this.state.timeRemaining
  }

  render() {
    const { timeRemaining } = this.state
    return <span>{timeRemaining}</span>
  }
}

export default Timer

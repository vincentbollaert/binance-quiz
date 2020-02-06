import React, { Component } from 'react'
import styled from 'styled-components'

const Progress = styled.div`
  position: absolute;
  top: 0;
  height: 4px;
  background-color: ${props => `rgba(255, 92, 92, ${props.progress / 100})`};
  width: ${props => props.progress}%;
  transition: width 0.1s ease, background-color 0.1s ease;
`

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: 20,
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
    if (this.state.timeRemaining === 0) {
      clearTimeout(this.timeoutId)
      this.props.setTimeFinished()
    }
    return this.state.timeRemaining
  }

  onResetTimer = () => {
    clearTimeout(this.timeoutId)
  }

  onGetTimeRemaining = () => {
    return this.state.timeRemaining
  }

  render() {
    const { timeRemaining } = this.state
    return (
      <Progress progress={((20 - timeRemaining) / 20) * 100} />
    )
  }
}

export default Timer

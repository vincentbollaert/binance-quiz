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

export const TIMER_LENGTH = 20

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: TIMER_LENGTH,
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

  onStopTimer = ({ isReset }) => {
    clearTimeout(this.timeoutId)
    if (isReset) {
      this.setState({ timeRemaining: TIMER_LENGTH })
      this.timeoutId = setInterval(() => this.clock(), 1000)
    }
  }

  onGetTimeRemaining = () => {
    return this.state.timeRemaining
  }

  render() {
    const { timeRemaining } = this.state
    return (
      <Progress progress={((TIMER_LENGTH - timeRemaining) / TIMER_LENGTH) * 100} />
    )
  }
}

export default Timer

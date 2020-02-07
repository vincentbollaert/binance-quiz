import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'
import { TIMER_LENGTH } from '../shared'

const Progress = styled.div`
  position: absolute;
  top: 0;
  width: ${props => props.progress}%;
  height: 4px;
  background-color: ${props => `rgba(255, 92, 92, ${props.progress / 100})`};
  transition: width 0.1s ease, background-color 0.1s ease;
`

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: TIMER_LENGTH,
    }
    this.timeoutId = undefined
  }

  componentDidMount() {
    this.timeoutId = setInterval(() => this.onUpdateTimer(), 1000)
  }

  onUpdateTimer = () => {
    this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))

    if (this.state.timeRemaining === 0) {
      clearTimeout(this.timeoutId)
      this.props.setTimeFinished()
    }
    return this.state.timeRemaining
  }

  onStopTimer = ({ isReset, isRestart }) => {
    clearTimeout(this.timeoutId)

    if (isReset) {
      this.setState({ timeRemaining: TIMER_LENGTH })
    }

    if (isRestart) {
      this.setState({ timeRemaining: TIMER_LENGTH })
      this.timeoutId = setInterval(() => this.onUpdateTimer(), 1000)
    }
  }

  onGetTimeToChoose = () => {
    return TIMER_LENGTH - this.state.timeRemaining
  }

  render() {
    const { isQuizComplete } = this.props
    const { timeRemaining } = this.state
    return (
      isQuizComplete ? null : <Progress progress={((TIMER_LENGTH - timeRemaining) / TIMER_LENGTH) * 100} />
    )
  }
}

Timer.propTypes = {
  isQuizComplete: bool.isRequired,
  setTimeFinished: func.isRequired,
}

export default Timer

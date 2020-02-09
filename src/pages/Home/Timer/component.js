import React, { Component } from 'react'
import { bool, func, shape } from 'prop-types'
import styled from 'styled-components'
import { TIMER_LENGTH } from '../shared'
import { TRANSITION_SLOW } from '../../../styles'
import { PROP_ASYNC_STATUS } from '../../../constants'

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  width: ${props => props.progress}%;
  height: 4px;
  background-color: #613e3e;
  transition: width ${TRANSITION_SLOW};
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
    const { asyncStatus: { isSuccessful } } = this.props
    if (!isSuccessful) return false

    this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))

    if (this.state.timeRemaining === 0) {
      clearTimeout(this.timeoutId)
      this.props.setTimeFinished()
    }
    return this.state.timeRemaining
  }

  onSetTimer = ({ isReset, isRestart }) => {
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
      isQuizComplete ? null : (
        <ProgressBar progress={((TIMER_LENGTH - timeRemaining) / TIMER_LENGTH) * 100} data-testid="component-timer" />
      )
    )
  }
}

Timer.propTypes = {
  isQuizComplete: bool.isRequired,
  setTimeFinished: func.isRequired,
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
}

export default Timer

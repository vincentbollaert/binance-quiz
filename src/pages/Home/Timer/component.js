import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from 'react'
import { func } from 'prop-types'
import styled from 'styled-components'
import { QuizContext } from '../../../context/QuizContext'
import { TRANSITION_SLOW } from '../../../styles'

import { TIMER_LENGTH } from '../shared'

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  width: ${props => props.progress}%;
  height: 4px;
  background-color: #613e3e;
  transition: width ${TRANSITION_SLOW};
`

const Timer = forwardRef(({ setTimeFinished }, ref) => {
  const { isQuizComplete, asyncStatus } = useContext(QuizContext)
  const [timeRemaining, setTimeRemaining] = useState(TIMER_LENGTH)
  const timeoutIdRef = useRef(null)
  const timeRemainingRef = useRef(null)
  timeRemainingRef.current = timeRemaining

  useEffect(() => {
    timeoutIdRef.current = setInterval(() => onUpdateTimer(), 1000)
  }, [])

  function onUpdateTimer() {
    const { isSuccessful } = asyncStatus
    if (!isSuccessful) return false

    setTimeRemaining(time => time - 1)

    if (timeRemainingRef.current === 0) {
      clearTimeout(timeoutIdRef.current)
      setTimeFinished()
    }
  }

  useImperativeHandle(ref, () => ({
    onSetTimer({ isReset, isRestart }) {
      clearTimeout(timeoutIdRef.current)

      if (isReset) {
        setTimeRemaining(TIMER_LENGTH)
      }

      if (isRestart) {
        setTimeRemaining(TIMER_LENGTH)
        timeoutIdRef.current = setInterval(() => onUpdateTimer(), 1000)
      }
    },
    onGetTimeToChoose() {
      return TIMER_LENGTH - timeRemaining
    }
  }))

  return (
    isQuizComplete ? null : (
      <ProgressBar
        ref={ref}
        progress={((TIMER_LENGTH - timeRemaining) / TIMER_LENGTH) * 100}
        data-testid="component-timer"
      />
    )
  )
})

Timer.propTypes = {
  setTimeFinished: func.isRequired,
}

export default Timer

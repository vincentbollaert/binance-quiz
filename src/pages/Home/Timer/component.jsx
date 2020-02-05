import React, { useEffect } from 'react'

const Timer = ({ timeRemaining, setTimer }) => {
  useEffect(() => {
    const timeout = setTimeout(() => setTimer(timeRemaining - 1), 1000)
    if (timeRemaining === 1) {
      clearTimeout(timeout)
    }
  })

  // TODO: fix this timer

  return (
    <div>
      {timeRemaining}
    </div>
  )
}

export default Timer

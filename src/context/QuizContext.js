import React, { createContext, useReducer } from 'react'
import { any } from 'prop-types'

import reducer, { init } from '../pages/Home/reducer'

export const QuizContext = createContext(null)
export const QuizContextDispatch = createContext(null)

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  return (
    <QuizContext.Provider value={state}>
      <QuizContextDispatch.Provider value={dispatch}>
        {children}
      </QuizContextDispatch.Provider>
    </QuizContext.Provider>
  )
}

QuizProvider.propTypes = {
  children: any.isRequired,
}

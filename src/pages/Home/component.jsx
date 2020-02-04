import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import reducer, { init, getDataRequested, getDataSucceeded, getDataFailed, selectChoice } from './reducer'
import SpinnerLoader from '../../components/Spinner/component'

const Terms = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const Term = styled.div`
  padding: 24px;
  margin-bottom: 12px;
  background-color: #e1e1e1;
`
const Description = styled.div`
`

const Choices = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`
const Choice = styled.div`
  background: #444;
  padding: 4px 8px;
  color: #eee;
  margin: 0 4px;
`

const SelectedChoices = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 12px;
`
const SelectedChoice = styled.div`
  border-bottom: 1px solid red;
`

const Home = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const { terms, choices, asyncStatus } = state

  useEffect(() => {
    dispatch(getDataRequested())
    axios.get('http://api.binance.vision/api/glossaries/')
      .then(({ data }) => dispatch(getDataSucceeded({ payload: data })))
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }, [])

  function handleChoiceSelect({ id, choice, correctChoice }) {
    console.log(choice, correctChoice)
    dispatch(selectChoice({ id, selectedChoice: choice, correctChoice }))
  }

  return (
    <div>
      <SpinnerLoader asyncStatus={asyncStatus} />
      <SelectedChoices>
        {choices.map(({ id, selectedChoice, correctChoice }) => (
          <SelectedChoice>
            <div>Term id: {id}</div>
            <div>selected choice: {selectChoice}</div>
            <div>correct choice: {correctChoice}</div>
            <div>correct? {selectedChoice === correctChoice ? 'YES :)' : 'NO :('}</div>
          </SelectedChoice>
        ))}
      </SelectedChoices>
      <Terms>
        {terms.map(({ id, title, slug, excerpt, choices: termChoices }) => (
          <Term key={id}>
            <Description>{excerpt}</Description>
            <Choices>
              {termChoices.map(choice => (
                <Choice
                  key={choice}
                  onClick={() => handleChoiceSelect({ id, choice, correctChoice: title })}
                >
                  {choice}
                </Choice>
              ))}
            </Choices>
          </Term>
        ))}
      </Terms>
    </div>
  )
}

export default Home

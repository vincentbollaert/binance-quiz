import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import reducer, { init, getDataRequested, getDataSucceeded, getDataFailed } from './reducer'
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

const Home = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const { terms, asyncStatus } = state

  useEffect(() => {
    dispatch(getDataRequested())
    axios.get('http://api.binance.vision/api/glossaries/')
      .then(({ data }) => dispatch(getDataSucceeded({ payload: data })))
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }, [])

  return (
    <div>
      <SpinnerLoader asyncStatus={asyncStatus} />
      <Terms>
        {terms.map(({ id, title, slug, excerpt, choices }) => (
          <Term key={id}>
            <Description>{excerpt}</Description>
            <Choices>
              {choices.map(choice => (
                <Choice key={choice}>{choice}</Choice>
              ))}
            </Choices>
          </Term>
        ))}
      </Terms>
    </div>
  )
}

export default Home

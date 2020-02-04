import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

import reducer, { init, getDataRequested, getDataSucceeded, getDataFailed } from './reducer'
import SpinnerLoader from '../../components/Spinner/component'


const Home = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const { asyncStatus } = state

  useEffect(() => {
    dispatch(getDataRequested())
    axios.get('http://api.binance.vision/api/glossaries/')
      .then(data => dispatch(getDataSucceeded({ payload: data })))
      .catch(error => dispatch(getDataFailed({ payload: error })))
  }, [])

  return (
    <div>
      This is home
      <SpinnerLoader asyncStatus={asyncStatus} />
    </div>
  )
}

export default Home

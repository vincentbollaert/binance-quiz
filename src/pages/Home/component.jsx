import React from 'react'
import axios from 'axios'

const Home = () => {
  function fetchData() {
    axios.get('https://api.binance.vision/api/glossaries').then(data => {
      console.log(data)
    })
  }

  return (
    <div>
      {fetchData()}
      This is home
    </div>
  )
}

export default Home

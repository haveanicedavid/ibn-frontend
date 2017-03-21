import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './App.css'

const App = React.createClass({
  getInitialState () {
    return {
      data: []
    }
  },
  componentDidMount () {
    axios.get('http://localhost:8080/api/snaps/all')
      .then((res) => {
        this.setState({ data: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  render () {
    const dataList = this.state.data.map((obj) => {
      return <li key={obj._id}>{obj._id}</li>
    })
    const ethToBtc = this.state.data.map((snap) => {
      return {
        created: Date.parse(snap.createdAt),
        btce: snap.ethRates.btce,
        poloniex: snap.ethRates.poloniex
      }
    })
    const parseDate = (date) => moment(date).format('M-DD-YY')
    return (
      <div>
        <LineChart width={600} height={300} data={ethToBtc}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey='created' tickCount={100} tickFormatter={parseDate} />
          <YAxis />
          <CartesianGrid strokeDasharray='1 1' />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='btce' stroke='#8884d8' activeDot={{ r: 8 }} />
          <Line type='monotone' dataKey='poloniex' stroke='#82ca9d' activeDot={{ r: 8 }} />
        </LineChart>
        <h1>Ohai</h1>
        <pre><code>{JSON.stringify(this.state.data)}</code></pre>
        <ul>
          {dataList}
        </ul>
      </div>
    )
  }
})

export default App

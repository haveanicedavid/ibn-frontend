import React from 'react'
import axios from 'axios'
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
    return (
      <div>
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

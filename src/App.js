import React from 'react'
import axios from 'axios'
import './App.css'

const App = React.createClass({
  getInitialState () {
    return {
      data: {}
    }
  },
  componentDidMount () {
    axios.get('http://localhost:8080')
      .then((res) => {
        this.setState({ data: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  render () {
    return (
      <div>
        <h1>Ohai</h1>
        <pre><code>{JSON.stringify(this.state.data)}</code></pre>
      </div>
    )
  }
})

export default App

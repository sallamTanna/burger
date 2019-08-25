import React, { Component } from 'react'

class TestComponent extends Component {
  state = {
    counter: 0,
  }
  render() {
    return <div onClick={()=>this.setState(prevState => ({counter: prevState.counter+1}))}>
      You clicked {this.state.counter} times
    </div>
  }
}

export default TestComponent

import React, { Component } from 'react'

class ErrorBoundary extends Component {

  state = {
    errorMessage: ''
  }

  static getDerivedStateFromError(error) {
    return {
      errorMessage: error.toString()
    }
  }

  componentDidCatch(error, info) {
    console.log(error)
    console.log(info)
  }

  render() {
    if (this.state.errorMessage) {
      return <h1>{this.state.errorMessage}</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary

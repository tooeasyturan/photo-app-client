import React, { Component, createContext, useContext } from 'react';
export const ErrorContext = createContext()
export const useError = () => useContext(ErrorContext);

export class ErrorBoundaryProvider extends Component {
  static getDerivedStateFromError(error) {
    return { error };
  }
  state = {
    error: undefined,
  };

  // componentDidMount() {
  //   const params = new URLSearchParams(window.location.search);
  //   switch (params.get('error')) {
  //     case 'access_denied':
  //       this.setState({
  //         error: new Error(
  //           'You must sign in in order to upload to your catalog.',
  //         ),
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  componentDidCatch(error) {
    this.setState({ error });
  }
  render() {
    return (
      <ErrorContext.Provider value={this.state.error}>
        {this.props.children}
      </ErrorContext.Provider>
    );
  }
}


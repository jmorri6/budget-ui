import React, { Component } from 'react';
import { MemoryRouter, Route } from 'react-router'
import Main from './scenes/Main'
import Test from './scenes/Test'

class App extends Component {
  render() {
    return (
      <MemoryRouter>
        <div>
          <Route exact path="/" component={Main} />
        </div>
      </MemoryRouter>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     setUserSession,
//     resetUserSession
//   }, dispatch)
// }

// export default connect( undefined, mapDispatchToProps )(App)


export default App;

import React from 'react';
import './App.css';

import ReactJsonSchema from 'ReactJsonSchema';

const logo = require('./logo.svg');

const welcomeSchema = {
  component: 'h2',
  className: 'text-center',
  text: 'Hello World!'
};

const welcomeBanner = new ReactJsonSchema();
welcomeBanner.parseSchema(welcomeSchema);
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

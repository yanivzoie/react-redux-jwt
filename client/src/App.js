import React from 'react';
import './App.scss';
import HomePage from './Pages/Homepage';
import About from './Pages/About';
import AppNavbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

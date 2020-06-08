import React from 'react';
import './App.scss';
import HomePage from './pages/Homepage';
import About from './pages/About';
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

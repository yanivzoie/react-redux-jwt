import React, { Component } from 'react';
import store from '../../stroe';
import { loadUser } from '../../redux/actions/authActions';

import './styles.scss';

class HomePage extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="container">
        <h1>Hello Herolo</h1>
      </div>
    );
  }
}
export default HomePage;

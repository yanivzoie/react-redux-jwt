import React, { useState, useEffect } from 'react';
import store from '../../stroe';
import { loadUser } from '../../redux/actions/authActions';

import './styles.scss';

const HomePage = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <div className="container">
      <h1>Hello Herolo</h1>
    </div>
  );
};

export default HomePage;

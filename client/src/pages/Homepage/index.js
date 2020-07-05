import React, { useState, useEffect } from 'react';
import store from '../../stroe';
import { loadUser } from '../../redux/actions/authActions';

import './styles.scss';

const HomePage = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <div className="homepage">
      <h1>Yaniv Zoie</h1>
    </div>
  );
};

export default HomePage;

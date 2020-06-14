import React, { useState, Fragment } from 'react';
import Logout from '../Logout';
import Login from '../Login';
import Register from '../Register';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import { Route, NavLink } from 'react-router-dom';
import './styles.scss';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';

export const AppNavbar = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { isAuthenticated, user } = props.auth;

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.user.name}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Register />
      </NavItem>
      <NavItem>
        <Login />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-1">
        <Container>
          <NavbarBrand href="/">Yaniv Zoie</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
        <Route>
          <Nav>
            <NavLink className="link" to="/about">
              About
            </NavLink>
          </Nav>
        </Route>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error,
  };
};

export default connect(mapStateToProps, { register, clearErrors })(AppNavbar);

import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import { usePrevious } from '../../hooks/usePrevious';

export const Login = (props) => {
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState('');

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const prevProps = usePrevious(props);

  useEffect(() => {
    if (props.error !== prevProps) {
      // Check for register error
      if (props.error.id === 'LOGIN_FAIL') {
        setMsg(props.error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    // If authenticated, close modal
    if (modal) {
      if (props.isAuthenticated) {
        toggle();
      }
    }
  });

  const toggle = () => {
    // Clear errors
    props.clearErrors();
    setModal(!modal);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    // const { email, password } = userCredentials;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmit = (e) => {
    const { email, password } = userCredentials;
    e.preventDefault();
    const user = {
      email,
      password,
    };

    // Attempt to login
    props.login(user);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);

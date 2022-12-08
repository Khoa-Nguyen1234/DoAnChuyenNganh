import React, { Component, StyleSheet, Text, View, useState, useRef } from "react";
import { Dropdown, DropdownButton, Row, Col, Container, Button, Modal} from 'react-bootstrap';
import Forgot from './ForgotPass'
import {useSelector, useDispatch} from 'react-redux'
import {loginExit, registerPopup, forgotPopup, forgotExit} from '../actions/'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios'
import { isEmail } from "validator";

import { login } from "../actions/auth";

import pathApi from '../configs/apiPath'


const required = (value) => {


    
    if (!value) {
      return (
        <div className="login-invalid" >
          <p>This field is required!</p>
        </div>
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="login-invalid"><p>Please enter a valid e-mail!</p></div>
      );
    }
  };
  



function Login(props) {

    const form = useRef();
    const checkBtn = useRef();

    const dispatch = useDispatch();

    const [isValid, setValid] = useState(true);
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");

    const { message } = useSelector(state => state.message);

    const handleRegister = (e) => {
        e.preventDefault();
    
        setValid(false);
        
    
        form.current.validateAll();
        
    
        if (checkBtn.current.context._errors.length === 0) {
          dispatch(login(email, password))
            .then(() => {
                setValid(true);
            })
            .catch(() => {
                setValid(false);
            });
        }
      };






    return (
            <Modal {...props}
                    className="login-modal"
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header closeButton className="modal-header">
                    <div></div>
                </Modal.Header>
                <Modal.Body>
                <Container className="modal-login-container">
                <Form onSubmit={handleRegister} ref={form}>
                        <Row>
                            <Col className="login-title">
                            <h3>Login</h3>
                            {message}
                            </Col>
                        </Row>
                        <Row >
                            <Col className="input-username">
                                <label for="username" className="input-username-label" placeholder="Enter your e-mail" >E-MAIL</label>
                                <Input type="text" id="username" name="username" className="form-control" value={email} onChange={e => setMail(e.target.value)} validations={[required, validEmail]}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="input-password">
                                <label for="password"  className="input-password-label" placeholder="Enter your password">PASSWORD</label>
                                <Input type="password" id="password" name="password" className="form-control" value={password} onChange={e => setPass(e.target.value)} validations={[required]}/>
                            </Col>
                        </Row>
                        <Row className="input-checkbox">
                            <Col>
                            <input type="checkbox" id="remember-login" name="remember" value="remember"/>
                            <label for="to_check" className="input-checkbox-label">Remember password</label>
                            </Col>
                            <Col className="login-forgot">
                                <a href="#" onClick={() => {dispatch(loginExit()); dispatch(forgotPopup())}}><p>Forgot your password?</p></a>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col>
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                <button className="login-button-submit"
                                disabled={!email || !password}
                                type="submit"
                                >Login</button>
                            </Col>
                        </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className="login-footer">
                        <p>Don't have an account?            
                            <a href="#" onClick={() => {dispatch(loginExit()); dispatch(registerPopup())}}> Register</a>
                        </p>
                    </div>
                </Modal.Footer>
            </Modal>
    );

}
export default Login; 
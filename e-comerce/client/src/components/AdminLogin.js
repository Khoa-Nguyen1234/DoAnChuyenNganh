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
    };
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="login-invalid"><p>Please enter a valid e-mail!</p></div>
      );
    }
  };
  



function AdminLogin(props) {

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
            <div style={{backgroundImage: "url(/background-admin.jpg)"}} className="background-admin">
              <img className="admin-logo" src="logo.svg"/>
            <Modal
                    show
                    className="login-modal background-admin"
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter "
                    centered>
                <Modal.Header className="modal-header">
                    <div></div>
                </Modal.Header>
                <Modal.Body>
                <Container className="modal-login-container">
                <Form onSubmit={handleRegister} ref={form}>
                        <Row>
                            <Col className="login-title admin-title-login">
                            <h3>Login</h3>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="input-username">
                                <label for="username" className="input-username-label admin-input-login"  >E-MAIL</label>
                                <Input type="text" id="username" name="username" className="form-control" placeholder="Enter your e-mail" value={email} onChange={e => setMail(e.target.value)} validations={[required, validEmail]}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="input-password">
                                <label for="password"  className="input-password-label admin-input-login" >PASSWORD</label>
                                <Input type="password" id="password" name="password" placeholder="Enter your password" className="form-control" value={password} onChange={e => setPass(e.target.value)} validations={[required]}/>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col>
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                <button className="login-button-submit admin-button"
                                disabled={!email || !password}
                                type="submit"
                                >Log in</button>
                            </Col>
                        </Row>
                        <Row className="admin-forgot">
                          <Col>
                              <div className="login-footer admin-login-footer">
                                <p>      
                                    <a href="#" onClick={() => {dispatch(loginExit()); dispatch(forgotPopup())}}>Forgot password</a>
                                </p>
                            </div>
                          </Col>
                        </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            </div>
    );

}
export default AdminLogin; 
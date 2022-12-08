import React, { Component, StyleSheet, Text, View, useState, useEffect, useRef  } from "react";
import { Dropdown, DropdownButton, Row, Col, Container, Button, Modal} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios'
import { isEmail } from "validator";

import {loginPopup, loginExit, registerPopup,registerExit, forgotExit} from '../actions/'
import pathApi from '../configs/apiPath'

import { register } from "../actions/auth";

const required = value => {
    if (!value) {
      return (<div></div>
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
  
  const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="login-invalid"><p>Please enter a valid name!</p></div>
      );
    }
  };

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="login-invalid"><p>Your passwords must be more than 6 characters!</p></div>
      );
    }
  };

function Register(props) {

    const form = useRef();
    const checkBtn = useRef();

    const login = useSelector(state=> state.login)
    const forgot = useSelector(state=> state.forgot)

    const dispatch = useDispatch();




    const [isValid, setValid] = useState(true);
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    const [successful, setSuccessful] = useState(false);

    const [email_exists, setExist] = useState(false);

    
    const { message } = useSelector(state => state.message);

    
    const handleRegister = (e) => {
        e.preventDefault();
    
        setSuccessful(false);
        console.log("Register");
        form.current.validateAll();
        console.log(checkBtn.current.context);
    
        if (checkBtn.current.context._errors.length === 0) {
          dispatch(register(name, email, password));
        
        }
      };
    

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setMail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPass(event.target.value);
    }



        
        return (

                <Modal 
                        {...props}
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
                                <h3>Register</h3>
                                </Col>
                            </Row>
                            <Row >
                                <Col className="input-username">
                                    <label for="name" className="input-username-label">NAME</label>
                                    <Input type="text" id="name" className="form-control" name="name" placeholder="Enter your name" value={name} onChange={handleChangeName} validations={[required, vname]}/>
                                </Col>
                            </Row>
                            <Row >
                                <Col className="input-username">
                                    <label for="username" className="input-username-label">E-MAIL</label>
                                    <Input type="text" id="username" className="form-control" name="username" placeholder="Enter your e-mail" value={email} onChange={handleChangeEmail} validations={[required, validEmail]}/>

                                </Col>
                            </Row>
                            <Row >
                                <Col className="input-password">
                                    <label for="password"  className="input-password-label">PASSWORD</label>
                                    <Input type="password" id="password" className="form-control"    name="password" placeholder="Enter your password" value={password} onChange={handleChangePassword} validations={[required, vpassword]}/>
                                    {email_exists ? <div className="login-invalid"><p>Your email address already exists!</p></div> : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <div className="login-footer">
                                    <p>By creating an account you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> </p>
                                </div>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col>
                                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                    <button className="login-button-submit"
                                    disabled = {!email || !password || !name}
                                    type="submit"   
                                    >Register</button>
                                </Col>
                            </Row>
                            </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="login-footer">
                            <p>Do you have an account? <a href="#" onClick={() => {dispatch(registerExit()); dispatch(loginPopup())}}>Login</a></p>
                        </div>
                    </Modal.Footer>
                </Modal>
        );
    
}
export default Register; 
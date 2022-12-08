import React, { Component, StyleSheet, Text, View, useState } from "react";
import { Dropdown, DropdownButton, Row, Col, Container, Button, Modal} from 'react-bootstrap';

import {useSelector, useDispatch} from 'react-redux'
import {loginPopup, loginExit, registerPopup,registerExit, forgotExit} from '../actions/'


function ForgotPass(props) {
    const [isValid, setValid] = useState(true);
    const [email, setMail] = useState("");

    const dispatch = useDispatch();

    const forgot = useSelector(state=> state.forgot);
    

        

    const ValidateEmail= (mail) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            console.log("true mail")
            return (true);
        }
        console.log("false mail");
        return (false);
        
    };

    const updateUI = () =>{
        if(!ValidateEmail(email)){
            const check_mail = <div className="login-invalid"><p>Please enter a valid e-mail!</p></div>;
            console.log("invalid input");
        }   
        else{
            const check_mail= null;
            console.log("valid input");
        }
    }

    const handleChangeEmail = (event) => {
        setMail(event.target.value);
    }



        return (
            <div>
                <div>
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
                            <Row>
                                <Col className="login-title">
                                <h3>Forgot Password</h3>
                                <div className="forgot-guide"><p>Enter you e-mail address below and we'll get you back on track</p></div>
                                </Col>
                            </Row>
                            <Row >
                                <Col className="input-username">
                                    <label for="username" className="input-username-label" placeholder="Enter your e-mail" >E-MAIL</label>
                                    <input type="text" id="username" name="username" value={email} onChange={handleChangeEmail}/>
                                </Col>
                            </Row>
                            
                            <Row className="forgot-submit">
                                <Col>
                                    <button 
                                    disabled = {!email}
                                    className="login-button-submit" >Submit</button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="login-footer">
                            <p>I remember my password now. <a href="#" onClick={() => {dispatch(forgotExit()); dispatch(loginPopup());}}>Log in</a></p>
                        </div>
                    </Modal.Footer>
                </Modal>
                </div>
               
            </div>

        );
    
}
export default ForgotPass; 
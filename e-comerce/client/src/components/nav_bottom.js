import React, { Component } from 'react';
import { Dropdown, DropdownButton, Row, Col, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'



function Navbottom(props) {


        return (
            <div>
                <hr border="1px solid"/>
            <Container className="navi">
                <Row className="navi-one">
                    <Col></Col>
                </Row>
                <Row className="navi-first">
                    <Col className="nav_logo">
                    <img src={process.env.PUBLIC_URL + "/logo.svg"}></img>
                    </Col>
                    <Col>
                        <div className="nav_page">
                        <div className="nave_page-item"><a href="#"><p>Home</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Product</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Services</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>About us</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Help</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Contact</p></a></div>
                        </div>
                    </Col>
                    <Col className="foot-icon">
                    <img src={process.env.PUBLIC_URL + "/twitter-icon.svg"}/>
                    <img src={process.env.PUBLIC_URL + "/facebook-icon.svg"}/>
                    <img src={process.env.PUBLIC_URL + "/instagram-6-icon.svg"}/>
                    </Col>
                </Row>

                <Row >
                    <Col><hr border="1px solid"/></Col>
                </Row>
                <Row className="navi-third">
                    <Col className="navi-link">
                        <div className="nav_page-link">
                            <div className="nave_page-item"><a href="#"><p>Home</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Product</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Services</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>About us</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Help</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Contact</p></a></div>
                        </div>
                    </Col>
                    <Col className="navi-policy">
                    <div className="nav_term">
                            <div className="nave_page-item"><a href="#"><p>Privacy Policy</p></a></div>
                            <div className="nave_page-item"><a href="#"><p>Terms & Conditions</p></a></div>
                        </div>
                    </Col>
               
                </Row>
            </Container>
            </div>
        )
}

export default Navbottom;
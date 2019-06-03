import React from 'react';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config/firebase';
import {Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Row from "react-bootstrap/Row";
import { bind, memoize, debounce } from 'decko';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const firebaseAuth = firebaseConfig.auth();


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pw: '',
            modal: false,
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePwChange = this.handlePwChange.bind(this);
        this.firebaseLogin = this.firebaseLogin.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(target){
        if(target.charCode==13){
            this.firebaseLogin();
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    firebaseLogin(){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pw).catch(
            () =>                             this.toggle()

        );
    }

    // firebaseLogout(){
    //     firebase.auth().signOut().then(function() {
    //         // Sign-out successful.
    //     }).catch(function(error) {
    //         // An error happened.
    //     });
    // }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePwChange(event){
        this.setState({pw: event.target.value});
    }

    render(){
        return (
            <div>
                <Form style={{marginBottom: "10px"}}>
                    <Row>
                        <Col xs={12} sm={12} md={{size: 8, offset: 2}} lg={{size: 4, offset: 4}} xl={{size: 3, offset: 4}}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                    type="Email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Email"
                                    onChange={this.handleEmailChange}
                                    onKeyPress={this.handleKeyPress}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={{size: 8, offset: 2}} lg={{size: 4, offset: 4}} xl={{size: 3, offset: 4}}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="Password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Password"
                                    onChange={this.handlePwChange}
                                    onKeyPress={this.handleKeyPress}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col xs={12} sm={12} md={{size: 8, offset: 2}} lg={{size: 1, offset: 4}} xl={{size: 3, offset: 4}}>
                        <Button onClick={ () => {
                            this.firebaseLogin();

                        }}>Login</Button>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}><b>Email or password are wrong!</b></ModalHeader>
                    <ModalBody>
                        If you have any issues please contact the administrator at autexis.ch
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
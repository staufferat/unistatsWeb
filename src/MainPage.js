import React, {Component} from 'react';
import Login from "./Login";
import firebaseConfig from "./config/firebase";
import * as firebase from "firebase";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          userLoggedIn: false,
        };

        this.firebaseLoginCheck = this.firebaseLoginCheck.bind(this);
        this.authenthicated = this.authenthicated.bind(this);
    };

    componentDidMount() {
        this.firebaseLoginCheck();
    }

    authenthicated(valid) {
        this.setState({userLoggedIn: valid});
    }

    firebaseLoginCheck() {
        let valid = false;
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                console.log("logged in");
                // this.setState({userLoggedIn : true});
                valid = true;

            } else {
                // User is signed out.
                console.log("logged out");
                valid = false;
                // this.setState({userLoggedIn : false});

            }
            this.authenthicated(valid);
            // console.log("valid: ", this);
        });
    }

    render() {
        return (
            <div>
                {this.state.userLoggedIn ?
                    <div>Hello</div>
                    :
                    <Login/>
                }

            </div>
        );
    }
}


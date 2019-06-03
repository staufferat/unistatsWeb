import firebaseConfig from 'firebase';

const config = {
    apiKey: "AIzaSyC3JPKIPi5fulTxvXF6-vLN4cjCEngL-CI",
    authDomain: "unistats-36a34.firebaseapp.com",
    databaseURL: "https://unistats-36a34.firebaseio.com",
    projectId: "unistats-36a34",
    storageBucket: "unistats-36a34.appspot.com",
    messagingSenderId: "969066833298",
};

firebaseConfig.initializeApp(config);

export default firebaseConfig;
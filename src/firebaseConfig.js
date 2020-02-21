/*
<script src="https://www.gstatic.com/firebasejs/5.9.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYW4t65vlewLUO0jag3z4Ho_Rn9qEDSC8",
    authDomain: "team8-c0692.firebaseapp.com",
    databaseURL: "https://team8-c0692.firebaseio.com",
    projectId: "team8-c0692",
    storageBucket: "team8-c0692.appspot.com",
    messagingSenderId: "854699085380"
  };
  firebase.initializeApp(config);
</script>
*/

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBYW4t65vlewLUO0jag3z4Ho_Rn9qEDSC8",
  authDomain: "team8-c0692.firebaseapp.com",
  databaseURL: "https://team8-c0692.firebaseio.com",
  projectId: "team8-c0692",
  storageBucket: "team8-c0692.appspot.com",
  messagingSenderId: "854699085380"
};

//firebase.initializeApp(config);

export default firebase.initializeApp(config)

//const databaseRef = firebase.database().ref();
//export const usersRef = databaseRef.child("users")

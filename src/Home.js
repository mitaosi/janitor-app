import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';

import English from './img/eng.png';
import Swedish from './img/sve.png';

//import firebaseConfig from './firebaseConfig';
//import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//const fb = firebase.initializeApp(firebaseConfig);

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      english: true,
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const rootRef = firebaseConfig.database().ref();
  }

  onLoginClick() {
    const usersRef = firebaseConfig.database().ref('users');

    if (this.janitorIdInput !== null) {
      let newState = ({
        currentUser: this.janitorIdInput.value
      });

      this.setState({ newState });
      usersRef.push(newState)
    }
  }


  handleChange(event) {
    this.setState({
      currentUser: this.janitorIdInput.value
    });
  }

  render() {
    return (
        <div>
          <Header english={this.state.english}/>

          <div className="language-selection" onClick={() => this.setState({english: !this.state.english})}>
            {this.state.english == true ? <img alt="" id="language-image" src={English}/> : <img alt="" id="language-image" src={Swedish}/>}
            {this.state.english == true ? <p>English</p> : <p>Svenska</p>}
          </div>

          <div className='section section-login'>
            <div className="login-wrapper">
              {this.state.english == true
                  ? <p id="form-label">Janitor ID:</p>
                  : <p id="form-label">Vaktmästar-ID:</p>
              }
              <form className="register-form">
                <input
                    className="form-input"
                    type="text"
                    placeholder="ID ####"
                    ref={(ref) => this.janitorIdInput = ref}
                    onChange={this.handleChange}
                />
              </form>
            </div>

            <button className="button login-button" onClick={() => this.onLoginClick()}>
              <Link to={{
                pathname: "/panel",
                state: {currentUser: this.state.currentUser, english: this.state.english}
              }}>
                {this.state.english == true
                    ? "Sign In"
                    : "Logga In"
                }
              </Link>
            </button>
          </div>

          <Footer english={this.state.english}/>
        </div>
    );
  }
}

export default Home;

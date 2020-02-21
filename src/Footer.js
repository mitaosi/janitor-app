import React, { Component } from 'react';
//import logo from './logo.svg';
import './footer.css';
import Img1 from './img/footer-img1.png';
import Img2 from './img/footer-img2.png';
import Img3 from './img/footer-img3.png';


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            english: this.props.english,
        };
    }

  render() {
    return (
      <footer>
          <div className="footer">
              <div className="items-wrapper">
                  <div className="footer-item">
                      <img alt="" id="img-1" src={Img1}/>
                      {this.props.english == true &&
                      <p>Get notified in real time about new tasks to carry out in specific spots of the park.</p>}
                      {this.props.english == false &&
                      <p>Bli notifierad i realtid om nya uppgifter att utföra i olika delar utav nöjesparken.</p>}
                  </div>
                  <div className="footer-item">
                      <img alt="" id="img-2" src={Img2}/>
                      {this.props.english == true &&
                      <p>Keep track of the work you accomplished in the "completed tasks" section.</p>}
                      {this.props.english == false &&
                      <p>Håll reda på det arbete du utfört under sektionen, "slutförda uppgifter".</p>}
                  </div>
                  <div className="footer-item">
                      <img alt="" id="img-3" src={Img3}/>
                      {this.props.english == true &&
                      <p>Watch out for the blinking emergencies that pop up in real time.</p>}
                      {this.props.english == false &&
                      <p>Se upp för de blinkande nödsituationerna som dyker upp i realtid.</p>}
                  </div>
              </div>
              <hr className="line dark"/>
              <h3 className="credits">2019© Janitor Management System - Team08</h3>
          </div>
      </footer>
    );
  }
}

export default Footer;

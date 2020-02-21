import React, { Component } from 'react';
import './taskItem.css';
import WalkingMan from './img/walking-man.png';
import Destination from './img/destination.png';
import Pin from './img/pin.png';
import PinRed from './img/pin-red.png';
import Write from './img/write.png';
import Arrow from './img/arrow.gif';
import firebaseConfig from './firebaseConfig';

const unfinTaskRef = firebaseConfig.database().ref('unfinishedTasks');
const finTaskRef = firebaseConfig.database().ref('finishedTasks');
var timeStarted;

class TaskItem extends Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      isLoading: false,
      hasGottenTimeToDest: false,
      hasBeenFinished: false,
      value: null,
      english: this.props.english,
      timerIsRunning: 1,
    };

    this.confirmHandler = this.confirmHandler.bind(this);
    this.finishHandler = this.finishHandler.bind(this);
    this.takeTaskHandler = this.takeTaskHandler.bind(this);
    this.mockDestTime = this.mockDestTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasGottenTimeToDest: nextProps.hasGottenTimeToDest,
      isLoading: nextProps.isLoading,
    });
    this.refresh();
    console.log("Component has received props");
    console.log(nextProps);
  }

  getCompletedTaskDate(e) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    switch(month) {
      case 1: month = "January";
        break;
      case 2: month = "February";
        break;
      case 3: month = "March";
        break;
      case 4: month = "April";
        break;
      case 5: month = "May";
        break;
      case 6: month = "June";
        break;
      case 7: month = "July";
        break;
      case 8: month = "August";
        break;
      case 9: month = "September";
        break;
      case 10: month = "October";
        break;
      case 11: month = "November";
        break;
      case 12: month = "December";
        break;
    }
    return month + " " + date;
  }

  getTime(e) {
    var hours = new Date().getHours();
    if (hours < 10) {
      hours = "0"+hours;
    }
    var min = new Date().getMinutes();
    if (min < 10) {
      min = "0"+min;
    }

    return hours+":"+min;
  }

  confirmHandler(e) {
    this.props.finishTask(this.props.index, this.props.taskKey, this.props.emergency);
    let finRef = finTaskRef.child(this.props.taskKey);
    var timeFinished = this.getTime();
    var dateCompleted = this.getCompletedTaskDate();
    finRef.update({'comment': this.state.value, 'timeStarted': timeStarted, 'timeFinished': timeFinished, 'dateCompleted': dateCompleted}).then().catch();
    console.log("Clicked 'Confirm' on "+dateCompleted+" at "+timeFinished+".");
  }

  finishHandler(e) {
    this.setState({
      hasBeenFinished: true
    });
    console.log("Clicked finish task.");
    document.getElementById("display-destination").style.display = 'none';
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    //console.log(this.state.value);
  }

  takeTaskHandler(e) {
    this.setState({
      isLoading: true,
      english: this.props.english,
    });

    timeStarted = this.getTime();

    let unfinRef = unfinTaskRef.child(this.props.taskKey);
    unfinRef.update({'timeStarted': timeStarted}).then().catch();

    console.log("Clicked 'Take this task' at "+ timeStarted +".");
  }

  mockDestTime(e) {
    this.props.mockDestTime(this.props.index, this.props.emergency);
  }


  refresh = res => this.setState({ english: this.props.english });

  render() {
    return (
        <div className="task-item">
          <div className="initial-task-item">
            <div className="task-description">
              <p className="task-title">{this.props.taskName}</p>
              <div className="pin-wrapper">
                <img alt="" className="pin-red" src={PinRed} />
                <img alt="" className="pin" src={Pin} />
              </div>
              <p className="task-location">{this.props.destination}</p>
            </div>

            <button
                onClick={this.state.hasBeenFinished ?
                    this.confirmHandler : (this.state.hasGottenTimeToDest == false || this.state.hasGottenTimeToDest == undefined ? this.takeTaskHandler : this.finishHandler)}
                className="button task-button"
                variant="primary"
                disabled={this.state.isLoading}
            >
              {this.state.isLoading == true &&
              <button
                  onClick={this.mockDestTime}
                  variant="primary"
              >
                ✓
              </button>
              }
              {this.state.english == true && (this.state.hasBeenFinished ? 'Confirm' : (this.state.hasGottenTimeToDest ? 'Finish this task' : (this.state.isLoading ? 'loading...' : 'Take this task')))}
              {this.state.english == false && (this.state.hasBeenFinished ? 'Godkänn' : (this.state.hasGottenTimeToDest ? 'Avsluta uppgiften' : (this.state.isLoading ? 'laddar...' : 'Ta den här uppgiften')))}
            </button>
          </div>

          {this.state.hasGottenTimeToDest == true &&
          <div id="display-destination">
            <img alt="" id="walking-man" src={WalkingMan} />
            <div alt="" id="destination-text">
              <span>{this.props.timeToDest} min</span>
              <img alt="" id="arrow" src={Arrow} />
            </div>
            <img alt="" id="destination" src={Destination} />
          </div>
          }

          {this.state.english == true && this.state.hasBeenFinished == true &&
          <div className="leave-comment">
            <img alt="" className="write" src={Write} />
            <p>LEAVE A NOTE</p>
            <textarea
                type='text'
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Leave a note about the work you carried out"
            />
          </div>}

          {this.state.english == false && this.state.hasBeenFinished == true &&
          <div className="leave-comment">
            <img alt="" className="write" src={Write} />
            <p>LÄMNA EN ANTECKNING</p>
            <textarea
                type='text'
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Lämna en anteckning kring arbetet du utfört"
            />
          </div>}
        </div>
    );
  }
}

export default TaskItem;

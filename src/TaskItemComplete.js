import React, { Component } from 'react';
import './taskItem.css';
import Pin from "./img/pin.png";
import Note from "./img/note.png";

class TaskItemComplete extends Component {

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

    render() {
        return (
            <div className="task-item-complete">
                <div className="task-item-details">
                    <div className="task-description-complete">
                        <p className="task-title">{this.props.taskName}</p>
                        <img alt="" className="pin-complete" src={Pin} />
                        <p className="task-location-complete">{this.props.destination}</p>
                    </div>

                    <div className="task-date">
                        {this.props.english == true &&
                        <p className="label">COMPLETED ON</p>}
                        {this.props.english == false &&
                        <p className="label">SLUTFÖRD PÅ</p>}
                        <span className="value">{this.props.dateCompleted}</span>
                    </div>
                    <div className="task-start">
                        {this.props.english == true &&
                        <p className="label">STARTED AT</p>}
                        {this.props.english == false &&
                        <p className="label">STARTADE AT</p>}
                        <span className="value">{this.props.timeStarted}</span>
                    </div>
                    <div className="task-finish">
                        {this.props.english == true &&
                        <p className="label">FINISHED AT</p>}
                        {this.props.english == false &&
                        <p className="label">FÄRDIGA AT</p>}
                        <span className="value">{this.props.timeFinished}</span>
                    </div>

                </div>
                <div className="task-note">
                    <hr className="line"/>
                    <div className="note">
                        <img alt="" id="note-icon" src={Note} />
                        <p className="note-content">{this.props.comment}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskItemComplete;

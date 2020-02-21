import React, { Component } from 'react';
import './emergency.css';
import TaskItem from "./TaskItem";

class Emergency extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            hasGottenTimeToDest: false,
            comment: this.props.comment,
            dateCompleted: this.props.dateCompleted,
            timeStarted: this.props.timeStarted,
            timeFinished: this.props.timeFinished,
        };
    }

    render() {
        return (
            <div className="emergency blink">
                <p className="emergency-label">EMERGENCY</p>

                <TaskItem
                    taskName="Clean Ride #21"
                    assignedUser="User"
                    destination="Rollercoaster"
                    timeToDest="10"
                    english={this.props.english}
                    emergency={true}
                    taskKey={this.props.taskKey}
                    index={this.props.index}
                    mockDestTime={this.props.mockDestTime}
                    finishTask={this.props.finishTask}
                    hasGottenTimeToDest={this.props.hasGottenTimeToDest}
                />
            </div>

        );
    }
}

export default Emergency;

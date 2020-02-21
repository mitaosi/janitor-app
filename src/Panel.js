import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Emergency from './Emergency.js';
import TaskItem from './TaskItem.js';
import TaskItemComplete from './TaskItemComplete.js';
import './App.css';
import './Panel.css';
import firebaseConfig from './firebaseConfig';
import * as firebase from 'firebase/app';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import English from './img/eng.png';
import Swedish from './img/sve.png';
import Refresh from './img/refresh.png';
import RefreshHover from './img/refresh-hover.png';
import Emerg from './img/emerg.png';
import EmergHover from './img/emerg-hover.png';


const unfinTaskRef = firebaseConfig.database().ref('unfinishedTasks');
const finTaskRef = firebase.database().ref('finishedTasks');


class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emergencies: [],
            unfinishedTasks: [],
            finishedTasks: [],
            currentUser: null,
            error: false,
            english: null,
            /*comment: 'default',
            dateCompleted: '***',
            timeStarted: '--:--',
            timeFinished: '--:--',*/
            timerIsRunning: 0,
        }

        this.mockReceivedTask = this.mockReceivedTask.bind(this);
        this.finishTask = this.finishTask.bind(this);
    }

    onChangeTimerIsRunning(newValue) {
        this.setState({
            timerIsRunning: newValue
        });
    }

    /*
    getFinishedtasks () {
        finTaskRef.on('value', snapshot => {
            this.setState({
                finishedTasks: snapshot.val() });
            });
        console.log('User finishedtask log retrieved');
    }

    componentDidMount() {
        this.getFinishedtasks();
    }
    */

    componentWillMount() {
        this.setState({
            currentUser : this.props.location.state.currentUser,
            english : this.props.location.state.english
        });
    }

    fakeTime(e) {
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

    mockEmergency(currentUser) {
        let taskRef = unfinTaskRef.push();
        let taskKey = taskRef.key;
        let tempTask = {
            task: "Clean Ride #21",
            assignedUser: currentUser,
            destination: "Rollercoaster",
            timeToDestination: null,
            locked: false,
            hasGottenTimeToDest: false,
            taskKey: taskKey,
            comment: 'comment',
            dateCompleted: 'May 28',
            timeStarted: this.fakeTime(),
            timeFinished: this.fakeTime(),
        };
        this.setState({ emergencies: [...this.state.emergencies, tempTask] },
            () => taskRef.update(tempTask));
        console.log(this.state.emergencies);
    }


    mockReceivedTask(currentUser) {
        let taskRef = unfinTaskRef.push();
        let taskKey = taskRef.key;
        let tempTask = {
            task: "Clean park",
            assignedUser: currentUser,
            destination: "Park",
            timeToDestination: null,
            locked: false,
            hasGottenTimeToDest: false,
            taskKey: taskKey,
            comment: 'empty_comment',
            dateCompleted: '***',
            timeStarted: '--:--',
            timeFinished: '--:--',
        };
        this.setState({ unfinishedTasks: [...this.state.unfinishedTasks, tempTask] },
            () => taskRef.update(tempTask));
    }

    mockDestTime(id, emergency) {
      if (emergency) {
        let taskWithDestTime = this.state.emergencies.filter((_, i) => i == id).map((task) => {
            let tempTask = task;
            tempTask.timeToDestination = Math.floor(Math.random() * 10) + 1;
            tempTask.locked = true;
            tempTask.hasGottenTimeToDest = true;
            tempTask.isLoading = false;
        });
        this.setState({
            taskWithDestTime
        });
      } else {
        let taskWithDestTime = this.state.unfinishedTasks.filter((_, i) => i == id).map((task) => {
            let tempTask = task;
            tempTask.timeToDestination = Math.floor(Math.random() * 10) + 1;
            tempTask.locked = true;
            tempTask.hasGottenTimeToDest = true;
            tempTask.isLoading = false;
        });
        this.setState({
            taskWithDestTime
        });
      }
      console.log("Has gotten time-to-destination.");
    }

    async receivedTasksAPI(currentUser) {
        let taskRef = unfinTaskRef.push();
        let taskKey = taskRef.key;
        await fetch('https://api.myjson.com/bins/1h9744')
        //fetch('http://api.myjson.com/bins/kqoos')
            .then(response => response.json())
            .then(function(json) {
                json.taskKey = taskKey;
                return json;
            })
            .then(resTaskWithKey =>
                {this.setState({
                    unfinishedTasks: [...this.state.unfinishedTasks, resTaskWithKey],
                }, () => taskRef.update(resTaskWithKey));
                }
            ).catch((err) => this.setState({ error: true }))
        console.log(this.state.unfinishedTasks);
    }

    async finishTask(id, key, emergency) {
      if (emergency) {
        let unfinRef = unfinTaskRef.child(key);
        let finRef = finTaskRef.child(key);
        let task = this.state.emergencies[id];
        let unfinishedTasks = this.state.emergencies;
        await this.setState({
            finishedTasks: [...this.state.finishedTasks, task],
            emergencies: this.state.emergencies.filter((_, i) => i !== id)
        });
        finRef.update(task);
        unfinRef.remove();

        finRef.on('value', (snapshot) => {
            let fintasks = snapshot.val();
            this.setState({
                comment: fintasks.comment,
                dateCompleted: fintasks.dateCompleted,
                timeStarted: fintasks.timeStarted,
                timeFinished: fintasks.timeFinished,
            })
        });
        console.log("FINISHED TASK");
        console.log(this.state.finishedTasks);
      } else {
        let unfinRef = unfinTaskRef.child(key);
        let finRef = finTaskRef.child(key);
        let task = this.state.unfinishedTasks[id];
        let unfinishedTasks = this.state.unfinishedTasks;
        await this.setState({
            finishedTasks: [...this.state.finishedTasks, task],
            unfinishedTasks: this.state.unfinishedTasks.filter((_, i) => i !== id)
        });
        finRef.update(task);
        unfinRef.remove();

        finRef.on('value', (snapshot) => {
            let fintasks = snapshot.val();
            this.setState({
                comment: fintasks.comment,
                dateCompleted: fintasks.dateCompleted,
                timeStarted: fintasks.timeStarted,
                timeFinished: fintasks.timeFinished,
            })
        });
        console.log("FINISHED TASK");
        console.log(this.state.finishedTasks);
      }
    }

    renderEmergencies() {
        return (
            <div className="emergencies-container">
                {this.state.emergencies.map((task, index) => {
                    return <Emergency
                        taskName={task.task}
                        assignedUser={this.state.currentUser}
                        destination={task.destination}
                        timeToDest={task.timeToDestination}
                        locked={task.locked}
                        index={index}
                        finishTask={this.finishTask.bind(this)}
                        mockDestTime={this.mockDestTime.bind(this)}
                        taskKey={task.taskKey}
                        hasGottenTimeToDest={task.hasGottenTimeToDest}
                        note={task.note}
                        english={this.state.english}
                        timerIsRunning={this.onChangeTimerIsRunning.bind(this)}
                    />
                })}
            </div>
        );
    }

    renderUnfinishedTasks() {
        return (
            <div className="new-tasks-container">
                {this.state.unfinishedTasks.map((task, index) => {
                    return <TaskItem
                        taskName={task.task}
                        assignedUser={this.state.currentUser}
                        destination={task.destination}
                        timeToDest={task.timeToDestination}
                        locked={task.locked}
                        index={index}
                        finishTask={this.finishTask.bind(this)}
                        mockDestTime={this.mockDestTime.bind(this)}
                        taskKey={task.taskKey}
                        hasGottenTimeToDest={task.hasGottenTimeToDest}
                        note={task.note}
                        english={this.state.english}
                        timerIsRunning={this.onChangeTimerIsRunning.bind(this)}
                    />
                })}
            </div>
        );
    }

    renderFinishedTasks() {
        return (
            <div>
                {this.state.finishedTasks.map(task => {
                    return <TaskItemComplete
                        taskName={task.task}
                        assignedUser={this.state.currentUser}
                        destination={task.destination}
                        timeToDest={task.timeToDestination}
                        english={this.state.english}
                        comment={this.state.comment}
                        dateCompleted={this.state.dateCompleted}
                        timeStarted={this.state.timeStarted}
                        timeFinished={this.state.timeFinished}
                    />
                })}
            </div>
        );
    }

    render() {

        return (
            <div>
                <Header currentUser={this.state.currentUser} timerIsRunning={this.state.timerIsRunning} english={this.state.english}/>

                <div className="language-selection" onClick={() => this.setState({english: !this.state.english})}>
                    {this.state.english == true ? <img alt="" id="language-image" src={English}/> : <img alt="" id="language-image" src={Swedish}/>}
                    {this.state.english == true ? <p>English</p> : <p>Svenska</p>}
                </div>

                <div className='section section-logged'>
                    <div className='section-container'>
                        <div>
                            <div className="title-wrapper">
                                <div className="tasks-title" id="new-tasks-title" onClick={() => this.receivedTasksAPI(this.state.currentUser)}>
                                    {this.state.english ? <h1>NEW TASKS</h1> : <h1>NYA UPPGIFTER</h1>}
                                    <img alt="" id="refresh" className='refresh-image' src={Refresh}/>
                                    <img alt="" id="refresh-hover" className='refresh-image' src={RefreshHover}/>
                                </div>
                                <div id="emergency-button" onClick={() => this.mockEmergency(this.state.currentUser)}>
                                    <img alt="" id="get-emergency" className='refresh-image' src={Emerg}/>
                                    <img alt="" id="get-emergency-hover" className='refresh-image' src={EmergHover}/>
                                </div>
                            </div>

                            <div id="new-items">
                                {this.state.emergencies.length !== 0 &&
                                this.renderEmergencies()
                                }

                                {this.state.unfinishedTasks.length !== 0 &&
                                this.renderUnfinishedTasks()
                                }

                                {this.state.english == true && (this.state.emergencies == undefined || this.state.emergencies == null || this.state.emergencies.length == 0) && (this.state.unfinishedTasks == undefined || this.state.unfinishedTasks == null || this.state.unfinishedTasks.length == 0) &&
                                <p className='no-tasks'>Great, no new task to do! 😎</p>}

                                {this.state.english == false && ((this.state.emergencies == undefined && this.state.unfinishedTasks == undefined) || (this.state.emergencies == null && this.state.unfinishedTasks == null) || (this.state.unfinishedTasks.length == 0 && this.state.unfinishedTasks.length == 0)) &&
                                <p className='no-tasks'>Grymt, inga nya uppgifter att göra! 😎</p>}
                            </div>



                            <div className="tasks-title">
                                {this.state.english ? <h1 id="completed-title">COMPLETED TASKS</h1> : <h1 id="completed-title">SLUTFÖRDA UPPGIFTER</h1>}
                            </div>

                            <div id="completed-items">
                                {this.state.english == true && (this.state.finishedTasks == undefined || this.state.finishedTasks == null || this.state.finishedTasks.length == 0) &&
                                <p className='no-tasks'>none</p>}

                                {this.state.english == false && (this.state.finishedTasks == undefined || this.state.finishedTasks == null || this.state.finishedTasks.length == 0) &&
                                <p className='no-tasks'>inga</p>}

                                {this.state.finishedTasks.length !== 0 &&
                                this.renderFinishedTasks()
                                }
                            </div>

                        </div>

                    </div>
                </div>

                <Footer english={this.state.english}/>
            </div>
        );
    }
}

export default Panel;

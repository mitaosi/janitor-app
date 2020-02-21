import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Logo from './img/logo.png';
import English from './img/eng.png';
import Svenska from './img/sve.png';
import User from './img/user.png';
import Work from './img/sweep.png';
import {Link} from "react-router-dom";
import Bg1 from "./img/bg1.jpg";
import Bg2 from "./img/bg2.jpg";
import Bg3 from "./img/bg3.jpg";
import Esc from "./img/esc.png";
import format from "./formatTime";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            english: null,
            time: 0,
            isRunning: false,
        }

    }

    componentWillMount() {
        this.setState({
            currentUser : this.props.currentUser,
            //english : this.props.english
        });
    }

    refresh = res => this.setState({ english: this.props.english })

    componentWillReceiveProps(props) {
        //this.refresh();
    }

    componentDidMount() {
        this.setState({
            isRunning: true,
        });
        this.handleTimer();
    }

    showAllItems() {
        document.getElementById("new-tasks-title").classList.remove("hidden");
        document.getElementById("emergency-button").classList.remove("hidden");
        document.getElementById("new-items").classList.remove("hidden");
        document.getElementById("completed-title").classList.remove("hidden");
        document.getElementById("completed-items").classList.remove("hidden");
    }

    showNewItems() {
        document.getElementById("new-tasks-title").classList.remove("hidden");
        document.getElementById("emergency-button").classList.remove("hidden");
        document.getElementById("new-items").classList.remove("hidden");
        document.getElementById("completed-title").classList.add("hidden");
        document.getElementById("completed-items").classList.add("hidden");
    }

    showCompletedItems() {
        document.getElementById("new-tasks-title").classList.add("hidden");
        document.getElementById("emergency-button").classList.add("hidden");
        document.getElementById("new-items").classList.add("hidden");
        document.getElementById("completed-title").classList.remove("hidden");
        document.getElementById("completed-items").classList.remove("hidden");
    }

    handleTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(() => {
                this.setState({time: ++this.state.time})
                console.log("timer running");
            }, 10)
        }
        this.setState({isRunning: !this.state.isRunning})
    }

    renderNavOptions() {
        if (this.state.currentUser !== null && this.state.currentUser !== undefined) {
            return (
                <div className="nav-options">
                    {/*this.state.english == true ? <span className="nav-opt">Dashboard</span> : <span className="nav-opt">Hem</span>*/}
                    {/*this.state.english == true ? <span className="nav-opt">Tasks</span> : <span className="nav-opt">Uppgifter</span>*/}

                    {this.props.english == true &&
                    <span className="nav-opt" onClick={this.showAllItems.bind(this)}>Dashboard</span>}
                    {this.props.english == false &&
                    <span className="nav-opt" onClick={this.showAllItems.bind(this)}>Hem</span>}

                    <div className="user-details tasks-menu">
                        <div>
                            {this.props.english == true &&
                            <span className="nav-opt">Tasks</span>}
                            {this.props.english == false &&
                            <span className="nav-opt nav-opt-sve">Uppgifter</span>}
                        </div>
                        <div id="tasks-categories">
                            {this.props.english == true &&
                            <span className="tasks-opt" onClick={this.showNewItems.bind(this)}>&nbsp;&nbsp;&nbsp;New</span>}
                            {this.props.english == false &&
                            <span className="tasks-opt" onClick={this.showNewItems.bind(this)}>&nbsp;&nbsp;&nbsp;Nya</span>}

                            {this.props.english == true &&
                            <span className="tasks-opt" onClick={this.showCompletedItems.bind(this)}>&nbsp;&nbsp;&nbsp;Completed</span>}
                            {this.props.english == false &&
                            <span className="tasks-opt" onClick={this.showCompletedItems.bind(this)}>&nbsp;&nbsp;&nbsp;Färdiga</span>}
                        </div>
                    </div>


                    <div className="user-details">
                        <div>
                            <img alt="" id="user-icon" src={User}/>
                            <span className="nav-button">{this.state.currentUser}</span>
                            <img alt="" id="work-icon" src={Work}/>
                            <span className="display-time" onClick={this.handleTimer}>{format(this.state.time)}</span>
                        </div>
                        <div id="sign-out">
                            <Link to={{pathname: "/"}}>
                                {this.props.english == true &&
                                'Sign Out'}
                                {this.props.english == false &&
                                'Logga Ut'}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Link className="nav-button nav-sign-in" to={{pathname: "/"}}>
                    {this.props.english == true &&
                    'Sign In'}
                    {this.props.english == false &&
                    'Logga In'}
                </Link>
            );
        }
    }

    handleLanguageWindow() {
        var y = document.getElementById("language-window");
        if (y.style.display === "flex") {
            y.style.display = "none";
        } else if (y.style.display === "none"){
            y.style.display = "flex";
        }
    }

    render() {
        return (
            <header>
                <div className='slider'>
                    <img alt="" className='slide1' src={Bg1}/>
                    <img alt="" className='slide2' src={Bg2}/>
                    <img alt="" className='slide3' src={Bg3}/>
                </div>

                {/* LANGUAGE WINDOW WON'T SHOW AS IT HAS DISPLAY:NONE -> handleLanguageWindow to fix */}
                <div id="language-window">
                    <div className="language-box">
                        <h3 className="choose-language-title">Choose your language</h3>
                        <img alt="" className="esc-button" src={Esc} onClick={this.handleLanguageWindow}/>
                        <div className="language-selection">
                            <img alt="" className="choice-language-image" src={English}/>
                            <p>English</p>
                        </div>

                        <div className="language-selection">
                            <img alt="" className="choice-language-image" src={Svenska}/>
                            <p>Svenska</p>
                        </div>
                    </div>
                </div>



                <div className="header">
                    <div className="header-logo">
                        <img alt="" id="logo" src={Logo}/>
                        <div className='header-title'>
                            <h1>Janitor</h1>
                            <h2>MANAGEMENT SYSTEM</h2>
                        </div>
                    </div>
                    <nav>
                        {/*
                <div className="language-selection">
                    <button
                      onClick={() => console.log("HEJ")}
                    >
                      <img id="language-image" src={English}/>
                      <p>English</p>
                    </button>
                </div>
                */}
                        {this.renderNavOptions()}
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;

import React from 'react';

class Button extends React.Component {

    /* getDefaultProps() {
     return {
     onClick: null,
     text: '',
     className: ''
     }
     }*/

    static defaultProps = {
        onClick: null,
        className: '',
        text: 'DEFAULT'
    };


    render() {
        return <button className={`Button ${this.props.className}`} onClick={this.props.onClick}>
            {this.props.text}
        </button>
    }
}

export default Button;
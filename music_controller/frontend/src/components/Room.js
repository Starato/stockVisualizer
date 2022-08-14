import React, { Component } from 'react';

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes_to_skip: 2,
            guest_can_pause: false,
            isHost: false,
        };
    }

    render() {
        return (
            <div>
                {/* <h3>{this.roomCode}</h3> */}
                <p>Votes: {this.state.votes_to_skip}</p>
                <p>Guest Can Pause: {this.state.guest_can_pause}</p>
                <p>Host: {this.state.isHost}</p>
            </div>
        );
    }
}
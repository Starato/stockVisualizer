import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Body from './Body';
import Room from "./Room";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
          <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={ <Body /> } />
                    <Route path='/join' element={ <RoomJoinPage /> } />
                    <Route path='/create' element={ <CreateRoomPage /> } />
                    <Route path='/room/:roomCode' element={ <Room />} ></Route>
                </Routes>
            </Router>
          </div>
        );
    }
}

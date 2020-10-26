import React, { useState } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useStateValue } from './StateProvider'
import { roomID } from "./firebase"
function App() {
  const [{ user }] = useStateValue()
  
  return (
    <div className="App">
        {!user ? (
          <Login />
        ):(
          <div className="app_body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomID">
                  <Chat />
                </Route>
                <Route path="/">{/*<Chat />*/}</Route>
              </Switch>
            </Router>
          </div>
        )}

    </div>
  );
}

export default App;

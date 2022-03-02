import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Home from "./Home";
import Dashboard from './Dashboard';
import Projecttable from './Projecttable';
import Account from './Dcomponents/Account';
import Project from './Dcomponents/Project';
import LeadEdit from './Dcomponents/AccountEdit/LeadEdit';
import ProjectdetailsEdit from './Dcomponents/PcomponentsEdit/ProjectdetailsEdit';
import MoodBoard from './Moodboard/MoodBoard';
import Folder from './Moodboard/Folder';

import { AuthProvider } from "./Auth";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/accountEdit" component={LeadEdit} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/projects" component={Projecttable} />
          <Route exact path="/projectEdit" component={ProjectdetailsEdit} />
          <Route exact path="/moodboard" component={MoodBoard} />
          <Route exact path="/folder" component={Folder} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

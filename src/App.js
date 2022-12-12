import { Switch, Route } from 'react-router';

import './App.css';

import Homepage from './pages/Homepage';
import CreateExercise from './pages/CreateExercise';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/home">
          <Homepage />
        </Route>
        <Route path="/create-exercise">
          <CreateExercise />
        </Route>
        <Route path="/exercise/:id/edit">
          <CreateExercise />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

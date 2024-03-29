import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter,
} from "react-router-dom";
import { Home } from './components/Home/Home';
import { PositionList } from './components/PositionList/PositionList';
import {Navigation} from "./components/Navigation/Navigation";
import {PersonList} from "./components/PersonList/PersonList";
import {AddPerson} from "./components/AddPerson/AddPerson";
import {UpdatePerson} from "./components/UpdatePerson/UpdatePerson";
import { SuccessComponent } from './components/SuccesComponent/SuccesComponent';
import {ErrorComponent} from "./components/ErrorComponent/ErrorComponent";


function App() {
  return (
      <HashRouter basename="/HRPlatformFrontEnd">
          <Navigation/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/personList' element={<PersonList/>}/>
              <Route path='/personList/chosenPerson/:personID' element={<UpdatePerson/>}/>
              <Route path='/addPerson' element={<AddPerson/>}/>
              <Route path='/position-list' element={<PositionList/>}/>
              <Route path='/success/:personID' element={<SuccessComponent/>}/>
              <Route path='/error' element={<ErrorComponent/>}/>
          </Routes>
      </HashRouter>
  );
}

export default App;

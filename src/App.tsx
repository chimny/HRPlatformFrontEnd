import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Home } from './components/Home/Home';


import { PositionList } from './components/Position/PositionList';
import { SalaryData } from './components/Salary/SalaryData';
import {Navigation} from "./components/Navigation/Navigation";
import {PersonList} from "./components/PersonList/PersonList";

import {Formik} from "./components/Formik/Formik";
import {AddPerson} from "./components/AddPerson/AddPerson";
import {UpdatePerson} from "./components/UpdatePerson/UpdatePerson";
import { SuccessComponent } from './components/SuccesComponent/SuccesComponent';






function App() {


  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/personList' element={<PersonList/>}/>
              <Route path='/personList/chosenPerson/:personID' element={<UpdatePerson/>}/>
              <Route path='/addPerson' element={<AddPerson/>}/>
              <Route path='/position-list' element={<PositionList/>}/>
              <Route path='/salary-data' element={<SalaryData/>}/>
              <Route path='/success/:personID' element={<SuccessComponent/>}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;

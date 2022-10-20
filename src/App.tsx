import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Home } from './components/Home/Home';


import { PositionList } from './components/Position/PositionList';
import { SalaryData } from './components/Salary/SalaryData';
import {AddNewPersonForm} from "./components/Form/AddNewPersonForm";
import {Navigation} from "./components/Navigation/Navigation";
import {PersonList} from "./components/PersonList/PersonList";
import {UpdatePersonForm} from "./components/Form/UpdatePersonForm";





function App() {


  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
              {/*@todo test route below*/}
              <Route path='/' element={<Home/>}/>
              <Route path='/personList' element={<PersonList/>}/>
              <Route path='/personList/chosenPerson/:personID' element={<UpdatePersonForm/>}/>
              <Route path='/addPerson' element={<AddNewPersonForm/>}/>
              <Route path='/position-list' element={<PositionList/>}/>
              <Route path='/salary-data' element={<SalaryData/>}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;

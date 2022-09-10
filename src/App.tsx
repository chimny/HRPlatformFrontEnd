import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Home } from './components/Home/Home';

import {PersonList} from "./components/PersonList/PersonList";
import { PositionList } from './components/Position/PositionList';
import { SalaryData } from './components/Salary/SalaryData';
import {AddPerson} from "./components/AddPerson/AddPerson";
import {Navigation} from "./components/Navigation/Navigation";
import BasicTable from "./components/PersonList/TablePersonList";



function App() {


  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
              {/*@todo test route below*/}
              <Route path='/' element={<BasicTable/>}/>
              <Route path='/persons' element={<PersonList/>}/>
              <Route path='/persons/addPerson' element={<AddPerson/>}/>
              <Route path='/position-list' element={<PositionList/>}/>
              <Route path='/salary-data' element={<SalaryData/>}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;

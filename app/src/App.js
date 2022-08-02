import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import ShowElement from './component/ShowElements/showElement';
import Navbar from './component/Navbar/navbar';
//import { useState } from 'react';

function App() {
 // const [mod,setMod]=useState(<ShowElement type="pod" />)
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/pod" element={<ShowElement type="pod"/>}></Route>
          <Route path="/comunity" element={<ShowElement type="comunity"/>}></Route>
          <Route path="/plant" element={<ShowElement type="plant"/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


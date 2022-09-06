import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import ShowElement from './component/ShowElements/showElement';
import Navbar from './component/Navbar/navbar';
import Login from './component/Login/login';
import AuthRequired from './component/authRequired';
import Register from './component/Register/Register';
import PersistantLogin from './component/Login/persistantLogin/persistantLogin';
import Error from './component/Error/Error';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      
        <Navbar />

      <Routes>
      <Route path="login" element={<Login />} />        
      <Route path="/" element={<Navigate to="/comunity" />} />
      
      <Route element={<PersistantLogin/>}>
        <Route element={<AuthRequired />}>
            <Route path="/pod" element={<ShowElement type="pod"/>}/>
        </Route>
        <Route element={<AuthRequired/>}>
          <Route path="/comunity" element={<ShowElement type="comunity"/>}></Route>
        </Route>
        <Route element={<AuthRequired  />}>
          <Route path="/plant" element={<ShowElement type="plant"/>}></Route>
        </Route>
        <Route element={<AuthRequired  />}>
          <Route path="/user" element={<ShowElement type="userConsumption"/>}></Route>
        </Route>
        <Route element={<AuthRequired  />}>
        <Route path="/register" element={<Register/>}/>
        </Route>
        </Route>
        <Route path="/404" element={<Error/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


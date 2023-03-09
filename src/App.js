
import './App.css';
import Scanner from "./components/Scanner";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <Routes>
      <Route path='/' element= {<Form />} />
      <Route path='/Scanner' element= {<Scanner />} />
    </Routes>
  );
}


export default App;

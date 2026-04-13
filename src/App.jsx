import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import Api from "./component/Api";
// import AddSong from "./component/AddSong";
import Home from "./component/Home";
import Run from "./component/Run";
import Form from "./component/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditForm from "./component/EditForm";


function App() {


  return (
    <div>


      
     <BrowserRouter>
     
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/view" element={<Run/>}/>
      <Route path="/add" element={<Form/>}/>
      <Route path="/edit/:id" element={<EditForm/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}


export default App;
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Api from "./component/Api";
import AddSong from "./component/AddSong";
import Home from "./component/Home";


function App() {


  return (
    <div>
     <BrowserRouter>
     
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddSong/>}/>
      <Route path="/api" element={<Api/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}


export default App;
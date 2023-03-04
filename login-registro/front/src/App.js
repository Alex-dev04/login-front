import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
function App() {
  return (
<BrowserRouter>
<div>
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/welcome/:id" element={<Welcome />} />
  </Routes>
</div>
</BrowserRouter>
  );
}

export default App;

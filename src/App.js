import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Admin from "./Admin";
import Login from "./Login";
import Mock from "./Mock";
import Header from "./Header";
import Profile from "./Profile";
import CreateUser from "./CreateUser";
import BulletinBoard from "./BulletinBoard";
import './App.css';

function App() {
  return (
    <Router>
      <GlobalStyle/>
      <Header></Header>
        <Routes>
          <Route path="/" exact element={<Login/> } />
          <Route path="/admin" exact element={<Admin/> } />
          <Route path="/bulletinboard" exact element={<BulletinBoard/> } />
          <Route path="/createuser" exact element={<CreateUser/> } />
          <Route path="/profile" exact element={<Profile/> } />
          <Route path="/mock" exact element={<Mock/> } />
          <Route path="/signin" exact element={<Login/> } />
        </Routes>
    </Router>
  );
}

export default App;

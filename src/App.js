import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage";
// import Home from "./components/Login/Home";


const App = () => {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route element={<BoardPage/>} path="/kanban"/>
          <Route element={<LoginPage />} path="/login"/>
          <Route element={<SignUpPage />} path="/signup"/>
        </Routes>
      </Router>
  );
}

export default App;

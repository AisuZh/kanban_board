import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage";
import { AuthContextProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./utils/PrivateRoutes";
import { useEffect } from "react";
import Pages from "./pages/Pages";


const App = () => {

  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/kanban'
            element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            }
          />
          <Route element={<Pages />} path='/' />
          <Route element={<LoginPage />} path="/login" />
          <Route index element={<SignUpPage />} path="/signup" />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;





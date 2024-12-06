import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from './home';
import SignIn from './auth/SignIn';
import SignUp from './auth/signup';
import ErrorPage from './components/errorPage';
import './styles/App.css';
function ProtectedRoute({ children }) {
  const [cookies] = useCookies(['access_token']);
  return cookies.access_token ? children : <Navigate to="/signin" />;
}
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;

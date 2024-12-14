import { Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from './home';
import SignIn from './auth/SignIn';
import SignUp from './auth/signup';
import ErrorPage from './components/errorPage';
import RequestResetPassword from './auth/rq_resetPass';
import './styles/App.css';
import ResetPassword from './auth/resetPassword';
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
          <Route path="/requestRessetPassword" element={<RequestResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;

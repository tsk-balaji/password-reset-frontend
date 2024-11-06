import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import PasswordReset from "./Components/PasswordReset";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route index element={<ForgotPassword />} />

        {/* Other routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;

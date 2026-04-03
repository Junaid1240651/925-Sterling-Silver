import { Routes, Route } from "react-router-dom";
import { ComingSoonProvider } from "./context/ComingSoonContext";
import { ComingSoonModal } from "./components/ComingSoonModal";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { OauthSuccessPage } from "./pages/OauthSuccessPage";

function App() {
  return (
    <ComingSoonProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/oauth-success" element={<OauthSuccessPage />} />
      </Routes>
      <ComingSoonModal />
    </ComingSoonProvider>
  );
}

export default App;

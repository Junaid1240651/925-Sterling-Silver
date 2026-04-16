import { Routes, Route, Navigate } from "react-router-dom";
import { ComingSoonProvider } from "./context/ComingSoonContext";
import { ComingSoonModal } from "./components/ComingSoonModal";
import { RequireAuth } from "./components/account/RequireAuth";
import { AccountLayout } from "./components/account/AccountLayout";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { OauthSuccessPage } from "./pages/OauthSuccessPage";
import { AccountProfilePage } from "./pages/account/AccountProfilePage";
import { AccountAddressesPage } from "./pages/account/AccountAddressesPage";
import { AccountOrdersPage } from "./pages/account/AccountOrdersPage";
import { AccountSavedUpiPage } from "./pages/account/AccountSavedUpiPage";
import { AccountSavedCardsPage } from "./pages/account/AccountSavedCardsPage";

function App() {
  return (
    <ComingSoonProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/oauth-success" element={<OauthSuccessPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="/account/profile" replace />} />
            <Route path="profile" element={<AccountProfilePage />} />
            <Route path="addresses" element={<AccountAddressesPage />} />
            <Route path="orders" element={<AccountOrdersPage />} />
            <Route path="payments/upi" element={<AccountSavedUpiPage />} />
            <Route path="payments/cards" element={<AccountSavedCardsPage />} />
          </Route>
        </Route>
      </Routes>
      <ComingSoonModal />
    </ComingSoonProvider>
  );
}

export default App;

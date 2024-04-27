import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./App/store.jsx";
import "./Styles/main.scss";
import "./Translations/i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="60067625005-vivtmovljdrmtlr150bnd3hb57l76gl1.apps.googleusercontent.com">
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);

// servicerWorker.register();

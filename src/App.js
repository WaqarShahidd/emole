import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./App.css";
import { UserProvider } from "./constants/context";
import Router from "./routes/Router";

const initialOptions = {
  clientId:
    "Ab2SVQO4EsAalbGFnZPx1Q_f51KlgpV4xaOUw6UWcvo2U3bFzNFSXzFtKPl9sK4mo10fJyKh2vjbHoy6",
  currency: "USD",
  intent: "capture",
  amount: "1.00",
  disableFunding: "credit,card,venmo",
};

function App() {
  return (
    <UserProvider>
      <PayPalScriptProvider options={initialOptions}>
        <Router />
      </PayPalScriptProvider>
    </UserProvider>
  );
}

export default App;

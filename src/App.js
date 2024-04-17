import "./App.css";
import { UserProvider } from "./constants/context";
import Router from "./routes/Router";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;

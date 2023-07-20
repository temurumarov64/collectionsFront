import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { useTheme } from "./hooks/useTheme";
import UserProvider from "./components/AuthContext";
import { setAuthToken } from "./api/setAuthToken";

function App() {
  const { theme, setTheme } = useTheme();
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;

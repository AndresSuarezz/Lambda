import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { AuthProvider } from "./context/AuthContext.jsx";


const theme = createTheme({
  primaryColor: "grape",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MantineProvider>
);

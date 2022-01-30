import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useMeQuery } from "./generated/graphql";

function App() {
  const { data } = useMeQuery();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={!data?.me ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!data?.me ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

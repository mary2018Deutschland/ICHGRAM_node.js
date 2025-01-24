import { Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/menu";
import Login from "./pages/login";
import SignIn from "./pages/signIn";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignIn />} />

      {/* Приватные маршруты */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

// Отдельный компонент для приватных страниц
function MainLayout() {
  return (
    <div className="flex h-screen ">
      <Menu />
      <div className="flex-1 overflow-auto">
        <Routes></Routes>
      </div>
    </div>
  );
}

export default App;

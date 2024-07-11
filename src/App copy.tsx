import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./assets/styles.css";
import Navbar from "./components/Shared/Navbar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import { useAuth } from "./hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Define routes that should not have the Navbar
const routesWithoutNavbar = ['/login', '/register', '/forgot-password'];

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className={`container mx-auto ${showNavbar ? 'mt-4' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./assets/styles.css"; // scroll bar 
// import Navbar from "./Navbar";
// import Profile from "./Profile";
// import Dashboard from "./Dashboard";
// import Login from "./login";
// // import Button2Page from "./Button2Page";
// // import Button3Page from "./Button3Page";
// // import Button4Page from "./Button4Page";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Navbar />
//       <div className="container mx-auto mt-4">
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* <Route path="/button2" element={<Button2Page />} />
//           <Route path="/button3" element={<Button3Page />} />
//           <Route path="/button4" element={<Button4Page />} /> */}
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

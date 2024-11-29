/* eslint-disable react/react-in-jsx-scope */
import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import Layout from './layout/Layout'
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import VehicleTypes from "./pages/Vehicle/Vehicle";
import VehicleMaintenance from './pages/Vehicle/VehicleMaintenance'
import Head from './pages/Vehicle/Head'
import RentType from "./pages/Vehicle/RentType";
import VehicleDetails from "./pages/Vehicle/VehicleDetails";
import NewVehicle from "./pages/Vehicle/Vehicle Details/NewVehicle";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

  
    // If no user or no authentication cookie, redirect to login
    if (!user ) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path='vechile-type'
              index
              element={
                <Layout>
                  <VehicleTypes />
                  </Layout>
              }
            />

            <Route
              path='vehicle-maintenance'
              index
              element={
                <Layout>
                  <VehicleMaintenance />
                  </Layout>
              }
            />

            <Route
              path='rent-type'
              index
              element={
                <Layout>
                  <RentType />
                  </Layout>
              }
            />
            <Route
              path='vehicle-details'
              index
              element={
                <Layout>
                  <VehicleDetails />
                  </Layout>
              }
            />

            <Route
              path='new-vehicle'
              index
              element={
                <Layout>
                  <NewVehicle />
                  </Layout>
              }
            />

            <Route
              path='destination'
              index
              element={
                <Layout>
                  <Head />
                  </Layout>
                
              }
            />
            <Route path="users">
              

             
            </Route>

            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

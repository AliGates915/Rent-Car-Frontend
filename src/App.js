/* eslint-disable react/react-in-jsx-scope */
import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import Layout from "./layout/Layout";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import VehicleTypes from "./pages/Vehicle/Vehicle";
import VehicleMaintenance from "./pages/Vehicle/VehicleMaintenance";
import Head from "./pages/Vehicle/Head";
import RentType from "./pages/Vehicle/RentType";
import VehicleDetails from "./pages/Vehicle/VehicleDetails";
import NewVehicle from "./pages/Vehicle/Vehicle Details/NewVehicle";
import OwnerVehicle from "./pages/Vehicle/OwnerVehicle";
import NewOwner from "./pages/Vehicle/OwnerVehicle/NewOwner";
import NewCustomer from "./pages/Vehicle/Customer/NewCustomer";
import CustomerVehicle from "./pages/Vehicle/CustomerVehicle";
import RentReceipt from "./pages/Vehicle/Rent/RentReceipt";
import RentVehicle from "./pages/Vehicle/Rent/RentVehicle";
import ReturnVehicleForm from "./pages/Vehicle/Rent/ReturnVehicleForm";
import SaveVehicle from "./pages/Vehicle/Rent/SaveVehilce";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // If no user or no authentication cookie, redirect to login
    if (!user&& user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Login />} />
            <Route
            path="home"
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="vechile-type"
              index
              element={
                <Layout>
                  <VehicleTypes />
                </Layout>
              }
            />

            <Route
              path="vehicle-maintenance"
              index
              element={
                <Layout>
                  <VehicleMaintenance />
                </Layout>
              }
            />

            <Route
              path="rent-type"
              index
              element={
                <Layout>
                  <RentType />
                </Layout>
              }
            />
            <Route
              path="vehicle-details"
              index
              element={
                <Layout>
                  <VehicleDetails />
                </Layout>
              }
            />

            <Route
              path="new-vehicle"
              index
              element={
                <Layout>
                  <NewVehicle />
                </Layout>
              }
            />
            <Route
              path="save-vehicle"
              index
              element={
                <Layout>
                  <SaveVehicle />
                </Layout>
              }
            />
            <Route
              path="save-vehicle"
              index
              element={
                <Layout>
                  <SaveVehicle />
                </Layout>
              }
            />
            <Route
              path="new-owner"
              index
              element={
                <Layout>
                  <NewOwner />
                </Layout>
              }
            />
            <Route
              path="save-form"
              index
              element={
                <Layout>
                  <ReturnVehicleForm />
                </Layout>
              }
            />
            
            <Route
              path="owner-details"
              index
              element={
                <Layout>
                  <OwnerVehicle />
                </Layout>
              }
            />
            <Route
              path="new-customer"
              index
              element={
                <Layout>
                  <NewCustomer />
                </Layout>
              }
            />
            <Route
              path="customer-details"
              index
              element={
                <Layout>
                  <CustomerVehicle />
                </Layout>
              }
            />
            <Route
              path="rent-receipt"
              index
              element={
                <Layout>
                  <RentReceipt />
                </Layout>
              }
            />

            <Route
              path="rent-vehicle"
              index
              element={
                <Layout>
                  <RentVehicle />
                </Layout>
              }
            />
            <Route
              path="save-vehicle"
              index
              element={
                <Layout>
                  <ReturnVehicleForm />
                </Layout>
              }
            />

            <Route
              path="destination"
              index
              element={
                <Layout>
                  <Head />
                </Layout>
              }
            />
            <Route path="users"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

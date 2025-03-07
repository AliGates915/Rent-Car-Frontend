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
import Payment from "./pages/Vehicle/Voucher/Payement";
import ExpenseVoucher from "./pages/Vehicle/Voucher/ExpenseVoucher";
import DayBook from "./pages/Vehicle/Voucher/DayBook";
import PDf from "./pages/Vehicle/Voucher/PDf";
import Reports from "./pages/Vehicle/Reports/Reports";
import VehicleList from "./pages/Vehicle/Reports/All Vehicles/table/VehicleList";
import RentList from "./pages/Vehicle/Reports/Rent Vehicle/RentList";
import CashList from "./pages/Vehicle/Reports/CashReceipt/CashList";
import OwnerList from "./pages/Vehicle/Reports/OwnerList/OwnerList";
import PetrolRates from "./pages/Vehicle/Petrol Rates/PetrolRates";
import AddPromotion from "./pages/Vehicle/Promotion/Promotion";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // If no user or no authentication cookie, redirect to login
    if (!user && user) {
      return <Navigate to="/home" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/"> */}
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vechile-type"
            index
            element={
              <Layout>
                <VehicleTypes />
              </Layout>
            }
          />

          <Route
            path="/vehicle-maintenance"
            index
            element={
              <Layout>
                <VehicleMaintenance />
              </Layout>
            }
          />

          <Route
            path="/rent-type"
            index
            element={
              <Layout>
                <RentType />
              </Layout>
            }
          />
          <Route
            path="/vehicle-details"
            index
            element={
              <Layout>
                <VehicleDetails />
              </Layout>
            }
          />

          <Route
            path="/new-vehicle"
            index
            element={
              <Layout>
                <NewVehicle />
              </Layout>
            }
          />
          {/* <Route
            path="/save-vehicle"
            index
            element={
              <Layout>
                <SaveVehicle />
              </Layout>
            }
          /> */}
          <Route
            path="/new-owner"
            index
            element={
              <Layout>
                <NewOwner />
              </Layout>
            }
          />
          <Route
            path="/save-form/:id"
            index
            element={
              <Layout>
                <ReturnVehicleForm />
              </Layout>
            }
          />

          <Route
            path="/owner-details"
            index
            element={
              <Layout>
                <OwnerVehicle />
              </Layout>
            }
          />
          <Route
            path="/new-customer"
            index
            element={
              <Layout>
                <NewCustomer />
              </Layout>
            }
          />
          <Route
            path="/customer-details"
            index
            element={
              <Layout>
                <CustomerVehicle />
              </Layout>
            }
          />
          <Route
            path="/rent-receipt/:id"
            index
            element={
              <Layout>
                <RentReceipt />
              </Layout>
            }
          />

          <Route
            path="/rent-vehicle"
            index
            element={
              <Layout>
                <RentVehicle />
              </Layout>
            }
          />
          <Route
            path="/payment-voucher"
            index
            element={
              <Layout>
                <Payment />
              </Layout>
            }
          />
          <Route
            path="/expense-voucher"
            index
            element={
              <Layout>
                <ExpenseVoucher />
              </Layout>
            }
          />
          <Route
            path="/dayBook"
            index
            element={
              <Layout>
                <DayBook />
              </Layout>
            }
          />
          <Route
            path="/reports"
            index
            element={
              <Layout>
                <Reports />
              </Layout>
            }
          />
          <Route
            path="/vehicle-list"
            index
            element={
              <Layout>
                <VehicleList />
              </Layout>
            }
          />
          <Route
            path="/rent-list"
            index
            element={
              <Layout>
                <RentList />
              </Layout>
            }
          />
          <Route
            path="/cash-list"
            index
            element={
              <Layout>
                <CashList />
              </Layout>
            }
          />
          <Route
            path="/owner-list"
            index
            element={
              <Layout>
                <OwnerList />
              </Layout>
            }
          />
          
          <Route
            path="/petrol-rate"
            index
            element={
              <Layout>
                <PetrolRates />
              </Layout>
            }
          />
          
          <Route
            path="/promotion"
            index
            element={
              <Layout>
                <AddPromotion />
              </Layout>
            }
          />

          {/* <Route
            path="/pdf"
            index
            element={
              <Layout>
                <PDf />
              </Layout>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

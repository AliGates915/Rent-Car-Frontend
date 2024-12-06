/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";

function DayBook() {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const [totals, setTotals] = useState({ totalPayments: 0, totalExpenses: 0 });

  // Fetch Payment Data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/paymentVoucher`
        );
        setPaymentTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching payment data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Fetch Expense Data
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/expenseVoucher`
        );
        // console.log("payment data", response.data);
       
        
        setExpenseTypes(response.data || []);
        // console.log("payment Data", expenseTypes);
      } catch (error) {
        console.error("Error fetching expense data:", error.message);
      }
    };
    fetchExpenses();
  }, []);


  // Filter data by selected date
  useEffect(() => {
    // Format the date to ensure proper comparison (assuming 'date' is in YYYY-MM-DD format)
    const normalizeDate = (dateString) => new Date(dateString).toISOString().split('T')[0];

    // Filter payments and expenses by the selected date
    const filteredPayments = paymentTypes.filter(
      (item) => normalizeDate(item.date) === date
    );
    const filteredExpenses = expenseTypes.filter(
      (item) => normalizeDate(item.date) === date
    );

    console.log("Filtered Payments:", filteredPayments);
    console.log("Filtered Expenses:", filteredExpenses);

    // Set the filtered data
    setFilteredPayments(filteredPayments);
    setFilteredExpenses(filteredExpenses);

    // Calculate totals
    const totalPayments = filteredPayments.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );
    const totalExpenses = filteredExpenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    // Set totals for display
    setTotals({ totalPayments, totalExpenses });
  }, [date, paymentTypes, expenseTypes]);


  // Current date
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);
 

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between my-4 mx-10">
        <div className="text-2xl font-extrabold text-[#0096FF] tracking-wide">
          DayBook
        </div>
        <button
          className="bg-[#0096FF] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
          text-xl text-white tracking-wide flex items-center justify-center
          hover:bg-[#4a32b3] hover:scale-105 hover:shadow-lg hover:shadow-[#0096FF]/80"
        >
          +
        </button>
      </nav>
      <hr className="bg-gray-400 mb-4" />

      {isLoading ? (
        <div className="flex justify-center mt-48 min-h-screen">
          <FadeLoader color="#0fdaee" size={15} margin={5} />
        </div>
      ) : (
        <div className="max-w-full mx-10">
          {/* Date Selector */}
          <div className="flex justify-between items-center gap-4 mb-4">
          <div className="bg-white shadow-xl rounded-lg p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-1">Pick a Date</h2>
        <div className="relative">
          <input
            type="date"
           
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-60 border border-blue-300 rounded-lg px-4 py-2 
            bg-gradient-to-r text-md outline-none 
            focus:ring-2 focus:ring-blue transition-all"
          />
        </div>
        
      </div>
            <div>
              <span className="font-bold text-lg text-[#4a32b3]">
                Total Balance: {" "}
                Rs.{totals.totalPayments - totals.totalExpenses}
              </span>
            </div>
          </div>

          {/* Data Tables */}
          <div className="flex justify-between gap-4">
            {/* Payment Table */}
            <div className="w-1/2">
              <h2 className="text-lg font-bold mb-2 text-[#0096FF]">Payment Voucher</h2>
              <table className="min-w-full shadow-xl border-collapse border border-gray-200">
                <thead className="text-sm bg-[#0096FF] text-gray-50">
                  <tr>
                    <th className="border w-14 px-1 py-1">SR.#</th>
                    <th className="border px-1 py-1">VOUCHER NO.</th>
                    <th className="border px-1 py-1">CUSTOMER</th>
                    <th className="border px-1 py-1">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment, index) => (
                      <tr key={payment._id}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{payment.voucherNo}</td>
                        <td className="border px-4 py-2">
                          {payment.customerName}
                        </td>
                        <td className="border px-4 py-2">{payment.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="border px-4 py-2 text-center text-lg font-semibold"
                      >
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-end block mt-2 mr-20">
                <span className="text-lg font-bold text-[#0062ff]">
                  Total Payments: Rs.{totals.totalPayments}
                </span>
              </div>
            </div>

            {/* Expense Table */}
            <div className="w-1/2">
              <h2 className="text-lg font-bold mb-2 text-[#FF4500]">Expense Voucher</h2>
              <table className="min-w-full shadow-xl border-collapse border border-gray-200">
                <thead className="text-sm bg-[#FF4500] text-gray-50">
                  <tr>
                    <th className="border w-14 px-1 py-1">SR.#</th>
                    <th className="border px-1 py-1">HEAD</th>
                    <th className="border px-1 py-1">VOUCHER NO.</th>
                    <th className="border px-1 py-1">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense, index) => (
                      <tr key={expense._id}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{expense.head}</td>
                        <td className="border px-4 py-2">{expense.voucherNo}</td>
                        <td className="border px-4 py-2">{expense.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="border px-4 py-2 text-center font-semibold"
                      >
                        No data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-end block mt-2 mr-20">
                <span className="text-lg text-[#FF4500] font-bold">
                  Total Expenses: Rs.{totals.totalExpenses}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DayBook;

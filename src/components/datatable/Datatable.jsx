/* eslint-disable react/react-in-jsx-scope */
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import useFetch from '../../hooks/useFetch';

const Datatable = ({ columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [loading, setLoading] = useState(true);
  // Initialize list as an empty array
  const [list, setList] = useState([]);

  const { data, error } = useFetch(`${process.env.REACT_APP_API}/${path}`);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);


  useEffect(() => {
    
    setList(data || []); // Ensure list is always an array
  }, [data]);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        console.log("Deleting item with ID:", _id); // Debug log
  
        const response = await axios.delete(`${process.env.REACT_APP_API}/${path}/${_id}`);
        
        // Check if the response indicates success
        if (response.status === 200 || response.status === 204) {
          setList(list.filter((item) => item._id !== _id));
          alert("Delete successful");
        } else {
          console.error("Unexpected response status:", response.status);
          alert("Failed to delete item");
        }
      } catch (err) {
        console.error("Error deleting item:", err);
        alert("Error deleting item: " + (err.response?.data?.message || err.message));
      }
    }
  };
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to="/users/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="loadingContainer">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;






/*
const Datatable = ({ columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // Initialize list with an empty array
  const [list, setList] = useState([]);

  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API}/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this item?")){
      try {
        await axios.delete(`${process.env.REACT_APP_API}/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
        alert("Delete successful");
      } catch (err) {
        console.error("Error deleting item:", err);
        alert("Error deleting item:", err);
      }
  }
};


const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to="/users/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </div>
        </div>
      );
    },
  },
];

if (loading) {
  return (
    <div className="loadingContainer">
      <ClipLoader size={50} color={"#123abc"} loading={loading} />
    </div>
  );
}

if (error) {
  return <div>Error loading data</div>;
}

return (
  <div className="datatable">
    <div className="datatableTitle">
      All {path}
      <Link to={`${process.env.REACT_APP_API}/${path}/new`} className="link">
        Add New User
      </Link>
    </div>
    <DataGrid
      className="datagrid"
      rows={list}  // Use list which is now guaranteed to be an array
      columns={columns.concat(actionColumn)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
      getRowId={row => row._id}
    />
  </div>
);
};
*/ 
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';


const Home = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  // const [joindate, setJoindata] = useState(userData[0].date_of_joining);
  const [totalLeave1, setTotalLeave1] = useState(10);
  const [totalLeave, setTotalLeave] = useState(0);
  const [leavedata, setLeavedata] = useState([])
  const anvigate = useNavigate()
   const [employee, setEmployee] = useState({
    id: userData[0].id || '',
    name: userData[0].name || '',  
    designation: userData[0].designation || '',
    startDate: '',
    endDate: '',
    resion: '',
    status: 'Pending',
    joindate: userData[0].date_of_joining,
  });
  useEffect(() => {
    axios.get('http://localhost:2410/getLeave/'+userData[0].name)
    .then(result => {
      setLeavedata(result.data)
    }).catch(err => console.log(err))
    setEmployee({
      ...employee,
      name: userData[0].name || '',
      designation: userData[0].designation || '',
    });
    
  }, [userData]);

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    // console.log(employee);
  
    // const JDate = new Date(employee.joindate);
    // console.log(JDate);
  
    // const SDate = new Date(e.value.startDate);
    // console.log(SDate);
  
    // const timeDifference = SDate.getTime() - JDate.getTime();
    // const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    // console.log("Number of days:", daysDifference);
  };
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(employee.startDate);
    const endDate = new Date(employee.endDate);
    // const JDate = new Date(employee.joindate);
    // console.log(JDate)

    
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    // console.log("Number of days:", daysDifference);

    // console.log(employee)
    axios.post('http://localhost:2410/leaveapply', 
    {...employee,
    daysDifference : daysDifference
    },
  {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,})
      .then(response => {
        console.log(response.data.message);
        alert("Leave application successfully")
        window.location.reload();
        setEmployee({
          name: '',
          designation: '',
          startDate: '',
          endDate: '',
          reasion:'',
        });
      })
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    localStorage.removeItem('valid');
    anvigate('/')
  };

  const getStatusColor = (status) => {
    const lowerCaseStatus = status.toLowerCase();
  
    switch (lowerCaseStatus) {
      case "pending":
        return "warning"; 
      case "reject":
        return "danger"; 
      case "approved":
        return "success"; 
      default:
        console.log("Unknown status:", status);
        return "dark"; 
    }
  };

  return (
    
<div className="container mt-3">
<div className="row">
        <div className="col-lg-6 ">
        </div>

        <div className="col-lg-12">
          <div className="p-3 border shadow-sm mb-3 bg-warning">
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Table striped bordered hover responsive>
        <thead className="text-center">
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Leave Days</th>
              <th>Total Leave Days</th>
            </tr>
          </thead>
          <tbody className="text-center">
          {Array.isArray(leavedata) && leavedata.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.designation} </td>
                <td>{e.startdate}</td>
                <td>{e.enddate}</td>
                <td>{e.reason}</td>
                <td>
                <span className={`badge bg-${getStatusColor(e.status)} fs-6`}>{e.status}</span>

                </td>
                <td>{e.leaves_days}</td>
                <td>15</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="p-3 rounded border shadow-sm">
            <h3 className="text-center">Leave Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputName"
                    placeholder="Enter Name"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="inputDesignation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputDesignation"
                    placeholder="Enter Designation"
                    name="designation"
                    value={employee.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="inputStartDate" className="form-label">
                    Leave Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputStartDate"
                    name="startDate"
                    value={employee.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="inputEndDate" className="form-label">
                    Leave End Date
                  </label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputEndDate"
                    name="endDate"
                    value={employee.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="inputResion" className="form-label">
                    Reasion
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputResion"
                    placeholder="Enter Resion"
                    name="resion"
                    value={employee.resion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary mx-auto d-block">
                  Apply Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
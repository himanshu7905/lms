import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const anvigate = useNavigate()


  useEffect(() => {
    axios
      .get("http://localhost:2410/employee")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:2410/deleteemployee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          alert("Delete employee successfully");
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const handleLogout = () => {
    alert("Logout logic goes here");
    localStorage.removeItem('valid');
    anvigate('/')
  };

  return (

    <Container className="px-3 mt-3">
  <h3 className="text-center">Employee List</h3>
  <br />
  <Row className="mt-2 d-flex ">
    <Col xs={6} md={4} className="mb-2">
      <Link to="/dashboard/add_employee" className="btn btn-success btn-block">
        Add Employee
      </Link>
     
    </Col>
    <Col xs={12} md={4} className="mb-2">
    <Link to="/dashboard/leave_applications" className="btn btn-success btn-block mr-5">
        Leave applications
      </Link>
    </Col>
    <Col xs={6} md={4} className="mb-2">
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Col>
  </Row>
  <div className="mt-3">
    <Table striped bordered hover responsive>
      <thead className="text-center">
        <tr>
          <th>Name</th>
          <th>Photo</th>
          <th>Designation</th>
          <th>Email</th>
          <th>Date of Joining</th>
          <th>Manager</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {employee.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>
              <div className="employee-image-container">
                <div className="circular-background">
                  {e.name.charAt(0)}
                </div>
              </div>
            </td>
            <td>{e.designation}</td>
            <td>{e.email}</td>
            <td>{e.date_of_joining}</td>
            <td>{e.manager}</td>
            <td>
              <Link
                to={`/dashboard/edit_employee/${e.id}`}
                className="btn btn-info btn-sm me-2"
              >
                Edit
              </Link>
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleDelete(e.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</Container>
    
  );
};

export default Employee;

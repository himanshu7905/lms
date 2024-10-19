import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    photo: null,
    designation: "",
    email: "",
    password: "",
    dateOfJoining: "",
    manager: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateOfJoining = new Date(employee.dateOfJoining);
    const formData = {
      name: employee.name,
      photo: employee.photo,
      designation: employee.designation,
      email: employee.email,
      password: employee.password,
      dateOfJoining:`${dateOfJoining.getDate()}-${dateOfJoining.getMonth()}-${dateOfJoining.getFullYear()}`,
      manager:employee.manager,
    };
     axios
      .post("http://localhost:2410/addemployee", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      })
      .then((result) => {
        if (result.data.Status) {
           navigate("/dashboard/employee");
          alert('Successfully added employee');

        } else {
          alert(result.data.message);
          navigate("/dashboard/employee");
        }
      })
      .catch((err) => console.log(err));
};
  
  
  return (
    

    <Container className="mt-3">
    <Row className="justify-content-center">
      <Col md={6} xs={12}>
        <div className="p-3 rounded border">
          <h3 className="text-center">Add Employee</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="inputName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={(e) => setEmployee({ ...employee, photo: e.target.files[0] })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter designation"
                onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputDateOfJoining">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setEmployee({ ...employee, dateOfJoining: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputManager">
              <Form.Label>Manager</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter manager name"
                onChange={(e) => setEmployee({ ...employee, manager: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-10 mx-auto d-block">
  Add Employee
</Button>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
);
}

export default AddEmployee;


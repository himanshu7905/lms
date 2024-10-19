import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    email: "",
    password: "",
    dateOfJoining: "",
    manager: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:2410/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          designation: result.data.Result[0].designation,
          email: result.data.Result[0].email,
          password: result.data.Result[0].password,
          dateOfJoining: result.data.Result[0].date_of_joining,
          manager: result.data.Result[0].manager,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
    axios
      .put("http://localhost:2410/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border">
        <h3 className="text-center">Edit Employee</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="g-1">
            <Col xs={12}>
              <Form.Group controlId="inputName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="inputEmail4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="inputPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={employee.password}
                  onChange={(e) =>
                    setEmployee({ ...employee, password: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="inputDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Designation"
                  autoComplete="off"
                  value={employee.designation || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, designation: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="inputDateOfJoining">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Date of Joining"
                  autoComplete="off"
                  value={employee.dateOfJoining || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, dateOfJoining: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="inputManager">
                <Form.Label>Manager</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Manager"
                  autoComplete="off"
                  value={employee.manager || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, manager: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button
                type="submit"
                className="btn btn-primary w-10 mx-auto d-block"
              >
                Edit Employee
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default EditEmployee;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button, Table } from 'react-bootstrap';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveApplication = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:2410/leaves")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApproved = (id) => {
    const data = {
      status: "Approved",
    };
    axios
      .put(
        `http://localhost:2410/leave_approve/${id}`,
        { data }
      )
      .then((result) => {
        if (result.data.Status) {
          alert("Approved Leave successfully");
          window.location.reload();
        } else {
          alert("Approved Leave successfully");
          window.location.reload();
        }
      });
  };

  const handleReject = (id) => {
    const data = {
      status: "Reject",
    };
    axios
      .put(
        `http://localhost:2410/leave_reject/${id}`,
        { data }
      )
      .then((result) => {
        if (result.data.Status) {
          alert("Reject Leave successfully");
          window.location.reload();
        } else {
          alert("Reject Leave successfully");
          window.location.reload();
        }
      });
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
        return "dark";
    }
  };

  return (
    <Container className="px-3 mt-3">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h3>All leave applications</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} className="">
          <Link
            to="/dashboard/employee"
            className="btn btn-secondary btn-block mr-5"
          >
            Back
          </Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {employee.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.designation}</td>
                  <td>{e.startdate}</td>
                  <td>{e.enddate}</td>
                  <td>{e.reason}</td>
                  <td>
                    <span
                      className={`badge bg-${getStatusColor(e.status)} fs-6`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td>{e.leaves_days}</td>
                  <td>
                    <Link
                      to={`/dashboard/leave_form/${e.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleApproved(e.id)}
                      disabled={e.status === "Approved"}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleReject(e.id)}
                      disabled={e.status === "Reject"}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default LeaveApplication;

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

const EditLeaveForm = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
      name: "",
      designation: "",
      startdate: "",
      enddate: "",
      reason: "",
      status: "",
      leaves_days:"",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:2410/Leave_employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                designation: result.data.Result[0].designation,
                startdate: result.data.Result[0].startdate,
                enddate: result.data.Result[0].enddate,
                reason: result.data.Result[0].reason,
                status: result.data.Result[0].status,
                leaves_days: result.data.Result[0].leaves_days,
            })
        }).catch(err => console.log(err))

       

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:2410/edit_leave_form/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/leave_applications')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="p-3 rounded border">
            <h3 className="text-center">Edit Leave Form</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} controlId="inputName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={employee.name || ''}
                  onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inputDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Designation"
                  autoComplete="off"
                  value={employee.designation || ''}
                  onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inputStartdate">
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Start Date"
                  autoComplete="off"
                  value={employee.startdate || ''}
                  onChange={(e) => setEmployee({ ...employee, startdate: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inputEnddate">
                <Form.Label>End date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter End Date"
                  autoComplete="off"
                  value={employee.enddate || ''}
                  onChange={(e) => setEmployee({ ...employee, enddate: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inputReason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Reason"
                  autoComplete="off"
                  value={employee.reason || ''}
                  onChange={(e) => setEmployee({ ...employee, reason: e.target.value })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inputStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Status"
                  autoComplete="off"
                  value={employee.status || ''}
                  onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="inputleavesdays">
                <Form.Label>Leaves Day</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter leave days"
                  autoComplete="off"
                  value={employee.leaves_days || ''}
                  onChange={(e) => setEmployee({ ...employee, leaves_days: e.target.value })}
                />
              </Form.Group>

              <br />
            <Button variant="primary" type="submit" className="w-10 mx-auto d-block">

Edit Employee
</Button>
            </Form>
           
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditLeaveForm


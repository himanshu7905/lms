import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import PrivateRoute from './Components/PrivateRoute'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
 import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import LeaveApplication from './Components/LeaveApplication'
import EditLeaveForm from './Components/EditLeaveForm'
import './style.css'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
       <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
         </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/leave_applications' element={<LeaveApplication />}></Route>
        <Route path='/dashboard/leave_form/:id' element={<EditLeaveForm />}></Route>

      </Route> 
    </Routes>
    </BrowserRouter>
  )
}

export default App

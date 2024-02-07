import React from 'react'
import {Routes,Route} from "react-router-dom"
import Navbar from '../Navbar'
import Signup from '../Signup'
import Signin from '../Signin'


import TaskBar from '../Task_Operations/Taskbar'
import EditTask from '../Task_Operations/EditTask'
import PrivateRoute from './PrivateRoute'
import AddPatient from '../Task_Operations/AddPatient'
import EditPatient from '../Task_Operations/EditTask'
import PatientBar from '../Task_Operations/Taskbar'
import ForgotResetPasswordPage from '../ForgotPassword'


const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/taskbar" element={<PatientBar/>}/>
        <Route path="/addpatient" element={<PrivateRoute><AddPatient/></PrivateRoute>}/>
        <Route path="/taskedit/:taskId" element={<PrivateRoute><EditPatient/></PrivateRoute>}/>
        <Route path='/forgotpass' element={<PrivateRoute><ForgotResetPasswordPage/></PrivateRoute>}/>
    </Routes>
  )
}

export default MainRoute
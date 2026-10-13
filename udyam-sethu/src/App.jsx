import { useState, } from 'react'
import { useParams } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChooseRole from './pages/ChooseRole';
import PostGig from './pages/Postgig';
import StudentDashboard from './pages/Student';
import Assessment from './pages/Assessment';
import InstitutionDashboard from './pages/InstitutionDashboard';
import Home from './pages/Home';
import Signup from './pages/Signup';
import InstitutionAdminLogin from './pages/InstitutionAdminLogin';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AcademicPerformance from './studentDashboard/AcademicPerformance';
import Assessments from './studentDashboard/Assessments';
import Attendance from './studentDashboard/Attendance';
import Opportunities from './studentDashboard/Opportunities';
import SavedOpportunities from './studentDashboard/SavedOpportunities ';
import Applications from './studentDashboard/Applications';
import Skills from './studentDashboard/Skills';
import StudentProfile from './studentDashboard/StudentProfile';
import Settings from './studentDashboard/Settings';
import SkillLearning from './studentDashboard/SkillLearning';
import Resume from './quickActions/Resume';
import Certificates from './quickActions/Certificates';
import EmployerLogin from './pages/EmployerLogin';
import EmployerRegister from './EmployeeePage/EmployerRegister';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/udyamsethu/' element={<Home />} />
          <Route path='/udyamsethu/login' element={<Login />} />
          <Route path='/udyamsethu/signup' element={<Signup />} />
          <Route path='/udyamsethu/chooseRole' element={<ChooseRole />} />
          <Route path='/udyamsethu/company' element={<Dashboard />} />
          <Route path='/udyamsethu/postgig' element={<PostGig />} />
          <Route path='/udyamsethu/student' element={<StudentDashboard />} />
          <Route path='/udyamsethu/assessement' element={<Assessment />} />
          <Route path='/udyamsethu/institution' element={<InstitutionDashboard />} />
          <Route path='/udyamsethu/institution-login' element={<InstitutionAdminLogin />} />
          <Route path='/udyamsethu/forgot-password' element={<ForgotPassword />} />
          <Route path='/udyamsethu/reset-password/:token' element={<ResetPassword />} />

          <Route path='/udyamsethu/student/academic-performance' element={<AcademicPerformance />} />
          <Route path='/udyamsethu/student/attendance' element={<Attendance />} />
          <Route path='/udyamsethu/student/assessments' element={<Assessments />} />
          <Route path='/udyamsethu/student/applications' element={<Applications />} />
          <Route path='/udyamsethu/student/opportunities' element={<Opportunities />} />
          <Route path='/udyamsethu/student/saved-opportunities' element={<SavedOpportunities />} />
          <Route path='/udyamsethu/student/skills' element={<Skills />} />
          <Route path='/udyamsethu/student/skills/:studentSkillId' element={<SkillLearning />} />
          <Route path='/udyamsethu/student/profile' element={<StudentProfile />} />
          <Route path='/udyamsethu/student/settings' element={<Settings />} />

          <Route path='/udyamsethu/student/resume' element={<Resume />} />
          <Route path='/udyamsethu/student/certificates' element={<Certificates />} />

          <Route path='/udyamsethu/employer-login' element={<EmployerLogin />} />

          <Route path='/udyamsethu/employer-register' element={<EmployerRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

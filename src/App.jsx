import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Home from './Components/Home.jsx';
import JobListing from './Components/JobListing.jsx';
import JobDetails from './Components/JobDetails.jsx';
import AddJob from './Components/AddJob.jsx';
import JobApplications from './Components/JobApplications.jsx';
import JobApplicationsManage from './Components/JobApplicationsManage.jsx';
import AdminPanel from './Components/AdminPanel.jsx';
import RecruiterPanel from './Components/RecruiterPanel.jsx';
import RecruiterHome from './pages/RecruiterHome.jsx';
import NotFound from './Components/NotFound.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobListing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <ProtectedRoute>
                    <JobDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-job"
                element={
                  <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                    <AddJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-job"
                element={<Navigate to="/add-job" replace />}
              />
              <Route
                path="/my-applications"
                element={
                  <ProtectedRoute>
                    <JobApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:jobId/applications"
                element={
                  <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                    <JobApplicationsManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruiter"
                element={
                  <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                    <RecruiterPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruiter-home"
                element={
                  <ProtectedRoute allowedRoles={['recruiter']}>
                    <RecruiterHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
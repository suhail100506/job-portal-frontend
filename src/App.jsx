import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import JobListing from './Components/JobListing';
import JobDetails from './Components/JobDetails';
import AddJob from './Components/AddJob';
import JobApplications from './Components/JobApplications';
import JobApplicationsManage from './Components/JobApplicationsManage';
import AdminPanel from './Components/AdminPanel';
import RecruiterPanel from './Components/RecruiterPanel';
import RecruiterHome from './pages/RecruiterHome';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';

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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import JobListing from './components/JobListing';
import JobDetails from './components/JobDetails';
import AddJob from './components/AddJob';
import JobApplications from './components/JobApplications';
import JobApplicationsManage from './components/JobApplicationsManage';
import AdminPanel from './components/AdminPanel';
import RecruiterPanel from './components/RecruiterPanel';
import RecruiterHome from './pages/RecruiterHome';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

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
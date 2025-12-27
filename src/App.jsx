import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import JobListing from './components/JobListing.jsx';
import JobDetails from './components/JobDetails.jsx';
import AddJob from './components/AddJob.jsx';
import JobApplications from './components/JobApplications.jsx';
import JobApplicationsManage from './components/JobApplicationsManage.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import RecruiterPanel from './components/RecruiterPanel.jsx';
import RecruiterHome from './pages/RecruiterHome.jsx';
import NotFound from './components/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
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
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
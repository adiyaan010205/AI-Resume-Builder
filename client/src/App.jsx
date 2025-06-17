import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ResumeProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/builder/:id?"
                    element={
                      <ProtectedRoute>
                        <ResumeBuilder />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Toaster position="bottom-right" />
            </div>
          </Router>
        </ResumeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ProtectedRoute from './layouts/ProtectedRoute';
import NotFound from './pages/not_found';
import Unauthorized from './pages/unauthorized';
import { AuthProvider } from './context/AuthContext';

const Auth = lazy(() => import('./pages/auth'));
const Home = lazy(() => import('./pages/home'));
const AdminPage = lazy(() => import('./pages/admin'));
const DetailPelamar = lazy(() => import('./pages/pelamar'));

const App: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <Suspense>
          <Routes>
            {/* Public Route */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/detail/pelamar/:id" element={<DetailPelamar />} />
            </Route>
            
            <Route path='*' element={<NotFound />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';
import PublicOnlyRoute from './components/routing/PublicOnlyRoute.jsx';
import { Skeleton } from './components/ui/Skeleton.jsx';

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const EmployeesPage = lazy(() => import('./pages/EmployeesPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function RouteLoader() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-12" />
      <Skeleton className="h-96" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

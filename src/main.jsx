import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import AppErrorBoundary from './components/routing/AppErrorBoundary.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppErrorBoundary>
          <AuthProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3600}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              toastClassName="modern-toast"
              bodyClassName="modern-toast-body"
            />
          </AuthProvider>
        </AppErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

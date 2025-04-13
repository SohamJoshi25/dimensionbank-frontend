// Packages
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { Toaster } from 'sonner'

//Pages
import Login from './pages/login/Login';
import Otp from './pages/login/Otp';
import NotFound from './pages/notfound/NotFound';
import Dashboard from './pages/dashboard/Dashboard';
import { useUserContext } from './common/contexts/UserProvider';

const App = () => {

  const user = useUserContext();

  return (
    <BrowserRouter>

  <Routes>
    <Route path="/otp" element={user.email ? <Otp /> : <Navigate to="/login" replace />} />
    <Route path="/dashboard" element={user.token ? <Dashboard /> : <Navigate to="/login" replace />} />
    <Route path="/login" element={user.token ? <Navigate to="/dashboard" replace /> : <Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>

      <Toaster position="top-right" closeButton richColors toastOptions={{
        unstyled: false,
        classNames: {
          toast: 'p-[16px] border-[0.5px]',
          title: 'text-[14px]',
          closeButton: 'border-[0.5px]'
        },
      }} />
    </BrowserRouter>
  )
}

export default App
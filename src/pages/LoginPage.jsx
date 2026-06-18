import { LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import { validateLogin } from '../utils/validation.js';

export default function LoginPage() {
  const [values, setValues] = useState({ email: 'admin@company.com', password: 'admin123' });
  const [errors, setErrors] = useState({});
  const { login, isAuthenticating } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please fix the highlighted login fields.');
      return;
    }

    try {
      await login(values);
      toast.success('Login successful. Welcome back to WorkforceOS.');
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(`Authentication failed. ${error.message}`);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(135deg,#f8fafc,#eef2ff_52%,#f0fdfa)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,#172554,transparent_34%),linear-gradient(135deg,#020617,#111827_52%,#042f2e)]">
      <section className="w-full max-w-md rounded-2xl border border-white/70 bg-white/78 p-7 shadow-soft backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/82">
        <div>
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-brand-600 text-white shadow-soft">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-normal">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Access the employee management dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={values.email}
                onChange={(event) => updateValue('email', event.target.value)}
                className="form-input pl-10"
                autoComplete="email"
              />
            </div>
            {errors.email ? <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">{errors.email}</p> : null}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              value={values.password}
              onChange={(event) => updateValue('password', event.target.value)}
              className="form-input mt-2"
              autoComplete="current-password"
            />
            {errors.password ? <p className="mt-1 text-sm text-rose-600 dark:text-rose-300">{errors.password}</p> : null}
          </label>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="h-12 w-full rounded-lg bg-brand-600 text-sm font-bold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isAuthenticating ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}

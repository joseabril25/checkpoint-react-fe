import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLoginMutation } from '../store/api/auth';
import { loginSchema, type LoginFormData } from '../lib/validations/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, isSuccess, error, isError }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data)
  };

  useEffect(() => {
    if (isSuccess) {
      // Redirect to dashboard or intended page after successful login
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  })

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">Welcome Back</h2>
        <p className="text-neutral-600 mt-2">Sign in to your account</p>
      </div>

      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {'data' in error ? (error.data as any)?.message || 'Login failed. Please try again.' : 'Login failed. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              type="email"
              value={value}
              onChange={onChange}
              placeholder="john@company.com"
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              label="Password"
              type="password"
              value={value}
              onChange={onChange}
              placeholder="••••••••"
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          type="submit"
          disabled={isLoading || !isValid}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/register"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Need an account? Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
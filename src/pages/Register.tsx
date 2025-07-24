import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useRegisterMutation } from '../store/api/auth';
import { registerSchema, type RegisterFormData } from '../lib/validations/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, { isLoading, error, isSuccess, isError }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    await register(registerData)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">Create Account</h2>
        <p className="text-neutral-600 mt-2">Start tracking your team's progress</p>
      </div>

      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {'data' in error ? (error.data as any)?.message || 'Registration failed. Please try again.' : 'Registration failed. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              label="Full Name"
              type="text"
              value={value}
              onChange={onChange}
              placeholder="John Doe"
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />

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

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirm Password"
              type="password"
              value={value}
              onChange={onChange}
              placeholder="••••••••"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
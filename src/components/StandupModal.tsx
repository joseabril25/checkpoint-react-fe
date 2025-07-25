import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from './ui/Button';
import { TextAarea } from './ui/TextArea';
import { Avatar } from './ui/Avatar';
import { useCreateStandupMutation, useUpdateStandupMutation } from '../store/api/standups';
import { useAppSelector } from '../store/hooks';
import { standupSchema, type StandupFormData } from '../lib/validations/standup';
import { getInitials } from '../utils/strings';
import { getDateToday } from '../utils/date';
import { getApiErrorMessage } from '../utils/errors';

interface StandupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickTemplates = [
  "Code review and bug fixes",
  "Working on new feature implementation", 
  "Meeting with stakeholders",
  "Documentation updates",
  "Testing and QA",
];

export function StandupModal({ isOpen, onClose }: StandupModalProps) {
  const user = useAppSelector((state) => state.auth.user);
  const editingStandup = useAppSelector((state) => state.standup.editingStandup);
  const [createStandup, { isLoading: isCreating, isSuccess: createSuccess, error: createError }] = useCreateStandupMutation();
  const [updateStandup, { isLoading: isUpdating, isSuccess: updateSuccess, error: updateError }] = useUpdateStandupMutation();
  
  const isLoading = isCreating || isUpdating;
  const isSuccess = createSuccess || updateSuccess;
  const error = createError || updateError;
  const isEditing = !!editingStandup;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch
  } = useForm<StandupFormData>({
    resolver: yupResolver(standupSchema),
    mode: 'onChange',
    defaultValues: {
      yesterday: editingStandup?.yesterday || '',
      today: editingStandup?.today || '',
      blockers: editingStandup?.blockers || 'None',
    }
  });

  const watchedValues = watch();

  // Reset form when modal opens or editing standup changes
  useEffect(() => {
    if (isOpen) {
      reset({
        yesterday: editingStandup?.yesterday || '',
        today: editingStandup?.today || '',
        blockers: editingStandup?.blockers || 'None',
      });
    }
  }, [isOpen, editingStandup, reset]);

  // Close modal on successful submission
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const onSubmit = async (data: StandupFormData) => {
    if (!user) return;
    
    const standupData = {
      yesterday: data.yesterday,
      today: data.today,
      blockers: data.blockers,
      status: 'submitted' as const,
    };

    if (isEditing && editingStandup) {
      await updateStandup({
        id: editingStandup.id,
        data: standupData,
      });
    } else {
      await createStandup(standupData);
    }
  };

  const addTemplate = (template: string, field: 'yesterday' | 'today') => {
    const currentValue = watchedValues[field];
    const newValue = currentValue ? `${currentValue} ${template}` : template;
    setValue(field, newValue, { shouldValidate: true, shouldDirty: true });
  };

  if (!isOpen || !user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-[rgb(var(--color-primary))] text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{isEditing ? 'Edit' : 'Daily'} Standup</h2>
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Avatar
              src={user.profileImage}
              alt={user.name}
              initials={getInitials(user.name)}
              size="sm"
              className="bg-white/20 text-white"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-white/80">{getDateToday()}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {getApiErrorMessage(error)}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Yesterday */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">✅ What did you accomplish yesterday?</span>
              </div>
              <Controller
                name="yesterday"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextAarea
                    label=""
                    placeholder="Share what you completed yesterday..."
                    value={value}
                    onChange={onChange}
                    error={!!errors.yesterday}
                    errorMessage={errors.yesterday?.message}
                    className="min-h-[80px] resize-none"
                    rows={3}
                  />
                )}
              />

              {/* Quick Templates */}
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {quickTemplates.slice(0, 3).map((template, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addTemplate(template, "yesterday")}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Today */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">🎯 What are you planning to do today?</span>
              </div>
              <Controller
                name="today"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextAarea
                    label=""
                    placeholder="Outline your goals for today..."
                    value={value}
                    onChange={onChange}
                    error={!!errors.today}
                    errorMessage={errors.today?.message}
                    className="min-h-[80px] resize-none"
                    rows={3}
                  />
                )}
              />

              {/* Quick Templates */}
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {quickTemplates.slice(2, 5).map((template, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addTemplate(template, "today")}
                      className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blockers */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">🚧 Any blockers or challenges?</span>
              </div>
              <Controller
                name="blockers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextAarea
                    label=""
                    placeholder="Describe any obstacles or help you need (or leave empty if none)..."
                    value={value || ''}
                    onChange={onChange}
                    error={!!errors.blockers}
                    errorMessage={errors.blockers?.message}
                    className="min-h-[60px] resize-none"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Markdown Tips */}
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <p className="font-medium mb-1">💡 Markdown supported:</p>
              <p>**bold**, *italic*, `code`, [link](url), - bullet points</p>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-white pt-4 border-t">
              <Button
                type="submit"
                disabled={isLoading || !isValid}
                variant="primary"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    {isEditing ? 'Update' : 'Submit'}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
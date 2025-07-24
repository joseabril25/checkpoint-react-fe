export const getApiErrorMessage = (error: any): string => {
  // Handle RTK Query error structure
  if (error && 'data' in error) {
    const errorData = error.data;
    
    // Check for validation error details
    if (errorData?.error?.details && Array.isArray(errorData.error.details)) {
      // Get the first validation error message
      const firstDetail = errorData.error.details[0];
      if (firstDetail?.message) {
        return firstDetail.message;
      }
    }
    
    // Fallback to general message
    if (errorData?.message) {
      return errorData.message;
    }
  }
  
  // Default fallback
  return 'An unexpected error occurred. Please try again.';
};
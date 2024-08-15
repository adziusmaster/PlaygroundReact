type ErrorHandler = (errorMessage: string) => void;

type LoaderHandler = (isLoading: boolean) => void;

type SuccessHandler<T> = (data: T) => void; 

export const apiHandler = async <T>(
  apiCall: () => Promise<T>,
  setLoader: LoaderHandler,
  handleError: ErrorHandler,
  handleSuccess: SuccessHandler<T> 
): Promise<T | null> => {
  setLoader(true);

  try {
    const response = await apiCall();
    handleSuccess(response);
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    handleError(errorMessage);
    console.error("API Error:", errorMessage);

    return null;
  } finally {
    setLoader(false);
  }
};

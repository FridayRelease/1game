import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useResetState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(errorActions.resetError());
    dispatch(LoadingActions.setIsLoading(false));
  }, []);
};

export default useResetState;

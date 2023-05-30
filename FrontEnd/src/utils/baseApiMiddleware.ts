import { AnyAction, Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { ToastContent, toast } from 'react-toastify';

interface MyAction extends AnyAction {
  payload: {
    status: number;
  };
}

export const baseApiMiddleware: Middleware = () => (next) => (action: MyAction) => {
  if (isRejectedWithValue(action)) {
    toast.error(action.payload as unknown as ToastContent<unknown>);
    if (action.payload.status === 401) {
      window.location?.replace('/');
    }
  }

  return next(action);
}
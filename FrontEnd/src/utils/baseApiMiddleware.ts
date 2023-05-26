import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const baseApiMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(action.payload);
    if (action.payload.status === 401) {
      window.location.replace('/');
    }
  }

  return next(action);
}
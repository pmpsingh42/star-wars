import { CLEAR_APP_ERROR, APP_NOTIFICATION } from "./application.type";

export const clearError = () => ({type: CLEAR_APP_ERROR});
export const setNotification = (error) => ({type: APP_NOTIFICATION, error});

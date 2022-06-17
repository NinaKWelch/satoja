export const NOTIFY_SUCCESS = "NOTIFY_SUCCESS"
export const NOTIFY_ERROR = "NOTIFY_ERROR"
export const NOTIFY_VERIFY = "NOTIFY_VERIFY"
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION"

export const notifySuccess = (message) => {
  return {
    type: NOTIFY_SUCCESS,
    message,
  }
}

export const notifyError = (message) => {
  return {
    type: NOTIFY_ERROR,
    message,
  }
}

export const notifyVerify = (message) => {
  return {
    type: NOTIFY_VERIFY,
    message,
  }
}

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
  }
}

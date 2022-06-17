export const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL"

export const handleLoginModal = (show) => {
  return {
    type: HANDLE_LOGIN_MODAL,
    show,
  }
}

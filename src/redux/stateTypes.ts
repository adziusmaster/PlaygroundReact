export type StateLoader = {
  isLoading: boolean
}

export type GlobalError = {
  hasError: boolean
  errorMessage: string
}

export type GlobalSuccess = {
  hasSuccess: boolean
  successMessage: string
}

export type ApiResponse = {
  message: string
  code: number
  body: string
}
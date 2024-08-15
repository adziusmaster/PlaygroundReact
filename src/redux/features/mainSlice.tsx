import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GlobalError, GlobalSuccess, StateLoader } from "../stateTypes"

interface MainState {
  accessToken: string
  stateLoader: StateLoader
  globalError: GlobalError
  globalSuccess: GlobalSuccess
}

const initialState: MainState = {
  accessToken: "",
  stateLoader: {
    isLoading: false
  },
  globalError: {
    hasError: false,
    errorMessage: ""
  },
  globalSuccess: {
    hasSuccess: false,
    successMessage: ""
  }
}

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setStateLoader: (state, action: PayloadAction<StateLoader>) => {
      state.stateLoader = action.payload
    },
    setGlobalError: (state, action: PayloadAction<GlobalError>) => {
      state.globalError = action.payload
    },
    setGlobalSuccess: (state, action: PayloadAction<GlobalSuccess>) => {
      state.globalSuccess = action.payload
    },
  }
})

export const {
  setAccessToken,
  setStateLoader,
  setGlobalError,
  setGlobalSuccess
} = MainSlice.actions
export default MainSlice.reducer


import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GlobalError, StateLoader } from "../stateTypes"

interface SimpleFormState {
  name: string
  email: string
}

const initialState: SimpleFormState = {
  name: "",
  email: ""
}

export const SimpleFormSlice = createSlice({
  name: "simpleForm",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  }
})

export const {
  setName,
  setEmail,
} = SimpleFormSlice.actions
export default SimpleFormSlice.reducer


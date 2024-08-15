import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { MainSlice } from "./features/mainSlice";
import { SimpleFormSlice } from "./features/simpleFormSlice";



export const store = configureStore({
    reducer: {
        main: MainSlice.reducer,
        simpleForm: SimpleFormSlice.reducer
    },
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
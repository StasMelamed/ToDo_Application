import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import todolist from "../utils/todoSlice";


 let preloadedState = JSON.parse(localStorage.getItem('todos') || '[]');

export const store = configureStore({
        reducer:{
                todolist
        },
        preloadedState
})


store.subscribe(()=>localStorage.setItem('todos', JSON.stringify(store.getState())));


export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import React, {useEffect, useState} from 'react';
import './App.css';

import {Navigate, Route, Routes} from "react-router-dom";
import {useAppSelector} from "./store/store";
import Start from "./components/Start";


function App() {


    return(

        <>
        <Start/>
        </>
    )

}
export default App;

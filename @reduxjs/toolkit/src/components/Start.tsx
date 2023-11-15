import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store";
import {goStart,unSet} from "../utils/userSlice";
import Template from "./Template";

const Start = () => {

    const userStyle = useAppSelector(state => state.user.style);
    const userName = useAppSelector(state => state.user.userName);


    const [name,setName] = useState('');

    const dispatch = useAppDispatch();
    const action = () =>{

        dispatch(goStart(name));
    }
const action2 = ()=>{
        dispatch(unSet());
}
    const style = userStyle;

    if(!userName) {
        return (
            <div className={'inner col-4'}>
                <div className={'row justify-content-center center'}><h2>Your Name?</h2></div>
                <div className={'row justify-content-center'}><input className={'col-10'} type={'text'} value={name} onChange={(e) => setName(e.target.value.trim())}/></div>
                <div className={'row justify-content-center m-5'}>
                    <button onClick={action} className={`btn col-12 ${style}`}>Does It Work?</button>
                </div>
            </div>
        )
    };

    return (
        <div className={'inner col-4'}>
            <div className={'row justify-content-center center'}><h2>Hello dear {userName}!</h2></div>

            <div className={'row justify-content-center m-5'}>
                <button onClick={action2} className={`btn col-12 ${style}`}>It Works!</button>
            </div>
        </div>
    )
};

export default Template(Start);
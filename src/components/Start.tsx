import React, {useState} from 'react';
import Main from "./Main";
import {iconSun} from '../utils/constants';
import {iconMoon} from "../utils/constants";


const Start = () => {

    const [theme, setTheme] = useState('template-light');

    const [iconTheme, setIcontheme] = useState(iconSun);

    const userScreen = window.screen.width;

    const changeTheme = () => {

        theme == 'template-light' ? setTheme('template-dark') : setTheme('template-light');
        iconTheme == iconSun ? setIcontheme(iconMoon) : setIcontheme(iconSun);

    }

    return (
        <div className={`${theme} outer row justify-content-center offset-auto vh-100`}>
            <div className={"outer2 column col-lg-4 col-sm-10 offset-auto mt-5"}>

                <div className={'d-flex justify-content-between inner2'}><h1 className={'head_h1'}>T O D O</h1>
                    <div onClick={changeTheme} className={''}><img className={'iconTheme'} src={iconTheme}/></div>
                </div>

                {

                  <Main userScreen={userScreen} theme={theme}/>
                }


                <div className={'bottom'}>Drag and drop to reorder list</div>

            </div>

        </div>
    )
};

export default Start;
import React from 'react';

const Template = (Component:any) =>(props:any)=> {
    return (
        <div className={'template outer row justify-content-center vh-100'}>
            <Component {...props}/>
        </div>
    );
};

export default Template;
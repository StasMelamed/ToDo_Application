 import React from 'react';

const FooterMobile = ({theme,left,clearCompleted,getAll,getActive,getCompleted}:any) => {
    return (
        <>

    <div className={`todoItem ${theme} mob-bottom bottom-1 col-12 d-flex justify-content-between`}>


        <li className={'col-4'}>Items left: {left}</li>
        <li onClick={clearCompleted}>Clear completed</li>

    </div>
    <div className={`todoItem ${theme} mob-bottom bottom-2 col-12 d-flex justify-content-between`}>
        <li onClick={getAll}>All</li>
        <li onClick={getActive}>Active</li>
        <li onClick={getCompleted}>Completed</li>



    </div>



</>
    );
};

export default FooterMobile;
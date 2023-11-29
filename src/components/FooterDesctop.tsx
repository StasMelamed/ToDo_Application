import React from 'react';

const FooterDesctop = ({theme,left,clearCompleted,getAll,getActive,getCompleted}:any) => {
    return (
        <div className={`footer ${theme} col-12 d-flex`}>


            <li className={'col-4'}>Items left: {left}</li>
            <li onClick={getAll}>All</li>
            <li onClick={getActive}>Active</li>
            <li onClick={getCompleted}>Completed</li>
            <li onClick={clearCompleted}>Clear completed</li>


        </div>
    );
};

export default FooterDesctop;
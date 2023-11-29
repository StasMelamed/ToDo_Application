import React, {useEffect, useState} from 'react';
import {iconCheck, iCross} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../store/store";
import {reRender} from "../utils/todoSlice";

interface Props {
    index: number,
    content: any,
    active: number,
    onDragLeave: (event: any) => void,
    onDrop: (event: any) => void,
    onDragOver: (event: any) => void,
    onDragStart: (event: any) => void,
    id: number,
    theme: string


}

const Todo = ({onDragLeave, onDrop, onDragOver, onDragStart, index, content, active, id, theme}: Props) => {


    const todoList = useAppSelector(state => state.todolist);

    const iconStyle = content.checked ? 'itemIconChecked' : '';

    const iconCheckedStyle = content.checked ? 'visible' : '';
    const checkedTodo = content.checked ? 'checked' : '';
    const check = content.checked ? true : false;


    let style = "todoItem col-12";

    if (index == 0) {
        style = "todoItem item1 col-12";
    }

    let notVisible = 'notDisplayed';

    if (content.checked && active == 2) {
        notVisible = '';
    }
    if (!content.checked && active == 1) {
        notVisible = '';
    }
    if (active == 0) {
        notVisible = '';
    }

    const dispatch = useAppDispatch();


    const checked = () => {

        const todoList2 = [...todoList];
        if (content != null) {
            //@ts-ignore
            todoList2.splice(index, 1, {value: content.value, checked: !check});
            dispatch(reRender(todoList2));
        }


    }
    if (content.value != '') {
        return (
            <div className={`${style} ${checkedTodo} ${theme} ${notVisible}`} onClick={checked}
                 key={index}
                 data-position={index}
                // @ts-ignore
                 data-id={id}
                 draggable
                 onDragStart={onDragStart}
                 onDragOver={onDragOver}
                 onDrop={onDrop}
                 onDragLeave={onDragLeave}

            >

                <div className={`itemIcon ${iconStyle} ${theme}`}><img className={`itemIconImg ${iconCheckedStyle}`}
                                                                       src={iconCheck}/></div>
                <div className={'itemValue'}>
                    {
                        check ? <del>{content.value}</del> : content.value

                    }

                </div>
                <div className={`itemCross ${checkedTodo}`}><img className={``} src={iCross}/></div>

            </div>
        )
    }
};

export default Todo;
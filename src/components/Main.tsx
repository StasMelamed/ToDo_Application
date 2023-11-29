import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store";
import {addToDo, reRender} from "../utils/todoSlice";
import Todo from "./Todo";
import {iconCheck} from "../utils/constants";
import FooterDesctop from "./FooterDesctop";
import FooterMobile from "./FooterMobile";


const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
    id: ''

}

interface Props {
    theme: string,
    userScreen: number

}

const Main = ({theme, userScreen}: Props) => {

    const todolist = useAppSelector(state => state.todolist);
    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
    const [active, setActive] = useState(0);
    const [todo, setTodo] = useState('Create a new to do!');
    const [left,setLeft] = useState(0);
    const dispatch = useAppDispatch();


    //how many unchecked items left?---
useEffect(()=>{
    let arr = todolist.reduce((sum, item) =>
            // @ts-ignore
            item.checked != true ? sum + 1 : sum

        , 0);
    setLeft(arr);
},[todolist])



//----how many unchecked items left?
    const add = () => {
    if(todo!='') {
        dispatch(addToDo(todo));
    }
    }

    const startInput = () => {
        setTodo('');
    }
    const clearCompleted = () => {
        if (todolist.length > 0) {
            //@ts-ignore
            const newArr = todolist.filter(el => el.checked == false);
            dispatch(reRender(newArr));


        }

    }

    const getCompleted = () => {

        setActive(2);

    }

    const getAll = () => {
        setActive(0);
    }

    const getActive = () => {
        setActive(1);

    }

    //drag and drop

    // onDragStart fires when an element
    // starts being dragged
    const onDragStart = (event: any) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        const id = event.currentTarget.dataset.id;

        if(todo==''){
            return;
        }

        if (id == 'input') {
            setDragAndDrop({
                ...dragAndDrop,
                //@ts-ignore
                draggedFrom: -1,
                isDragging: true,
                //@ts-ignore
                originalOrder: todolist,
                id: id
            });
        } else {
            setDragAndDrop({
                ...dragAndDrop,
                //@ts-ignore
                draggedFrom: initialPosition,
                isDragging: true,
                //@ts-ignore
                originalOrder: todolist,
                id: ''
            })
        }
        ;


        // Note: this is only for Firefox.
        // Without it, the DnD won't work.
        // But we are not using it.
        event.dataTransfer.setData("text/html", '');
    }

    // onDragOver fires when an element being dragged
    // enters a droppable area.
    // In this case, any of the items on the list
    const onDragOver = (event: any) => {

        // in order for the onDrop
        // event to fire, we have
        // to cancel out this one
        event.preventDefault();
        if(todo==''){
            return;
        }


//@ts-ignore
        let newList = dragAndDrop.originalOrder;

        // index of the item being dragged
        //@ts-ignore
        const draggedFrom = dragAndDrop.id != 'input' ? dragAndDrop.draggedFrom : -1;

        // index of the droppable area being hovered
        const draggedTo = dragAndDrop.id == 'input' ? 0 : Number(event.currentTarget.dataset.position);
//@ts-ignore

        const itemDragged = dragAndDrop.id != 'input' ? newList[draggedFrom] : {value: todo, checked: false};


        const remainingItems = newList.filter((item: any, index: number) => index !== draggedFrom);
//@ts-ignore
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];
//@ts-ignore
        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                //@ts-ignore
                updatedOrder: newList,
                //@ts-ignore
                draggedTo: draggedTo
            })
        }

    }

    const onDragOver2 = (event: any) => {

        event.preventDefault();
        if(todo==''){
            return;
        }

    }

    const onDrop = (event: any) => {
        if(todo==''){
            return;
        }

        if (dragAndDrop.updatedOrder.length == 0) {
            dispatch(addToDo(todo));

        } else {
            dispatch(reRender(dragAndDrop.updatedOrder));
        }

        setDragAndDrop({
            ...dragAndDrop,
            //@ts-ignore
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    }

    const onDrop2 = (event: any) => {
        if(todo==''){
            return;
        }
        dispatch(addToDo(todo));

    }

    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            //@ts-ignore
            draggedTo: null
        });

    }

    //desktop
    return (


        <div className={'inner column droppable'}>

            {

                <div className={`todoItem col-12 todoInput ${theme}`}

                    // @ts-ignore
                     data-id={'input'}
                     draggable
                     onDragStart={onDragStart}
                     onDragOver={onDragOver}
                     onDrop={onDrop}
                     onDragLeave={onDragLeave}

                >

                    <div className={`itemIcon ${theme}`}><img className={'itemIconImg'} src={iconCheck}/></div>
                    <div className={'itemValue'}>

                        <input onFocus={startInput}
                               className={'d-flex col-12 jusify-content-start'} type={'text'} value={todo}
                            // @ts-ignore
                               onChange={(e) => setTodo(e.target.value)}/>
                    </div>

                </div>

            }


            <div className={`flex-column mt-5 todoField col-12 ${theme}`}>

                <div className={'todoItems'}>
                    {
                        // @ts-ignore
                        todolist.map((el, index) => {


                                // @ts-ignore
                                return <Todo key={index} id={''} onDragLeave={onDragLeave} onDrop={onDrop}
                                             onDragOver={onDragOver} onDragStart={onDragStart} index={index}
                                             content={el}
                                             active={active} theme={theme}


                                />
                            }
                        )
                    }


                </div>
                <div className={'noItems'}
                     onDrop={onDrop2}
                     onDragOver={onDragOver2}
                ></div>
            </div>
            {
                userScreen > 376 ?
                    <FooterDesctop clearCompleted={clearCompleted} getCompleted={getCompleted} getActive={getActive}
                                   getAll={getAll} left={left} theme={theme}/> :
                    <FooterMobile clearCompleted={clearCompleted} getCompleted={getCompleted} getActive={getActive}
                                  getAll={getAll} left={left} theme={theme}/>
            }


        </div>
    )


};

export default Main;
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import iconTrash from '../../asssets/img/trash.svg'
import emptyImageTodoList from '../../asssets/img/todo-empty-state.svg'

export default function TodoList({ setIsEdit, setModalDelete, setIdListTodo, setTitleListTodo, listTodo, setIsActive, updateListTodo, setModal, setTitleTodo, setPriorityTodo }) {

    const [idTodo, setIdTodo] = useState(null)
    const [active, setActive] = useState(1)
    const [priority, setPriority] = useState("")
    let idKesekianya = null;

    useEffect(() => {
        updateListTodo(idTodo, active, priority)

    }, [idTodo, active, priority])

    return (
        <>
            {listTodo.length > 0 ?
                listTodo.map((list) =>

                    <div className='content-item' data-cy="todo-item">
                        <div className='d-flex align-items-center form-check'>
                            <Form.Check
                                key={list.id}
                                data-cy="todo-item-checkbox"
                                type='checkbox'
                                defaultChecked={list.is_active === 0}
                                onChange={(e) => {
                                    if (e.target.checked && idKesekianya === idTodo) {
                                        setIdListTodo(list.id)
                                        setIsActive(0)
                                        setActive(0)
                                        setIdTodo(list.id)
                                        setPriority(list.priority)
                                    } else {
                                        setIdListTodo(list.id)
                                        setIdTodo(list.id)
                                        setIsActive(1)
                                        setActive(1)
                                        setPriority(list.priority)
                                    }
                                }}
                            />
                            <div
                                data-cy="todo-item-priority-indicator"
                                className={'label-indicator ' +
                                    (list.priority === 'very-high' ? 'very-high'
                                        : list.priority === "high" ? "high"
                                            : list.priority === "normal" ? "normal"
                                                : list.priority === "low" ? "low"
                                                    : 'very-low')
                                }
                            >
                            </div>
                            <span data-cy="todo-item-title" className={list.is_active === 0 ? "done" : ""}>{list.title}</span>
                            <div
                                data-cy="todo-item-edit-button"
                                className='icon-edit'
                                onClick={() => {
                                    setIsEdit(true)
                                    setModal(true)
                                    setIdListTodo(list.id)
                                    setTitleTodo(list.title)
                                    setPriorityTodo(list.priority)
                                }}
                            ></div>
                        </div>
                        <img
                            src={iconTrash}
                            alt="icon-sampah"
                            data-cy="todo-item-delete-button"
                            onClick={() => {
                                setModalDelete(true)
                                setIdListTodo(list.id)
                                setTitleListTodo(list.title)
                            }} />
                    </div>
                )
                :
                <img src={emptyImageTodoList} alt='empty' data-cy="todo-empty-state" />
            }
        </>
    )
}

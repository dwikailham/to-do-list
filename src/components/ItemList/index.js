import React from 'react'
import iconTrash from '../../asssets/img/trash.svg'
import { Link } from "react-router-dom";
import { showFormattedDate } from '../../utils'
import emptyStateImage from "../../asssets/img/activity-empty-state.svg"


export default function ItemList({ todolist, setModal, setIdTodo, setTitleTodo }) {
    return (
        <div className='row'>
            {
                todolist.length > 0 ?
                    todolist.map((todo) =>
                        <div className='col-3'>
                            <div className='activity-card' data-cy="activity-item">
                                <Link to={`/detail/${todo.id}`}>
                                    <div
                                        className='activity-title'
                                    >
                                        <h3 data-cy="activity-item-title">{todo.title}</h3>
                                    </div>
                                </Link>
                                <div className='activity-footer'>
                                    <span data-cy="activity-item-date">{showFormattedDate(todo.created_at)}</span>
                                    <button
                                        onClick={() => {
                                            setModal(true);
                                            setIdTodo(todo.id)
                                            setTitleTodo(todo.title)
                                        }}
                                        data-cy="activity-item-delete-button">
                                        <img src={iconTrash} alt="icon-sampah" data-cy="activity-item-delete-button" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <img data-cy="activity-empty-state" src={emptyStateImage} alt="empty" />
            }
        </div>
    )
}

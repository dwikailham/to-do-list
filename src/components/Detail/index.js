import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from 'antd'
import Dropdown from 'react-bootstrap/Dropdown';
import Header from '../Header'
import TodoList from '../TodoList'
import Button from 'react-bootstrap/Button';
import alertImg from '../../asssets/img/icon-delete.svg'
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import sorting from '../../asssets/img/tabler_arrows-sort.svg';

export default function Detail(props) {
    const [openModalInformation, setModalInformation] = useState(false)
    const [detailTodo, setDetailTodo] = useState([]);
    const [listTodo, setListTodo] = useState([])
    const [openModal, setModal] = useState(false)
    const [openModalDelete, setModalDelete] = useState(false)
    const [titleTodo, setTitleTodo] = useState("")
    const [idListTodo, setIdListTodo] = useState(null)
    const [titleListTodo, setTitleListTodo] = useState("")
    const [priorityTodo, setPriorityTodo] = useState("very-high")
    const [loading, setLoading] = useState(false)
    const [is_active, setIsActive] = useState(1)
    const [clickedTitle, setClickedTitle] = useState(true)
    const [isEdit, setIsEdit] = useState(false)

    let { id } = useParams();

    function openModalVisible() {
        setModal(true)
    }

    function getDetail(id) {
        setLoading(true)
        axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
            .then((res) => {
                setLoading(false)
                setDetailTodo(res.data)
                setListTodo(res.data.todo_items)
            }).catch((err) => {

            })
    }

    function postTitleTodo() {
        let request = {
            activity_group_id: id,
            priority: priorityTodo,
            title: titleTodo
        }
        axios.post("https://todo.api.devcode.gethired.id/todo-items", request)
            .then((res) => {
                setPriorityTodo("")
                setTitleTodo("")
                getDetail(id)
                setModal(false)
            }).catch((err) => {
            })
    }

    function updateDetailTitle(id) {
        let request = { title: detailTodo.title }
        axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, request)
            .then((res) => {
                getDetail(id)
            }).catch((err) => {

            })
    }

    function handleDelete(idListTodo) {
        axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${idListTodo}`).then((result) => {
            setModalDelete(false);
            setModalInformation(true)
            getDetail(id)
        }).catch((err) => {

        })
    }

    function latest() {
        const latest = [...listTodo].sort((a, b) => b.id - a.id)
        setListTodo(latest)
    }

    function oldest() {
        const oldest = [...listTodo].sort((a, b) => a.id - b.id)
        setListTodo(oldest)
    }

    function titleAscending() {
        const titleAscending = [...listTodo].sort((a, b) => a.title > b.title ? 1 : -1)
        setListTodo(titleAscending)
    }

    function titleDescending() {
        const titleDescending = [...listTodo].sort((a, b) => a.title > b.title ? -1 : 1)
        setListTodo(titleDescending)
    }

    function updateCheck(idListTodo, active, priority) {
        let request = {
            is_active: active,
            priority: priority,
        }
        axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${idListTodo}`, request)
            .then((res) => {
                getDetail(id)
            }).catch((err) => {

            })
    }

    function updateListTodo(idListTodo, active, priority, title) {
        let request = {
            title: title,
            is_active: active,
            priority: priority,
        }
        axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${idListTodo}`, request)
            .then((res) => {
                setModal(false)
                getDetail(id)
            }).catch((err) => {

            })
    }

    useEffect(() => {
        setClickedTitle(false)
        getDetail(id)
    }, [id])

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='todo-header'>
                    <div className='todo-title'>
                        <Link to='/'>
                            <div className='tood-back' data-cy="todo-back-button"></div>
                        </Link>
                        {
                            clickedTitle ?
                                (<Input
                                    autoFocus
                                    bordered={false}
                                    value={detailTodo.title}
                                    onChange={(e) => {
                                        setDetailTodo(p => ({
                                            ...p,
                                            title: e.target.value
                                        }))
                                    }}
                                    onBlur={() => {
                                        updateDetailTitle(id)
                                        setClickedTitle(false)
                                    }}
                                />)
                                :
                                (<h1 onClick={() => setClickedTitle(true)} data-cy="todo-title">{detailTodo.title}</h1>)
                        }
                        <div className='icon-edit-header' onClick={() => setClickedTitle(true)} data-cy="todo-title-edit-button"></div>

                    </div>
                    <div className='d-flex'>
                        {/* <button data-cy="todo-sort-button" type="button" id="dropdown-button-dark-example1" aria-expanded="true" class="btn-sort dropdown-toggle btn btn-secondary">
                            <div class="icon-sort"></div>
                        </button> */}
                        <Dropdown>
                            {/* <div data-cy="todo-sort-button"> */}
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className='btn-sort' data-cy="todo-sort-button">
                                <div className='icon-sort' data-cy="todo-sort-button"></div>
                            </Dropdown.Toggle>
                            {/* </div> */}
                            <Dropdown.Menu data-cy="sort-selection">
                                <Dropdown.Item data-cy="sort-selection" tabIndex="0" onClick={latest}>
                                    <div className='icon-latest' data-cy="sort-selection-icon"></div> <span data-cy="sort-selection-title"> Terbaru </span>
                                </Dropdown.Item>
                                <Dropdown.Item data-cy="sort-selection" tabIndex="0" onClick={oldest}>
                                    <div className='icon-oldest' data-cy="sort-selection-icon"></div> <span data-cy="sort-selection-title"> Terlama </span>
                                </Dropdown.Item>
                                <Dropdown.Item data-cy="sort-selection" tabIndex="0" onClick={titleAscending}>
                                    <div className='icon-a-z' data-cy="sort-selection-icon"></div> <span data-cy="sort-selection-title"> A - Z </span>
                                </Dropdown.Item>
                                <Dropdown.Item data-cy="sort-selection" tabIndex="0" onClick={titleDescending}>
                                    <div className='icon-z-a' data-cy="sort-selection-icon"></div> <span data-cy="sort-selection-title"> Z - A </span>
                                </Dropdown.Item>
                                <Dropdown.Item data-cy="sort-selection" tabIndex="0" onClick={latest}>
                                    <div className='icon-unfinished' data-cy="sort-selection-icon"></div> <span data-cy="sort-selection-title">  Belum Selesai </span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            className='btn btn-primary'
                            onClick={() => {
                                setIsEdit(false)
                                setTitleTodo("")
                                setPriorityTodo("very-high")
                                openModalVisible()
                            }}
                            data-cy="todo-add-button"
                        >+Tambah
                        </Button>
                    </div>
                </div>
                <div className='detail-content'>
                    {loading ?
                        (<Spinner animation="border" variant="primary" />)
                        :
                        (<TodoList
                            setListTodo={setListTodo}
                            setModalDelete={setModalDelete}
                            setIdListTodo={setIdListTodo}
                            setTitleListTodo={setTitleListTodo}
                            setTitleTodo={setTitleTodo}
                            setPriorityTodo={setPriorityTodo}
                            listTodo={listTodo}
                            setIsActive={setIsActive}
                            updateListTodo={updateCheck}
                            is_active={is_active}
                            idListTodo={idListTodo}
                            setIsEdit={setIsEdit}
                            setModal={setModal}
                        />)
                    }

                </div>
            </div>
            <Modal
                show={openModal}
                onHide={() => setModal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
                data-cy="modal-add"
            >
                <Modal.Header>
                    {isEdit ? (<Modal.Title> Edit List Item</Modal.Title>) : (<Modal.Title data-cy="modal-add-title"> Tambah List Item</Modal.Title>)}
                    <div className='icon-close' data-cy="modal-add-close-button" onClick={() => setModal(false)}></div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label data-cy="modal-add-name-title">NAMA LIST ITEM</Form.Label>
                            <input
                                type="text"
                                placeholder="Tambahkan Activity"
                                onChange={(e) => {
                                    setTitleTodo(e.target.value)
                                }}
                                value={titleTodo}
                                data-cy="modal-add-name-input"
                                className='form-control'
                            />
                            {/* <div data-cy="modal-add-name-input">
                                <Form.Control
                                    type="text"
                                    placeholder="Tambahkan Activity"
                                    onChange={(e) => {
                                        setTitleTodo(e.target.value)
                                    }}
                                    value={titleTodo}
                                    data-cy="modal-add-name-input"
                                />
                            </div> */}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label data-cy="modal-add-priority-title">PRIORITY</Form.Label>
                            {/* <div data-cy="modal-add-priority-item"> */}

                            {/* <div data-cy="modal-add-priority-dropdown"> */}

                            <select
                                className='form-select'
                                data-cy="modal-add-priority-dropdown"
                                value={priorityTodo}
                                onChange={(e) => { setPriorityTodo(e.target.value) }}

                            >
                                <option onChange={(e) => { setPriorityTodo(e.target.value) }} value="very-high"><img src={sorting} alt="uhuy" />Very High</option>
                                <option onChange={(e) => { setPriorityTodo(e.target.value) }} value="high">High</option>
                                <option onChange={(e) => { setPriorityTodo(e.target.value) }} value="normal">Medium</option>
                                <option onChange={(e) => { setPriorityTodo(e.target.value) }} value="low">Low</option>
                                <option onChange={(e) => { setPriorityTodo(e.target.value) }} value="very-low">Very Low</option>
                            </select>
                            {/* </div> */}
                            {/* <Form.Select
                                data-cy="modal-add-priority-dropdown"
                                value={priorityTodo}
                                onChange={(e) => { setPriorityTodo(e.target.value) }}
                            >
                                <option value="very-high"><img src={sorting} alt="uhuy" />Very High</option>
                                <option value="high">High</option>
                                <option value="normal">Medium</option>
                                <option value="low">Low</option>
                                <option value="very-low">Very Low</option>
                            </Form.Select> */}
                            {/* </div> */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        isEdit
                            ?
                            (<Button data-cy="modal-add-save-button" className='btn btn-primary' onClick={() => updateListTodo(idListTodo, is_active, priorityTodo, titleTodo)} disabled={titleTodo !== "" && priorityTodo !== "" ? false : true}>Simpan</Button>)
                            :
                            (<Button data-cy="modal-add-save-button" className='btn btn-primary' onClick={postTitleTodo} disabled={titleTodo !== "" && priorityTodo !== "" ? false : true} >Simpan</Button>)
                    }
                </Modal.Footer>
            </Modal>
            <Modal
                show={openModalDelete}
                onHide={() => setModalDelete(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='modal-delete'
                data-cy="modal-delete"
            >
                <Modal.Header>
                    <Modal.Title className='pt-4' id="contained-modal-title-vcenter pt-4 ">
                        <img src={alertImg} alt='img' />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin menghapus list item <strong>"{titleListTodo}"</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={() => setModalDelete(false)}>Batal</Button>
                    <Button data-cy="modal-delete-confirm-button" className='btn btn-danger' onClick={() => handleDelete(idListTodo)}>Hapus</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={openModalInformation}
                onHide={() => setModalInformation(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='modal-information modal-toast'
                data-cy="modal-information"
            >
                <Modal.Body>
                    <div className='icon-alert-sm' data-cy="modal-information-icon"></div>
                    <p data-cy="modal-information-title">
                        Activity berhasil dihapus
                    </p>
                </Modal.Body>
            </Modal>
        </div >
    )
}

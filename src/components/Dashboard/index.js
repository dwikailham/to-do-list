import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../Header'
import ItemList from '../ItemList';
import alertImg from '../../asssets/img/icon-delete.svg'

export default function Dashboard() {

    const [todo, setTodo] = useState([]);
    const [idTodo, setIdTodo] = useState("")
    const [titleTodo, setTitleTodo] = useState("")
    const [openModal, setModal] = useState(false)
    const [openModalInformation, setModalInformation] = useState(false)
    const [loading, setLoading] = useState(false)

    function addTodo() {
        let request = {
            title: "New Activity",
            email: "yoga+1@skyshi.io"
        }
        axios.post("https://todo.api.devcode.gethired.id/activity-groups/", request)
            .then((res) => {
                getTodo()
            }).catch((err) => {
                console.log("add todo 2", err)
            })
    }

    function getTodo() {
        setLoading(true)
        axios("https://todo.api.devcode.gethired.id/activity-groups?email=yoga%2B1%40skyshi.io")
            .then((res) => {
                setLoading(false)
                setTodo(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    function handleDelete(id) {
        axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`).then((result) => {
            setModal(false);
            setModalInformation(true)
            getTodo();
        }).catch((err) => {

        })
    }

    useEffect(() => {
        getTodo()
    }, [])

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='todo-header'>
                    <h1 data-cy="activity-title">Activity</h1>
                    <Button
                        className='btn btn-primary'
                        onClick={addTodo}
                        data-cy="activity-add-button"
                    >+ Tambah
                    </Button>
                    {/* <ButtonCustom
                        onClick={addTodo}
                    /> */}
                </div>
                <div className='dashboard-content'>
                    {loading
                        ?
                        (
                            <div style={{ textAlign: "center" }}>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        )
                        :
                        (<ItemList
                            todolist={todo}
                            setModal={setModal}
                            setIdTodo={setIdTodo}
                            setTitleTodo={setTitleTodo}
                        />)}

                </div>
            </div>
            <Modal
                show={openModal}
                onHide={() => setModal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='modal-delete'
                data-cy="modal-delete"
            >
                <Modal.Header>
                    <Modal.Title className='pt-4' id="contained-modal-title-vcenter pt-4 ">
                        <img src={alertImg} alt='img' data-cy="modal-delete-icon" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p data-cy="modal-delete-title">
                        Apakah anda yakin menghapus activity <strong>"{titleTodo}"</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={() => setModal(false)} data-cy="modal-delete-cancel-button">Batal</Button>
                    <Button className='btn btn-danger' onClick={() => handleDelete(idTodo)} data-cy="modal-delete-confirm-button">Hapus</Button>
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
        </div>
    )
}

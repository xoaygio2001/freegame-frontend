import React, { Component } from "react";

import { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';

import './AddUserModal.scss'

import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


import { createNewAccount } from '../../../services/userService'


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class AddUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            getAllTagGame: [],
            username: '',
            password: '',

            arrRole: [],
            selectRole: 'null',
        }
    }

    async componentDidMount() {
        this.props.getAllTagGame()


    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.role !== this.props.role) {
            this.setState({
                arrRole: this.props.role
            })
        }
    }

    handleGoHome = () => {
        this.props.history('/')
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handleChangeSelectGameInfor = (target, type) => {
        switch (type) {


            case 'ROLE':
                this.setState({
                    selectRole: target.value
                })
                break;


        }
    }

    handleSignUp = async () => {
        let { username, password, selectRole } = this.state
        if (username && password && selectRole != 'null') {
                await this.props.CreateNewAccount({
                    username: username,
                    password: password,
                    roleId: selectRole
                })

                this.setState({
                    username: '',
                    password: '',
                })

        } else {
            toast.warning('Vui lòng điền đầy đủ thông tin!')
        }
    }

    render() {

        let { setShow, handlePopupSiginSignup } = this.props
        let { username, password, password2, arrLanguage, arrRole } = this.state



        return (
            <Modal className="AddUserModal" show={setShow} onHide={() => handlePopupSiginSignup(false)}>
                <Modal.Header className="modal-header">
                    <div class="logo"></div>
                    <Modal.Title>Đăng nhập vào Game Chùa</Modal.Title>
                    <i onClick={() => handlePopupSiginSignup(false)} class="fas fa-times close"></i>
                </Modal.Header  >
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 input-infor" >
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tài khoản"
                                autoFocus
                                value={username}
                                onChange={(e) => this.handleOnChangeText(e, 'username')}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 input-infor">
                            <Form.Label>Mặt khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mặt khẩu"
                                value={password}
                                onChange={(e) => this.handleOnChangeText(e, 'password')}
                            />
                        </Form.Group>


                     


                        <Form.Group className="mb-3 input-infor">
                            <Form.Label className="label">Phân loại</Form.Label>
                            <Form.Select
                                onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'ROLE')}
                                aria-label="Default select example">
                                <option value={'null'} >Open this select menu</option>
                                {arrRole && arrRole.length > 0 &&
                                    arrRole.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{item.value}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 access-login">
                            <div onClick={() => this.handleSignUp()} className="btn-login">Thêm</div>
                        </Form.Group>

                        <Form.Group

                            className="mb-3 otherLogin"

                        >
                            <div>
                                <Form.Label>Đăng ký bằng cách khác</Form.Label>
                                <div className="logos">
                                    <div class="logo-g"></div>
                                    <div class="logo-f"></div>
                                </div>
                            </div>

                        </Form.Group>
                    </Form>
                </Modal.Body>



            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        allTagGame: state.allTagGame,
        role: state.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id)),
        getAllTagGame: () => dispatch(Action.getAllTagGameAction()),
        CreateNewAccount: (data) => dispatch(Action.createNewAccountAction(data)),
        getAllCodeRedux: (type) => dispatch(Action.getAllCodeAction(type)),


    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(AddUserModal));
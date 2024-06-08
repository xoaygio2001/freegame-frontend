import React, { Component } from "react";

import { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';

import './ChangePasswordModal.scss'

import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


import { createNewAccount } from '../../../services/userService'


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class ChangePasswordModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            getAllTagGame: [],
            oldPassword: '',
            password: '',
            password2: ''
        }
    }

    async componentDidMount() {
        this.props.getAllTagGame()


    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.setShow !== this.props.setShow) {
        //     this.setState({
        //         setShow: this.props.setShow
        //     })
        // }

        // if (prevProps.setShow !== this.props.setShow) {
        //     this.setState({
        //         setShow: this.props.setShow
        //     })
        // }
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

    handleSignUp = async () => {
        let { oldPassword, password, password2 } = this.state
        if (oldPassword && password && password2) {
            if (password === password2) {
                await this.props.ChangePasswordAccount({
                    username: this.props.userLogin.username,
                    password: oldPassword,
                    newPassword: password,
                })

                this.setState({
                    oldPassword: '',
                    password: '',
                    password2: ''            
                })
            } else {
                toast.warning("Mật khẩu mới không trùng nhau!")
                this.setState({
                    password: '',
                    password2: ''       
                })
            }

        } else {
            toast.warning('Vui lòng điền đầy đủ thông tin!')
        }
    }

    doSomething = (e) => {
        if (e.keyCode === 13) {
            this.handleSignUp();
        }
    }

    render() {

        let { setShow, handlePopupSiginSignup } = this.props
        let { oldPassword, password, password2 } = this.state

        return (
            <Modal className="ChangePasswordModal" show={setShow} onHide={() => handlePopupSiginSignup(false)}>
                <Modal.Header className="modal-header">
                    <div class="logo"></div>
                    <Modal.Title>Thay đổi mặt khẩu</Modal.Title>
                    <i onClick={() => handlePopupSiginSignup(false)} class="fas fa-times close"></i>
                </Modal.Header  >
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 input-infor" >
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control
                            onKeyDown={(e) => this.doSomething(e)}
                                type="text"
                                placeholder="Mật khẩu cũ"
                                autoFocus
                                value={oldPassword}
                                onChange={(e) => this.handleOnChangeText(e, 'oldPassword')}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 input-infor">
                            <Form.Label>Mặt khẩu mới</Form.Label>
                            <Form.Control
                            onKeyDown={(e) => this.doSomething(e)}
                                type="password"
                                placeholder="Mặt khẩu mới"
                                value={password}
                                onChange={(e) => this.handleOnChangeText(e, 'password')}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 input-infor">
                            <Form.Label>Nhập lại mặt khẩu mới</Form.Label>
                            <Form.Control
                            onKeyDown={(e) => this.doSomething(e)}
                                type="password"
                                placeholder="Nhập lại mặt khẩu mới"
                                value={password2}
                                onChange={(e) => this.handleOnChangeText(e, 'password2')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 access-login">
                            <div onKeyDown={(e) => this.doSomething(e)} onClick={() => this.handleSignUp()} className="btn-login">Đổi mật khẩu</div>
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
        userLogin: state.userLogin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id)),
        getAllTagGame: () => dispatch(Action.getAllTagGameAction()),
        CreateNewAccount: (data) => dispatch(Action.createNewAccountAction(data)),
        ChangePasswordAccount: (data) => dispatch(Action.ChangePasswordAccountAction(data)),
        

    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal));
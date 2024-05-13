import React, { Component } from "react";

import { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';

import './LoginModal.scss'

import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';



function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            getAllTagGame: [],
            username: '',
            password: '',
            rememberLogin: false
        }
    }

    async componentDidMount() {
        this.props.getAllTagGame()

    }

    handlePopupSiginSignup = (state) => {
        this.setState({
            setShow: state
        })
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

    handleOnChangeCheckBox = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.checked;
        this.setState({
            ...stateCopy
        })

    }

    handleSignUp = async () => {
        let { username, password, rememberLogin } = this.state
        if (username && password) {
            let res = await this.props.getLoginIntoSystem(username, password, rememberLogin)
            if (res && res.errCode === 0) {
                if (res.data.roleId == "R1") {
                    this.props.history('/admin')
                }

                window.location.reload()
                console.log('res ', res)

            } else {
                toast.warning('Thông tin tài khoản hoặc mật khẩu không chính xác')
            }

        } else {
            toast.warning('Vui lòng điền đầy đủ thông tin!')
        }
    }

    render() {

        let { username, password, rememberLogin } = this.state;
        let { setShow, handlePopupSiginSignup } = this.props


        return (
            <Modal className="LoginModal" show={setShow} onHide={() => handlePopupSiginSignup(false)}>
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
                            className="mb-3 input-infor"

                        >
                            <Form.Label>Mặt khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mặt khẩu"
                                value={password}
                                onChange={(e) => this.handleOnChangeText(e, 'password')}

                            />
                        </Form.Group>

                        <Form.Group className="mb-3 check">
                            <Form.Check
                                onChange={(e) => this.handleOnChangeCheckBox(e, 'rememberLogin')}
                                type="checkbox" label="Ghi nhớ đăng nhập" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 access-login"

                        >
                            <div onClick={() => this.handleSignUp()} className="btn-login">Đăng nhập</div>
                        </Form.Group>

                        <Form.Group

                            className="mb-3 otherLogin"

                        >
                            <div>
                                <Form.Label>Đăng nhập bằng cách khác</Form.Label>
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
        userLogin: state.userLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id)),
        getAllTagGame: () => dispatch(Action.getAllTagGameAction()),
        getLoginIntoSystem: (username, password, rememberLogin) => dispatch(Action.getLoginIntoSystemAction(username, password, rememberLogin)),


    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(LoginModal));
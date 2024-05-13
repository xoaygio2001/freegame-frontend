import React, { Component } from "react";

import { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';

import './SignUpModal.scss'

import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


import { createNewAccount } from '../../../services/userService'


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            getAllTagGame: [],
            username: '',
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
        let { username, password, password2 } = this.state
        if (username && password && password2) {
            if (password === password2) {
                await this.props.CreateNewAccount({
                    username: username,
                    password: password,
                    roleId: 'R2'
                })

                this.setState({
                    username: '',
                    password: '',
                    password2: ''            
                })
            } else {
                toast.warning("Mật khẩu không trùng khớp!")
                this.setState({
                    password: '',
                    password2: ''       
                })
            }

        } else {
            toast.warning('Vui lòng điền đầy đủ thông tin!')
        }
    }

    render() {

        let { setShow, handlePopupSiginSignup } = this.props
        let { username, password, password2 } = this.state

        return (
            <Modal className="SignUpModal" show={setShow} onHide={() => handlePopupSiginSignup(false)}>
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

                        <Form.Group
                            className="mb-3 input-infor">
                            <Form.Label>Nhập lại mặt khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập lại mặt khẩu"
                                value={password2}
                                onChange={(e) => this.handleOnChangeText(e, 'password2')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 access-login">
                            <div onClick={() => this.handleSignUp()} className="btn-login">Đăng ký</div>
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
        allTagGame: state.allTagGame
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id)),
        getAllTagGame: () => dispatch(Action.getAllTagGameAction()),
        CreateNewAccount: (data) => dispatch(Action.createNewAccountAction(data)),

    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(SignUpModal));
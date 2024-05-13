import React, { Component } from "react";

import './MangeUser.scss'

import Header from "../header-footer/Header";
import OutStandingGame from "../../client/home-page/OutStandingGame"
import HomeGame from "../../client/home-page/HomeGame"

import { Button, Form, Table } from 'react-bootstrap';

import { getAllCode, createNewGame } from '../../../services/userService';

import CommonUtils from "../../../utils/CommonUtils";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import AddUserModal from "./AddUserModal";

import moment from "moment";

import _ from 'lodash'
import { wait } from "@testing-library/user-event/dist/utils";


const mdParser = new MarkdownIt(/* Markdown-it options */);


class MangeUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            limit: 10,

            username: '',
            password: '',
            selectRole: 'null',
            arrRole: [],
            allAccount: [],

            setShowAddUser: false,
            activeEdit: null,
            accountEdit: {},

            currentPage: 1,
            allDataNumber: 0,
            limit: 10,


        }
    }


    async componentDidMount() {
        await this.props.getAllCodeRedux('ROLE')

        let { limit, currentPage } = this.state

        let res = await this.props.getAllAccountRedux(this.state.limit, currentPage)

        if (res && res.errCode === 0) {
            this.setState({
                allDataNumber: res.allDataNumber,
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allAccount !== this.props.allAccount) {
            this.setState({
                allAccount: this.props.allAccount
            })
        }

        if (prevProps.role !== this.props.role) {
            this.setState({
                arrRole: this.props.role
            })
        }



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

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }



    handlePopupSiginSignup = async (state) => {
        this.setState({
            setShowAddUser: state
        })
        await this.props.getAllAccountRedux(this.state.limit, this.state.currentPage)

    }

    handleDeleteAccount = async (username) => {
        await this.props.DeleteAccountRedux({ username: username })

        await this.props.getAllAccountRedux(this.state.limit, this.state.currentPage)
    }

    handleEditAccount = (data) => {
        this.setState({
            activeEdit: data.id,
            accountEdit: data
        })
    }


    handleChangeSelect = (e, type) => {
        let stateCopy = { ...this.state };
        stateCopy[type].roleId = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleSubmitChangeInfor = async () => {
        if (!_.isEmpty(this.state.accountEdit)) {
            await this.props.ChangeInforAccountRedux(this.state.accountEdit)
        }
        await this.props.getAllAccountRedux(this.state.limit, this.state.currentPage)

        this.setState({
            activeEdit: null,
            accountEdit: {},
        })

    }

    handleChangePageNumber = async (pageId) => {
        await this.props.getAllAccountRedux(this.state.limit, pageId)
        this.setState({
            currentPage: pageId
        })

    }




    render() {
        let { allAccount, activeEdit, arrRole, accountEdit,
            currentPage, allDataNumber, limit,
        } = this.state;

        currentPage = +currentPage;
        let maxPageNumber = Math.floor((allDataNumber / limit))

        console.log(maxPageNumber)

        let arrNumber = [];


        if (currentPage == 1) {
            arrNumber = [1, 2, 3]
        }
        if (currentPage == 2) {
            arrNumber = [1, 2, 3, 4]
        }
        if (currentPage == 3) {
            arrNumber = [1, 2, 3, 4, 5]
        }
        if (currentPage == 4) {
            arrNumber = [1, 2, 3, 4, 5, 6]
        }
        if (currentPage > 4) {
            arrNumber = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        }

        if (currentPage == maxPageNumber && maxPageNumber != 1) {
            arrNumber = [currentPage - 2, currentPage - 1, currentPage]
        }
        if (currentPage == maxPageNumber - 1 && maxPageNumber != 1 && maxPageNumber != 2) {
            arrNumber = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1]
        }
        if (currentPage == maxPageNumber - 2 && maxPageNumber != 1 && maxPageNumber != 2 && maxPageNumber != 3) {
            arrNumber = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        }
        if (currentPage == maxPageNumber - 3 && maxPageNumber != 1 && maxPageNumber != 2 && maxPageNumber != 3 && maxPageNumber != 4) {
            arrNumber = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3]
        }

        console.log('state: ', this.state)

        return (
            <div className="container">
                <div className="content-container">
                    <Header />
                    <div className="body">
                        <div className="title">Quản lý người dùng</div>
                        <div className="add-user">
                            <div onClick={() => this.handlePopupSiginSignup(true)} className="add"><i class="fas fa-plus"></i> Thêm mới</div>
                        </div>
                        <AddUserModal
                            setShow={this.state.setShowAddUser}
                            handlePopupSiginSignup={this.handlePopupSiginSignup}
                        />
                        <div className="content">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>ID</th>
                                        <th>Tài khoản</th>
                                        <th>Mật khẩu</th>
                                        <th>Phân loại</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày sửa lần cuối</th>
                                        <th>Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allAccount && allAccount.length > 0 &&
                                        allAccount.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <th>{item.id}</th>
                                                    <th>{item.username}</th>
                                                    <th>{item.password}</th>
                                                    <th>
                                                        {activeEdit == item.id ?
                                                            <select onChange={(e) => this.handleChangeSelect(e, 'accountEdit')}>
                                                                {arrRole && arrRole.length > 0 &&
                                                                    arrRole.map((item, index) => {
                                                                        return (
                                                                            <option selected={item.value == accountEdit.AllCode.value ? true : false} value={item.keyMap}>{item.value}</option>
                                                                        )
                                                                    })
                                                                }

                                                            </select> :
                                                            item.AllCode.value}
                                                    </th>
                                                    <th>{moment(item.createdAt).format('L')}</th>
                                                    <th>{moment(item.updatedAt).format('L')}</th>
                                                    <th>
                                                        {activeEdit == item.id ?
                                                            <i onClick={() => this.handleSubmitChangeInfor()} class="fas fa-check"></i>
                                                            :
                                                            <i onClick={() => this.handleEditAccount(item)} class="far fa-edit"></i>}


                                                        <i onClick={() => this.handleDeleteAccount(item.username)} class="fas fa-trash-alt"></i>
                                                    </th>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </Table>
                            <div className="pagination">
                                {currentPage != 1 &&
                                    <i onClick={() => this.handleChangePageNumber(currentPage - 1)} class="fas fa-chevron-left" />
                                }
                                {currentPage > 4 &&
                                    <div className="left">
                                        <div
                                            onClick={() => this.handleChangePageNumber(1)}
                                            className="min-data-number">
                                            1
                                        </div>
                                        <div className="three-dot">...</div>
                                    </div>
                                }


                                <div className="numbers">
                                    {arrNumber.length > 0 &&

                                        arrNumber.map((item, index) => {
                                            return (
                                                <div
                                                    onClick={() => this.handleChangePageNumber(item)}
                                                    className={item == currentPage ? 'number active' : 'number'}>
                                                    {item}
                                                </div>
                                            )
                                        })

                                    }

                                </div>

                                {currentPage < (maxPageNumber - 4) &&
                                    <div className="right">
                                        <div className="three-dot">...</div>
                                        <div
                                            onClick={() => this.handleChangePageNumber(maxPageNumber)}
                                            className="max-data-number">{maxPageNumber}</div>
                                    </div>
                                }

                                {currentPage != maxPageNumber &&
                                    <i onClick={() => this.handleChangePageNumber(currentPage + 1)} class="fas fa-chevron-right" />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="footer">
                    </div>
                </div>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allAccount: state.allAccount,
        role: state.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // deleteRedux: (user) => dispatch({type: 'HAHA', payload: user}),
        getAllCodeRedux: (type) => dispatch(Action.getAllCodeAction(type)),
        createNewAccount: (data) => dispatch(Action.createNewAccountAction(data)),
        DeleteAccountRedux: (data) => dispatch(Action.DeleteAccountAction(data)),
        getAllAccountRedux: (limit, pageNumber) => dispatch(Action.getAllAccountAction(limit, pageNumber)),
        ChangeInforAccountRedux: (data) => dispatch(Action.ChangeInforAccountAction(data)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MangeUser);
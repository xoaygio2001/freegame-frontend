import React, { Component } from "react";

import './Header.scss'

import { connect } from "react-redux";

import * as Action from '../../../store/actions';


import { useNavigate, useParams, useLocation } from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} location={useLocation()} params={useParams()} history={useNavigate()} />;
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            activeNavigate: ''
        }
    }

    async componentDidMount() {
        this.setState({
            activeNavigate: this.props.activeNavigate
        });

    }

    handleChangeNavigate = (type) => {
        this.props.changeNavigateRedux(type);

        switch (type) {
            case 'game':
                this.props.history('/admin/manage-game')
                break;
            case 'user':
                this.props.history('/admin/manage-user')
                break;

            case 'software':
                this.props.history('/admin/manage-software')
                break;


        }

    }

    handleLogOut = () => {
        this.props.LogoutAccount()
        this.props.history('/')
        window.location.reload()

    }

    render() {


        return (
            <div className="header-admin">
                <div className="navigate">
                    <div onClick={() => this.handleChangeNavigate('user')} className={this.state.activeNavigate == 'user' ? 'manage-user active' : 'manage-user'}>Quản Lý Người Dùng</div>
                    <div onClick={() => this.handleChangeNavigate('game')} className={this.state.activeNavigate == 'game' ? 'manage-game active' : 'manage-game'}>Quản Lý Game</div>
                    <div onClick={() => this.handleChangeNavigate('software')} className={this.state.activeNavigate == 'software' ? 'manage-software active' : 'manage-software'}>Quản Lý Phần Mềm</div>
                </div>
                <div className="account">
                    <div className="hello">Xin Chào, Quản lý</div>
                    <div onClick={() => this.handleLogOut()} className="log-out">Đăng Xuất</div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        activeNavigate: state.activeNavigate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        LogoutAccount: () => dispatch(Action.LogoutAccountAction()),
        changeNavigateRedux: (type) => dispatch(Action.changeNavigateAction(type)),



    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(Header));
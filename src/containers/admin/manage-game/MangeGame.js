import React, { Component } from "react";

import './ManageGame.scss'

import Header from "../header-footer/Header";
import OutStandingGame from "../../client/home-page/OutStandingGame"
import HomeGame from "../../client/home-page/HomeGame"
import Footer from "../../client/header-footer/Footer";

import { Button, Form, Table } from 'react-bootstrap';

import { getAllCode, createNewGame } from '../../../services/userService';

import CommonUtils from "../../../utils/CommonUtils";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import moment from "moment";

import { useNavigate, useParams } from "react-router-dom";

const mdParser = new MarkdownIt(/* Markdown-it options */);


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}


class MangeGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            arrCategory: [],
            arrLanguage: [],
            arrPlayWith: [],
            arrOS: [],

            selectCategory: [],
            selectLanguage: 'null',
            selectPlayWith: 'null',
            selectOS: 'null',

            name: '',
            img: '',
            contentMarkdown: '',
            contentHTML: '',
            capacity: '',
            partNumber: '',
            playerNumber: '',
            ram: '',
            seri: '',
            url: '',

            allGame: [],
            limit: 5,
            pageNumber: 1,
            activeEdit: 'null',
            addGame: false,

            currentPage: 1,
            allDataNumber: 0,
            limit: 10,


        }
    }


    async componentDidMount() {
        this.props.getAllCodeRedux('CATEGORY')
        this.props.getAllCodeRedux('LANGUAGE')
        this.props.getAllCodeRedux('OS')
        this.props.getAllCodeRedux('PLAYWITH')

        let { limit, pageNumber, currentPage } = this.state

        let res = await this.props.getAllGameRedux(limit, currentPage)

        if (res && res.errCode === 0) {
            this.setState({
                allDataNumber: res.allDataNumber,
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Category !== this.props.Category) {
            this.setState({
                arrCategory: this.props.Category
            })
        }
        if (prevProps.Language !== this.props.Language) {
            this.setState({
                arrLanguage: this.props.Language
            })
        }
        if (prevProps.OS !== this.props.OS) {
            this.setState({
                arrOS: this.props.OS
            })
        }
        if (prevProps.PlayWith !== this.props.PlayWith) {
            this.setState({
                arrPlayWith: this.props.PlayWith
            })
        }

        if (prevProps.allGame !== this.props.allGame) {
            this.setState({
                allGame: this.props.allGame
            })
        }



    }


    handleChangeSelectGameInfor = (target, type) => {
        switch (type) {

            case 'LANGUAGE':
                this.setState({
                    selectLanguage: target.value
                })
                break;

            case 'OS':
                this.setState({
                    selectOS: target.value
                })
                break;

            case 'PLAYWITH':
                this.setState({
                    selectPlayWith: target.value
                })
                break;

            case 'CATEGORY':
                if (target.checked) {
                    let data = this.state.selectCategory.filter(item => {
                        return item == target.value
                    })
                    if (data.length == 0) {
                        let fakeData = this.state.selectCategory
                        fakeData.push(target.value)
                        this.setState({
                            selectCategory: fakeData
                        })
                    }
                } else {
                    let data = this.state.selectCategory.filter(item => {
                        return item != target.value
                    })
                    this.setState({
                        selectCategory: data
                    })
                }
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

    handleOnChangeImage = async (event) => {
        let data = event.target.files;

        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                img: base64
            })
        }
    }

    handleCreateNewGame = async () => {
        let {
            name, img, contentMarkdown, contentHTML, capacity,
            partNumber, playerNumber, ram, seri, selectCategory,
            selectLanguage, selectPlayWith, selectOS, url, point
        } = this.state

        if (
            !name || !img || !url || !contentMarkdown || !contentHTML || !capacity ||
            !partNumber || !playerNumber || !ram || !seri || !selectCategory ||
            !selectLanguage || !selectPlayWith || !selectOS || !point
        ) {
            console.log('thieu parameter')
        } else {
            let res = await this.props.createNewGameActionRedux({
                name: name,
                img: img,
                url: url,
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                capacity: capacity,
                partNumber: partNumber,
                playerNumber: playerNumber,
                ram: ram,
                seri: seri,
                tags: selectCategory,
                language: selectLanguage,
                playWith: selectPlayWith,
                win: selectOS,
                point: point
            })

            if (res && res.errCode == 0) {

                window.scrollTo(0, 0);

                setTimeout(() => {
                    this.props.history(`/admin/detail-game/${res.gameId}`)
                }, 1000);
            }

        }
    }


    handEditor = (e) => {
        this.setState({
            contentHTML: e.html,
            contentMarkdown: e.text
        })
    }

    handleDeleteGame = async (data) => {
        await this.props.DeleteGameRedux({ id: data.id })
        let { limit, pageNumber } = this.state
        await this.props.getAllGameRedux(limit, pageNumber)
    }

    handleEditGame = (data) => {
        this.props.history(`/admin/detail-game/${data.id}`)
    }

    ChangeAction = () => {
        this.setState({
            addGame: !this.state.addGame
        })
    }

    handleChangePageNumber = async (pageId) => {
        await this.props.getAllGameRedux(this.state.limit, pageId)
        this.setState({
            currentPage: pageId
        })

    }





    render() {


        let { arrCategory, arrLanguage, arrPlayWith, arrOS,
            language, win, playWith,
            contentMarkdown,
            game, disableEdit,
            categories,
            selectLanguage, selectOS, selectPlayWith, addGame
        } = this.state

        let { allGame, activeEdit } = this.state

        let { currentPage, allDataNumber, limit } = this.state

        currentPage = +currentPage;

        let maxPageNumber = Math.ceil(allDataNumber / limit);
        let arrNumber = [];

        const visiblePages = 5;

        if (allDataNumber > limit) {
            let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
            let endPage = Math.min(maxPageNumber, startPage + visiblePages - 1);

            if (endPage - startPage + 1 < visiblePages) {
                startPage = Math.max(1, endPage - visiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                arrNumber.push(i);
            }
        }


        return (
            <div className="container">
                <div className="content-container">
                    <Header />
                    <div className="body">
                        <div className="title">Quản lý Game</div>
                        <div className="add-user">
                            <div onClick={() => this.ChangeAction()} className="add"><i class="fas fa-plus"></i> Thêm mới</div>
                        </div>
                        <div className="content">
                            {addGame == false &&
                                <>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>ID</th>
                                                <th>Tên game</th>
                                                <th>Seri</th>
                                                <th>Điểm</th>
                                                <th>Ngày tạo</th>
                                                <th>Ngày sửa lần cuối</th>
                                                <th>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allGame && allGame.length > 0 &&
                                                allGame.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th>{index + 1}</th>
                                                            <th>{item.id}</th>
                                                            <th>{item.name}</th>
                                                            <th>{item.seri}</th>
                                                            <th>
                                                                {item.point}
                                                            </th>
                                                            <th>{moment(item.createdAt).format('L')}</th>
                                                            <th>{moment(item.updatedAt).format('L')}</th>
                                                            <th>
                                                                <i onClick={() => this.handleEditGame(item)} class="far fa-edit"></i>


                                                                <i onClick={() => this.handleDeleteGame(item)} class="fas fa-trash-alt"></i>
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

                                        {currentPage != maxPageNumber && arrNumber.length > 0 &&
                                            <i onClick={() => this.handleChangePageNumber(currentPage + 1)} class="fas fa-chevron-right" />
                                        }

                                    </div>
                                </>

                            }
                            {addGame == true &&
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Tên Game</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'name')}
                                            value={this.state.name}
                                            type="text" placeholder="Nhập Tên Game" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Tên Seri</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'seri')}
                                            value={this.state.seri}
                                            type="text" placeholder="Nhập Tên Seri" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Hình Đại Diện Cho Game</Form.Label>
                                        <Form.Control

                                            type="file"
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <div className="img"
                                            style={{ backgroundImage: `url(${this.state.img})` }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">{"Đường Dẫn Cho Game (URL)"}</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'url')}
                                            value={this.state.url}
                                            type="text" placeholder="Nhập Đường Dẫn URL" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Dung Lượng Game (GB)</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'capacity')}
                                            value={this.state.capacity}
                                            type="text" placeholder="Nhập Dung Lượng Game" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Số Lượng Part</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'partNumber')}
                                            value={this.state.partNumber}
                                            type="text" placeholder="Nhập Số Lượng Part" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Ram Yêu Cầu</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'ram')}
                                            value={this.state.ram}
                                            type="text" placeholder="Nhập Ram Yêu Cầu" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Số Lượng Người Chơi</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'playerNumber')}
                                            value={this.state.playerNumber}
                                            type="text" placeholder="Nhập Số Lượng Người Chơi" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Số Lượng Điểm</Form.Label>
                                        <Form.Control

                                            onChange={(event) => this.handleOnChangeText(event, 'point')}
                                            value={this.state.point}
                                            type="text" placeholder="Nhập Số Điểm" />
                                    </Form.Group>



                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Ngôn Ngữ</Form.Label>

                                        <Form.Select
                                            onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'LANGUAGE')}
                                            aria-label="Default select example">
                                            <option value="">Chọn đi nào</option>
                                            {arrLanguage && arrLanguage.length > 0 &&
                                                arrLanguage.map((item, index) => {
                                                    return (
                                                        <option selected={item.keyMap == selectLanguage ? true : false} key={index} value={item.keyMap}>{item.value}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>



                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Hệ Điều Hành</Form.Label>

                                        <Form.Select
                                            onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'OS')}
                                            aria-label="Default select example">
                                            <option value="">Chọn đi nào</option>
                                            {arrOS && arrOS.length > 0 &&
                                                arrOS.map((item, index) => {
                                                    return (
                                                        <option selected={item.keyMap == selectOS ? true : false} key={index} value={item.keyMap}>{item.value}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Chơi Bằng</Form.Label>

                                        <Form.Select
                                            onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'PLAYWITH')}
                                            aria-label="Default select example">
                                            <option value="">Chọn đi nào</option>
                                            {arrPlayWith && arrPlayWith.length > 0 &&
                                                arrPlayWith.map((item, index) => {
                                                    return (
                                                        <option selected={item.keyMap == selectPlayWith ? true : false} key={index} value={item.keyMap}>{item.value}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Thể Loại</Form.Label>
                                        <div>
                                            {this.state.addAction == true && arrCategory && arrCategory.length > 0 &&
                                                arrCategory.map((item, index) => {
                                                    return (
                                                        <Form.Check
                                                            onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'CATEGORY')}
                                                            className="label"
                                                            inline
                                                            key={index}
                                                            label={item.value}
                                                            value={item.keyMap}
                                                        />
                                                    )
                                                })
                                            }


                                            {arrCategory && arrCategory.length > 0 &&
                                                arrCategory.map((item, index) => {
                                                    return (
                                                        <Form.Check
                                                            onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'CATEGORY')}
                                                            className="label"
                                                            inline
                                                            key={index}
                                                            label={item.value}
                                                            value={item.keyMap}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>

                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="label">Phần Giới Thiệu</Form.Label>
                                        {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} /> */}


                                        <MdEditor
                                            style={{ height: '500px' }}
                                            renderHTML={text => mdParser.render(text)}
                                            value={contentMarkdown}
                                            onChange={(e) => this.handEditor(e)}
                                        />

                                    </Form.Group>

                                    <Button
                                        onClick={() => this.handleCreateNewGame()}
                                        variant="primary">
                                        Thêm mới
                                    </Button>


                                </Form>
                            }
                        </div>
                    </div>

                    <Footer />
                </div>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Category: state.category,
        Language: state.language,
        OS: state.os,
        PlayWith: state.playWith,
        allGame: state.allGame
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // deleteRedux: (user) => dispatch({type: 'HAHA', payload: user}),
        getAllCodeRedux: (type) => dispatch(Action.getAllCodeAction(type)),
        getAllGameRedux: (limit, pageNumber) => dispatch(Action.getAllGameAction(limit, pageNumber)),
        DeleteGameRedux: (data) => dispatch(Action.DeleteGameAction(data)),
        createNewGameActionRedux: (data) => dispatch(Action.createNewGameAction(data)),

    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(MangeGame));
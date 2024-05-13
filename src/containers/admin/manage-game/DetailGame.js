import React, { Component } from "react";

import './DetailGame.scss'

import Header from "../header-footer/Header";
import OutStandingGame from "../../client/home-page/OutStandingGame"
import HomeGame from "../../client/home-page/HomeGame"

import { Button, Form } from 'react-bootstrap';

import { getAllCode, createNewGame } from '../../../services/userService';

import CommonUtils from "../../../utils/CommonUtils";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { useNavigate, useParams } from "react-router-dom";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}


const mdParser = new MarkdownIt(/* Markdown-it options */);


class DetailGame extends Component {

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
            point: '',


            game: {},

            categories: [],

            language: '',
            win: '',
            playWith: '',

            disableEdit: true,

            addAction: false



        }
    }


    async componentDidMount() {
        this.props.getAllCodeRedux('CATEGORY')
        this.props.getAllCodeRedux('LANGUAGE')
        this.props.getAllCodeRedux('OS')
        this.props.getAllCodeRedux('PLAYWITH')


        this.props.getGameByIdRedux(this.props.params.id)

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

        if (prevProps.game !== this.props.game) {
            this.setState({
                game: this.props.game
            })

            this.setState({
                capacity: this.props.game.capacity,
                contentHTML: this.props.game.contentHTML,
                contentMarkdown: this.props.game.contentMarkdown,
                img: this.props.game.img,
                name: this.props.game.name,
                partNumber: this.props.game.partNumber,
                playerNumber: this.props.game.playerNumber,
                point: this.props.game.point,
                ram: this.props.game.ram,
                url: this.props.game.url,
                seri: this.props.game.seri,
                language: this.props.game.languageData.value,
                win: this.props.game.winData.value,
                playWith: this.props.game.playWithData.value,

                selectLanguage: this.props.game.languageData.keyMap,
                selectOS: this.props.game.winData.keyMap,
                selectPlayWith: this.props.game.playWithData.keyMap,

                categories: this.props.game.TagGames

            })
        }

        if (prevProps.params.id !== this.props.params.id) {
            this.setState({
                disableEdit: true,
                addAction: false
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

    handleChangeSelectGameInfor2 = (e, type) => {
        switch (type) {

            case 'CATEGORY':
                console.log('before: ', e.target.checked)
                e.target.checked = !e.target.checked
                console.log('after: ', e.target.checked)


                // if (target.checked) {
                //     let data = this.state.selectCategory.filter(item => {
                //         return item == target.value
                //     })

                //     if (data.length == 0) {
                //         let fakeData = this.state.selectCategory
                //         fakeData.push(target.value)
                //         this.setState({
                //             selectCategory: fakeData
                //         })
                //     }

                // } else {
                //     let data = this.state.selectCategory.filter(item => {
                //         return item != target.value
                //     })
                //     this.setState({
                //         selectCategory: data
                //     })
                // }
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

    handleSaveGame = async () => {
        let {
            name, img, contentMarkdown, contentHTML, capacity,
            partNumber, playerNumber, ram, seri, selectCategory,
            selectLanguage, selectPlayWith, selectOS, url,
            game, point
        } = this.state

        if (
            !name || !img || !url || !contentMarkdown || !contentHTML || !capacity ||
            !partNumber || !playerNumber || !ram || !seri || !selectCategory ||
            !selectLanguage || !selectPlayWith || !selectOS || !game.id || !point
        ) {
            console.log('thieu parameter')
        } else {
            await this.props.ChangeInforGameRedux({
                id: game.id,
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


    handleChangeAction = async () => {

        if (this.state.disableEdit == true) {
            let temp = this.state.categories.map((item, index) => {
                return item.tagId;
            })

            this.setState({
                selectCategory: temp
            })
        }

        this.setState({
            disableEdit: !this.state.disableEdit,
            addAction: false
        })

        await this.props.getGameByIdRedux(this.props.params.id)
    }


    ChangeAction = () => {
        this.setState({
            addAction: true,
            disableEdit: false,
            name: '',
            img: '',
            url: '',
            contentMarkdown: '',
            contentHTML: '',
            capacity: '',
            partNumber: '',
            playerNumber: '',
            ram: '',
            seri: '',
            tags: [],
            selectCategory: [],
            language: '',
            playWith: '',
            win: '',
            point: '',
            selectLanguage: '',
            selectOS: '',
            selectPlayWith: ''

        })
    }






    render() {
        let { arrCategory, arrLanguage, arrPlayWith, arrOS,
            language, win, playWith,
            contentMarkdown,
            game, disableEdit,
            categories,
            selectLanguage, selectOS, selectPlayWith
        } = this.state

        let arrCategoryWithoutSelect = [];

        if (categories.length > 0 && arrCategory.length > 0) {
            arrCategoryWithoutSelect = arrCategory.filter(
                (itemA) => !categories.some((itemB) => itemA.keyMap === itemB.tagId)
            );
        }

        let imgFather = 'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp';
        return (
            <div className="container">
                <div className="content-container">
                    <Header />
                    <div className="body">
                        <div className="title">

                            {this.state.addAction == true && 'Thêm game mới'}

                            {disableEdit == true && this.state.addAction == false && 'Xem thông tin Game'}

                            {disableEdit == false && this.state.addAction == false && 'Thay đổi thông tin Game'}



                        </div>
                        <div className="add-user">
                            <div onClick={() => this.ChangeAction()} className="add"><i class="fas fa-plus"></i> Thêm mới</div>
                        </div>
                        <div className="switch">
                            <div onClick={() => this.handleChangeAction()}>
                                <i class="fas fa-exchange-alt"></i>
                                {disableEdit == true ?
                                    <p>Chuyển sang chế độ sửa</p>
                                    :
                                    <p>Chuyển sang chế độ xem</p>}

                            </div>

                        </div>
                        <div className="content">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Tên Game</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'name')}
                                        value={this.state.name}
                                        type="text" placeholder="Nhập Tên Game" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Tên Seri</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'seri')}
                                        value={this.state.seri}
                                        type="text" placeholder="Nhập Tên Seri" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Hình Đại Diện Cho Game</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
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
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'url')}
                                        value={this.state.url}
                                        type="text" placeholder="Nhập Đường Dẫn URL" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Dung Lượng Game (GB)</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'capacity')}
                                        value={this.state.capacity}
                                        type="text" placeholder="Nhập Dung Lượng Game" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Số Lượng Part</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'partNumber')}
                                        value={this.state.partNumber}
                                        type="text" placeholder="Nhập Số Lượng Part" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Ram Yêu Cầu</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'ram')}
                                        value={this.state.ram}
                                        type="text" placeholder="Nhập Ram Yêu Cầu" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Số Lượng Người Chơi</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'playerNumber')}
                                        value={this.state.playerNumber}
                                        type="text" placeholder="Nhập Số Lượng Người Chơi" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Số Lượng Điểm</Form.Label>
                                    <Form.Control
                                        disabled={disableEdit}
                                        onChange={(event) => this.handleOnChangeText(event, 'point')}
                                        value={this.state.point}
                                        type="text" placeholder="Nhập Số Điểm" />
                                </Form.Group>



                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Ngôn Ngữ</Form.Label>
                                    {disableEdit == true ?
                                        <Form.Control
                                            disabled={disableEdit}
                                            value={language}
                                            type="text" placeholder="Nhập Số Điểm" />
                                        :
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

                                    }

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Hệ Điều Hành</Form.Label>
                                    {disableEdit == true ?
                                        <Form.Control
                                            disabled={disableEdit}
                                            value={win}
                                            type="text" placeholder="Nhập Số Điểm" />
                                        :
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
                                    }

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Chơi Bằng</Form.Label>
                                    {disableEdit == true ?
                                        <Form.Control
                                            disabled={disableEdit}
                                            value={playWith}
                                            type="text" placeholder="Nhập Số Điểm" />
                                        :
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
                                    }
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


                                        {this.state.addAction == false && categories && categories.length > 0 &&
                                            categories.map((item, index) => {
                                                return (
                                                    <Form.Check
                                                        disabled={disableEdit}
                                                        defaultChecked={true}
                                                        onChange={(e) => this.handleChangeSelectGameInfor(e.target, 'CATEGORY')}
                                                        className="label"
                                                        inline
                                                        key={index}
                                                        label={item.AllCode.value}
                                                        value={item.AllCode.keyMap}
                                                    />
                                                )
                                            })
                                        }

                                        {this.state.addAction == false && arrCategoryWithoutSelect && arrCategoryWithoutSelect.length > 0 &&
                                            arrCategoryWithoutSelect.map((item, index) => {
                                                return (
                                                    <Form.Check
                                                        disabled={disableEdit}
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

                                    {disableEdit == true ?
                                        <MdEditor
                                            style={{ height: '500px' }}
                                            renderHTML={text => mdParser.render(text)}

                                            value={contentMarkdown}
                                        // onChange={(e) => this.handEditor(e)}
                                        />
                                        :
                                        <MdEditor
                                            style={{ height: '500px' }}
                                            renderHTML={text => mdParser.render(text)}
                                            value={contentMarkdown}
                                            onChange={(e) => this.handEditor(e)}
                                        />
                                    }






                                </Form.Group>



                                {this.state.addAction == true ?

                                    <Button
                                        onClick={() => this.handleCreateNewGame()}
                                        variant="primary">
                                        Thêm mới
                                    </Button>

                                    :
                                    <Button
                                        disabled={disableEdit}
                                        onClick={() => this.handleSaveGame()}
                                        variant="primary">
                                        Lưu thông tin
                                    </Button>
                                }


                            </Form>
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
        Category: state.category,
        Language: state.language,
        OS: state.os,
        PlayWith: state.playWith,
        game: state.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // deleteRedux: (user) => dispatch({type: 'HAHA', payload: user}),
        getAllCodeRedux: (type) => dispatch(Action.getAllCodeAction(type)),
        getGameByIdRedux: (id) => dispatch(Action.getGameByIdAction(id)),
        ChangeInforGameRedux: (data) => dispatch(Action.ChangeInforGameAction(data)),
        createNewGameActionRedux: (data) => dispatch(Action.createNewGameAction(data)),



    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(DetailGame));
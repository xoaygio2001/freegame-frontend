import React, { Component } from "react";

import './Game.scss';

import { getAllGame } from '../../../services/userService'

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import _ from 'lodash'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}



class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameByCategory: [],
            categoryByTagId: {},
            limit: 20,
            currentPage: 1,
            allDataNumber: 0,
        }
    }

    async componentDidMount() {
        let { tagId, pageNumber } = this.props.params
        this.props.getCategoryByTagId(tagId)
        let res = await this.props.getGameByCategory(tagId, this.state.limit, pageNumber)
        if (res && res.errCode === 0) {
            this.setState({
                allDataNumber: res.allDataNumber,
                currentPage: pageNumber
            })
        }


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.gameByCategory !== this.props.gameByCategory) {
            this.setState({
                gameByCategory: this.props.gameByCategory
            })
        }

        if (prevProps.categoryByTagId !== this.props.categoryByTagId) {
            this.setState({
                categoryByTagId: this.props.categoryByTagId
            })
        }

        if (prevProps.params.tagId !== this.props.params.tagId) {
            this.props.getCategoryByTagId(this.props.params.tagId)
            let res = await this.props.getGameByCategory(this.props.params.tagId, this.state.limit, this.props.params.pageNumber)
            if (res && res.errCode === 0) {
                this.setState({
                    allDataNumber: res.allDataNumber,
                    currentPage: this.props.params.pageNumber
                })
            }

        }

        if (prevProps.params.pageNumber !== this.props.params.pageNumber) {
            this.props.getCategoryByTagId(this.props.params.tagId)
            let res = await this.props.getGameByCategory(this.props.params.tagId, this.state.limit, this.props.params.pageNumber)
            if (res && res.errCode === 0) {
                this.setState({
                    allDataNumber: res.allDataNumber,
                    currentPage: this.props.params.pageNumber
                })
            }
        }

    }


    handleFindGame = (id) => {

    }

    handleChangePageNumber = (tagId, pageId) => {
        this.props.history(`/fillter-by-category/${tagId}/${pageId}`)
        window.scrollTo(0, 0);
    }

    render() {
        let { gameByCategory, categoryByTagId, currentPage, allDataNumber, limit } = this.state
        currentPage = +currentPage
        let maxPageNumber = Math.floor((allDataNumber / limit))
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


        return (
            <div className="home-game">
                <div className="nav">
                    {categoryByTagId && categoryByTagId.value
                        ?
                        <div className="title">
                            {categoryByTagId.value}
                        </div>
                        :
                        <div className="title">
                            Không tồn tại
                        </div>
                    }

                    <div className="line" />
                </div>

                <Container >
                    <Row className="games">

                        {gameByCategory && gameByCategory.length > 0 &&
                            gameByCategory.map((item, index) => {
                                return (
                                    <Col xs={5} md={3} key={index} className="game">
                                        <div className="img"
                                            style={{ backgroundImage: `url(${item.img})` }}
                                        />
                                        <div className="name">{item.name}</div>

                                        <div className="tag">
                                            <i className="fas fa-tags"></i>
                                            <p>
                                                {item.TagGames && item.TagGames.length > 0 &&
                                                    item.TagGames.map((itemTag, indexMap) => {
                                                        return (
                                                            `${itemTag.AllCode.value},   `

                                                        )
                                                    }
                                                    )
                                                }
                                            </p>
                                        </div>
                                        <div className="see">
                                            <NavLink className="download" to={`/detail-game/${item.id}`}>
                                                TẢI GAME
                                            </NavLink>;
                                        </div>
                                    </Col>
                                )
                            })

                        }

                    </Row>
                </Container>

                <div className="pagination">
                    {currentPage != 1 &&
                        <i onClick={() => this.handleChangePageNumber(this.props.params.tagId, currentPage - 1)} class="fas fa-chevron-left" />
                    }
                    {currentPage > 4 &&
                        <div className="left">
                            <div
                                onClick={() => this.handleChangePageNumber(this.props.params.tagId, 1)}
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
                                        onClick={() => this.handleChangePageNumber(this.props.params.tagId, item)}
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
                                onClick={() => this.handleChangePageNumber(this.props.params.tagId, maxPageNumber)}
                                className="max-data-number">{maxPageNumber}</div>
                        </div>
                    }

                    {currentPage != maxPageNumber &&
                        <i onClick={() => this.handleChangePageNumber(this.props.params.tagId, currentPage + 1)} class="fas fa-chevron-right" />
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newGame: state.newGame,
        hotGame: state.hotGame,
        game18: state.game18,
        topGame18: state.topGame18,
        gameByCategory: state.gameByCategory,
        categoryByTagId: state.categoryByTagId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopGame: (limit, type) => dispatch(Action.getTopGameAction(limit, type)),
        getAllTopGame18: (limit) => dispatch(Action.getAllTopGame18Action(limit)),
        getGameByCategory: (tagId, limit, pageNumber) => dispatch(Action.getGameByCategoryAction(tagId, limit, pageNumber)),
        getCategoryByTagId: (tagId) => dispatch(Action.getCategoryByTagIdAction(tagId)),



    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(Game));
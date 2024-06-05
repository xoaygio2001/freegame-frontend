import React, { Component } from "react";

import './NewSoftware.scss';

import { getAllGame } from '../../../services/userService'

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class NewSoftware extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            newGame: [],
            hotGame: [],
            navGameActive: 'NEW',
            game18: [],
            allDataGameNumber: 70,
            currentPage: 1,
            gameNumber: 20,
            allSoftware: [],
        }
    }

    async componentDidMount() {
        this.props.getTopGame(this.state.gameNumber, 'NEW')
        this.props.getAllSoftwareRedux(8, this.state.currentPage);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newGame !== this.props.newGame) {
            this.setState({
                newGame: this.props.newGame
            })
        }

        if (prevProps.hotGame !== this.props.hotGame) {
            this.setState({
                hotGame: this.props.hotGame
            })
        }
        if (prevProps.game18 !== this.props.game18) {
            this.setState({
                game18: this.props.game18
            })
        }

        if (prevProps.allSoftware !== this.props.allSoftware) {
            this.setState({
                allSoftware: this.props.allSoftware
            })
        }

    }

    handleChangeNav = (type) => {
        if (type) {
            this.setState({
                navGameActive: type
            })
            this.props.getTopGame(this.state.gameNumber, type)
        }
    }


    handleFindGame = (id) => {

    }



    render() {
        let { newGame, hotGame, navGameActive, game18, allSoftware } = this.state
        let data = [];


        switch (navGameActive) {
            case 'NEW':
                data = newGame
                break;
            case 'HOT':
                data = hotGame
                break;
            case '18':
                data = game18
                break;

            default:
                break;
        }

        return (
            <div className="home-software">

                <div className="nav-2">
                    <span className="title-phan-mem-moi">PHẦN MỀM MỚI NHẤT</span>
                </div>

                <Container >
                    <Row className="games">

                        {allSoftware && allSoftware.length > 0 &&
                            allSoftware.map((item, index) => {
                                return (
                                    <Col xs={5} md={3} key={index} className="game">
                                        <div className="img"
                                            style={{ backgroundImage: `url(${item.img})` }}
                                        />
                                        <div className="name">{item.name}</div>

                                        <div className="see">
                                            <NavLink className="download" to={`/detail-game/${item.id}`}>
                                                <i class="fas fa-download"></i> <span>TẢI</span>
                                            </NavLink>;
                                        </div>
                                    </Col>
                                )
                            })

                        }

                    </Row>
                </Container>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newGame: state.newGame,
        hotGame: state.hotGame,
        game18: state.game18,
        allSoftware: state.allSoftware
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopGame: (limit, type, pageNumber) => dispatch(Action.getTopGameAction(limit, type, pageNumber)),
        getAllTopGame18: (limit) => dispatch(Action.getAllTopGame18Action(limit)),
        getAllSoftwareRedux: (limit, pageNumber) => dispatch(Action.getAllSoftwareAction(limit, pageNumber))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSoftware);
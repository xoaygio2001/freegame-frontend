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
            navGameActive: 'NEW',
            allDataGameNumber: 70,
            currentPage: 1,
            gameNumber: 8,
            allSoftware: [],
        }
    }

    async componentDidMount() {
        this.props.getAllSoftwareRedux(8, this.state.currentPage);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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

        let dataFake = [1, 2, 3, 4, 5, 6, 7, 8];


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

                {(allSoftware && allSoftware.length > 0) ?
                    <Container >
                        <Row className="games">
                            {
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
                    :
                    <Container >
                        <Row className="games">
                            {
                                dataFake.map(() => {
                                    return (
                                        <Col xs={5} md={3} className="game">

                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allSoftware: state.allSoftware
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSoftwareRedux: (limit, pageNumber) => dispatch(Action.getAllSoftwareAction(limit, pageNumber))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSoftware);
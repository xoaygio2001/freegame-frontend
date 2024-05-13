import React, { Component } from "react";

import './OutStandingGame.scss'

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { Carousel } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}


class OutStandingGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            outStandingGame: []
        }
    }

    async componentDidMount() {

        this.props.getTopGameRedux(5, 'OUTSTANDING')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.outStandingGame !== this.props.outStandingGame) {
            this.setState({
                outStandingGame: this.props.outStandingGame
            })
        }

    }

    handleClickImage = (id) => {
        this.props.history(`/detail-game/${id}`);
    }

    render() {
        let { outStandingGame } = this.state



        return (
            <div class="outstanding-game">
                <Carousel className="games">

                    {outStandingGame && outStandingGame.length > 0 &&
                        outStandingGame.map((item, index) => {
                            return (
                                <Carousel.Item onClick={() => this.handleClickImage(item.id)} key={index} className="game">
                                    <div className="img"
                                        style={{ backgroundImage: `url(${item.img})` }}
                                    />
                                    <Carousel.Caption>
                                        <p>{item.name}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    }

                </Carousel>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        outStandingGame: state.outStandingGame,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopGameRedux: (limit, type) => dispatch(Action.getTopGameAction(limit, type))
    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(OutStandingGame));


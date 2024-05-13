import React, { Component } from "react";

import './DetailGame.scss';

import Header from '../header-footer/Headerr';
import ImageGame from "./ImageGame";

import Detail from './Detail'
import IntroduceGame from './IntroduceGame'
import DowloadGame from './DowloadGame'

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import {getGameById} from '../../../services/userService';

import { useParams } from 'react-router-dom';

import _ from 'lodash'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class DetailGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailGame: {},
            game: {},
        }
    }

    async componentDidMount() {
        this.props.getGameById(this.props.params.id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.game !== this.props.game) {
            this.setState({
                game: this.props.game
            })
        }

        if (prevProps.params.id !== this.props.params.id) {
            this.props.getGameById(this.props.params.id)
        }

    }

    render() {
        let { game } = this.state

        return (
            <div class="container-detailgame">
                <div class="content-container">
                    <Header />
                    <div class="body">
                        <div class="left">
                            {!_.isEmpty(game) && game.img ? <ImageGame imgFather={game.img}/> : <ImageGame/>}

                            {!_.isEmpty(game) && <Detail gameFather={game}/>}


                            {!_.isEmpty(game) && <IntroduceGame gameFather={game}/>}

                            {!_.isEmpty(game) && <DowloadGame gameFather={game}/>}


                        </div>

                        <div class="right"></div>

                    </div>
                    <div class="footer"></div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id))
    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(DetailGame));

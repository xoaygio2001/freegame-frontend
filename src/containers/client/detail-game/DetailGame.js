import React, { Component } from "react";

import './DetailGame.scss';

import Header from '../header-footer/Headerr';
import ImageGame from "./ImageGame";

import Detail from './Detail'
import IntroduceGame from './IntroduceGame'
import DowloadGame from './DowloadGame'
import CommentGame from './CommentGame';
import BuyCopyright from "./BuyCopyright";
import SuggestGame from "./SuggestGame";
import Footer from "../header-footer/Footer";

import { connect } from "react-redux";

import * as Action from '../../../store/actions';

import { getGameById } from '../../../services/userService';

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
            suggestGame: [],
            commentGame: [],
            moreCommentNumber: 1,
            allDataNumber: 0
        }
    }

    async componentDidMount() {
        this.props.getGameById(this.props.params.id)
        this.props.getGameSuggest();
        let res = await this.props.getCommentGame(this.props.params.id, this.state.moreCommentNumber);

        if (res && res.errCode == 0) {
            this.setState({
                allDataNumber: res.allDataNumber
            })


        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.game !== this.props.game) {
            this.setState({
                game: this.props.game
            })
        }

        if (prevProps.commentGame !== this.props.commentGame) {
            this.setState({
                commentGame: this.props.commentGame
            })
        }

        if (prevProps.suggestGame !== this.props.suggestGame) {
            this.setState({
                suggestGame: this.props.suggestGame
            })
        }

        if (prevProps.params.id !== this.props.params.id) {
            this.props.getGameById(this.props.params.id)
        }

    }

    render() {
        let { game, suggestGame, commentGame, allDataNumber } = this.state


        return (
            <div class="container-detailgame">
                <div class="content-container">
                    <Header />
                    <div class="body">
                        <div class="left-detailgame">
                            {!_.isEmpty(game) && game.img ? <ImageGame imgFather={game.img} /> : <ImageGame />}

                            {!_.isEmpty(game) && <Detail gameFather={game} />}


                            {!_.isEmpty(game) && <IntroduceGame gameFather={game} />}

                            {!_.isEmpty(game) && <DowloadGame gameFather={game} />}

                            {!_.isEmpty(game) && <CommentGame commentGame={commentGame} allDataNumber={allDataNumber} />}


                        </div>

                        <div class="right-detailgame">

                            {!_.isEmpty(game) && <BuyCopyright gameFather={game} />}
                            {!_.isEmpty(suggestGame) && <SuggestGame suggestGame={suggestGame} />}

                        </div>

                    </div>
                    <Footer/>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        suggestGame: state.suggestGame,
        commentGame: state.commentGame,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGameById: (id) => dispatch(Action.getGameByIdAction(id)),
        getGameSuggest: () => dispatch(Action.getGameSuggestAction()),
        getCommentGame: (gameId, moreCommentNumber) => dispatch(Action.getCommentAction(gameId, moreCommentNumber)),
    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(DetailGame));

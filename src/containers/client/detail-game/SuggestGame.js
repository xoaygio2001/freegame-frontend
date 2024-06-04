import React, { Component } from "react";

import './SuggestGame.scss';

import moment from 'moment'

import { useNavigate, useParams } from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class SuggestGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: []
        }
    }

    async componentDidMount() {

    }

    handleChooseGame = (id) => {
        this.props.history(`/detail-game/${id}`);

    }

    render() {
        let { suggestGame } = this.props


        return (
            <div className="container-SuggestGame">
                <div className="head-SuggestGame">
                    GỢI Ý GAME CHO BẠN
                </div>
                <div className="body-SuggestGame">
                    <div className="box-item-SuggestGame">

                        {suggestGame && suggestGame.length > 0 &&
                            suggestGame.map((item, index) => {
                                return (
                                    <div onClick={() => this.handleChooseGame(item.id)} className="item-SuggestGame">
                                        <div className="left-body-SuggestGame">
                                            <div className="picture-SuggestGame" style={{ backgroundImage: `url(${item.img})` }}/>
                                        </div>
                                        <div className="right-body-SuggestGame">
                                            <div className="name-SuggestGame">
                                                {item.name}
                                            </div>
                                            <div className="date-SuggestGame">
                                                <i class="far fa-calendar-alt"></i> {moment(item.updatedAt).format('L')} (cập nhật)
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        }

                    </div>


                </div>
            </div>
        )
    }
}

export default withParams(SuggestGame);
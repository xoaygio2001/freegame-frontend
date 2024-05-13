import React, { Component } from "react";

import './DowloadGame.scss';

import moment from 'moment'

class ImageGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: []
        }
    }

    async componentDidMount() {

    }

    render() {
        let {gameFather} = this.props

        return (
            <div class="dowload-game">
            <div class="title">
                <div class="name">
                    <i class="fas fa-cloud-download-alt"></i>
                    LINK TẢI GAME {gameFather.name}
                </div>
                <div class="line"></div>
            </div>
            <div class="detail">
                <div class="link-vip">
                    <div class="name">{gameFather.name}</div>
                    <div class="date">{moment(gameFather.updatedAt).format('L')}</div>
                    <div class="down">
                        
                        <a href={gameFather.url} class="link">LINK VIP</a>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ImageGame;
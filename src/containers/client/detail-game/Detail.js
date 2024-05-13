import React, { Component } from "react";

import './Detail.scss';

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
        let { gameFather } = this.props


        return (
            <div class="detail-game">
                <div class="title">
                    <div class="name">
                        <i class="fa-solid fa-circle-info"></i>
                        CHI TIẾT GAME {gameFather.name}

                    </div>
                    <div class="line"></div>
                </div>
                <div class="detail">
                    <div class="left">
                        <div class="name">
                            <i class="far fa-sticky-note"></i>
                            Tên: {gameFather.name}
                        </div>
                        <div class="date">
                            <i class="far fa-calendar-alt"></i>

                            Ngày update: {moment(gameFather.updatedAt).format('L')}

                        </div>
                        <div class="tags">
                            <i class="fas fa-tags"></i>
                            Thể loại: {gameFather && gameFather.TagGames && gameFather.TagGames.length > 0 &&
                                gameFather.TagGames.map((item, index) => {
                                    return (
                                        <span key={index} class="tag">{item.AllCode.value}, </span>
                                    )
                                }
                                )
                            }

                        </div>

                        <div class="capacity">
                            <i class="fas fa-weight-hanging"></i>
                            Dung lượng: {gameFather.capacity} GB
                        </div>
                        <div class="part-number">
                            <i class="far fa-file-archive"></i>
                            Số Part: {gameFather.partNumber}
                        </div>
                    </div>
                    <div class="right">
                        <div class="ram">
                            <i class="fas fa-check-circle"></i>
                            Kích thước RAM: {gameFather.ram} GB
                        </div>
                        <div class="player-number">
                            <i class="fas fa-check-circle"></i>
                            Số người chơi: {gameFather == 1 ? 'Chơi đơn' : gameFather.playerNumber}
                            
                        </div>
                        <div class="language">
                            <i class="fas fa-check-circle"></i>
                            Ngôn ngữ: {gameFather.languageData.value}
                        </div>
                        <div class="win">
                            <i class="fas fa-check-circle"></i>
                            Hệ điều hành: {gameFather.winData.value}
                        </div>
                        <div class="play-with">
                            <i class="fas fa-check-circle"></i>
                            Chơi bằng: {gameFather.playWithData.value}
                        </div>
                        <div class="seri">
                            <i class="fas fa-check-circle"></i>
                            Seri game: {gameFather.seri}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageGame;
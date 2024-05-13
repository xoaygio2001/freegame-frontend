import React, { Component } from "react";

import './IntroduceGame.scss';

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
            <div class="introduce-game">
                <div class="title">
                    <div class="name">
                        <i class="fas fa-sun"></i>
                        GIỚI THIỆU GAME {gameFather.name}
                    </div>
                </div>
                <div class="detail">
                        <div className="content" dangerouslySetInnerHTML={{ __html: gameFather.contentHTML }}>

                        </div>
                </div>
            </div>
        )
    }
}

export default ImageGame;
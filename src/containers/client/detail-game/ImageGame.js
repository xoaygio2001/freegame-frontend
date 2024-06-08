import React, { Component } from "react";

import './ImageGame.scss';

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
        let { imgFather, nameGame } = this.props


        return (
            <div class="img-game">
                <div class="title">
                    <div class="name">
                        <i class="fas fa-images"></i> Ảnh game {nameGame}
                    </div>
                    <div class="line"></div>
                </div>
                {imgFather &&
                    <div className="img"
                        style={{ backgroundImage: `url(${imgFather})` }}
                    />}

            </div>
        )
    }
}

export default ImageGame;
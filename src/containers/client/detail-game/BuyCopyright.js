import React, { Component } from "react";

import './BuyCopyright.scss';

import moment from 'moment'

class BuyCopyright extends Component {

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
            <div className="container-BuyCopyright">
                <div className="head-BuyCopyright">
                    MUA GAME BẢN QUYỀN
                </div>
                <div className="body-BuyCopyright">
                    <div className="text-BuyCopyright">Nếu thấy game {gameFather.name} hay thì nhớ mua bản quyền game ủng hộ nhà phát triển các bạn nhé</div>
                    <div className="box-btn">
                        <a href={gameFather.copyright} type="button" class="btn btn-success btn-BuyCopyright">CLICK VÀO ĐÂY ĐỂ MUA BẢN QUYỀN</a>
                    </div>
                </div>


            </div>
            
        )
    }
}

export default BuyCopyright;
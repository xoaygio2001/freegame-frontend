import React, { Component } from "react";

import './Footer.scss'

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 508095751,
            online: 1050,
        }
    }

    async componentDidMount() {

        setInterval(() => {
            this.setState({
                view: this.state.view + 1
            })
        }, 600);

        setInterval(() => {
            this.setState({
                view: this.state.view + 1
            })
        }, 900);


        setInterval(() => {
            this.setState({
                view: this.state.view + 1
            })
        }, 1300);


        setInterval(() => {
            this.setState({
                view: this.state.view + 1
            })
        }, 1500);



        setInterval(() => {
            this.setState({
                online: this.state.online + 1
            })
        }, 400);


        setInterval(() => {
            this.setState({
                online: this.state.online + 1
            })
        }, 900);


        setInterval(() => {
            this.setState({
                online: this.state.online + 1
            })
        }, 1300);


        setInterval(() => {
            this.setState({
                online: this.state.online + 1
            })
        }, 1500);


        setInterval(() => {
            this.setState({
                online: this.state.online - 1
            })
        }, 900);


        setInterval(() => {
            this.setState({
                online: this.state.online - 1
            })
        }, 1300);


    }

    render() {


        return (
            <div class="footer">
                <div className="top">
                    <div className="left">
                        <div className="main">
                            <h1>GAME CHUA</h1>
                            <p>Cộng đòng chia sẽ những game chất lượng một cách miễn phí</p>
                            <h3>Liên hệ</h3>
                            <div>
                                <i class="fas fa-phone"></i>
                                <p>+84398671675</p>
                            </div>
                            <div>
                                <i class="fas fa-envelope"></i>
                                <p>xoaygio2001@gmail.com</p>

                            </div>
                            <div>
                                <i class="fab fa-facebook-f"></i>
                                <p>https://www.facebook.com/xoaygio2001</p>

                            </div>
                        </div>
                    </div>
                    <div className="mid"></div>
                    <div className="right">
                        <div className="main">
                            <div className="visit">
                                <div className="view">
                                    <div className="number">{this.state.view}</div>
                                    <div>lượt xem</div>
                                </div>
                                <div className="online">
                                    <div className="number">{this.state.online}</div>
                                    <div>online</div>
                                </div>
                            </div>

                            <div className="socia">
                                <h2>Mạng xã hội</h2>
                                <p>Theo dỗi mạng xã hội để tiếp cận thông tin mới nhất nhé</p>
                                <div className="socia-icon">
                                    <i class="fab fa-facebook-square"></i>
                                    <i class="fab fa-twitter-square"></i>
                                    <i class="fab fa-linkedin"></i>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="bottom">
                    Copyrights © 2023 - 2024. All rights reserved by Gamechua
                </div>
            </div >
        )
    }
}

export default Footer;
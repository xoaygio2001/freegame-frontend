import React, { Component } from "react";

import './CommentGame.scss';

import moment from 'moment'

class CommentGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: []
        }
    }

    async componentDidMount() {

    }

    render() {
        let { commentGame, allDataNumber } = this.props

        console.log('allDataNumber: ', allDataNumber)

        let commentLength = commentGame.length;

        return (
            <div class="comment-game" >
                <div class="title">
                    <div class="name">
                        Bình Luận
                    </div>
                </div>
                <div className="detail-2">
                    <div className="my-comment">
                        <div className="avatar"></div>
                        {/* <div className="img"
                            style={{ backgroundImage: `url(${imgFather})` }}
                        /> */}

                        <textarea class="form-control comment-box" id="exampleFormControlTextarea1" rows="3"></textarea>

                    </div>
                    <button type="button" class="btn btn-primary btn-post-comment">Đăng bình luận</button>
                    <div className="title-2">
                        <div class="title">
                            <div class="name">
                                {allDataNumber} Bình Luận
                            </div>
                            <select class="form-select" aria-label="Default select example ">
                                <option selected value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <div class="line"></div>
                        </div>

                        <div className="other-comment">
                            {commentGame && commentGame.length > 0 &&
                                commentGame.map((item, index) => {
                                    return (
                                        <div className="container-comment">
                                            <div className="main-comment">
                                                <div className="left">
                                                    <div className="avatar"></div>
                                                </div>
                                                <div className="right">
                                                    <div className="top-name">
                                                        <div className="name">{item.userData.username}</div>
                                                        <i class="far fa-clock"></i>
                                                        <div className="time">1 ngày trước</div>
                                                    </div>

                                                    <div className="content-comment">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="reply">
                                                <i class="fas fa-reply"></i>
                                                <div className="text">Trả lời</div>
                                            </div>

                                            {item.commentChild && item.commentChild.length > 0 &&
                                                item.commentChild.map((itemChild, indexChild) => {
                                                    return (
                                                        <>
                                                            <div className="child-comment">
                                                                <div className="left">
                                                                    <div className="avatar"></div>
                                                                </div>
                                                                <div className="right">
                                                                    <div className="top-name">
                                                                        <div className="name">{itemChild.userData.username}</div>
                                                                        <i class="far fa-clock"></i>
                                                                        <div className="time">
                                                                            {((new Date().getTime()) - (new Date(itemChild.createdAt).getTime()))/86400000}
                                                                        </div>
                                                                    </div>
                                                                    <div className="content-comment">
                                                                        {itemChild.content}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="reply">
                                                                <i class="fas fa-reply"></i>
                                                                <div className="text">Trả lời</div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }


                                        </div>
                                    )
                                })
                            }



                            {
                                allDataNumber > 0 &&
                                <div className="for-button">
                                    <button type="button" class="btn btn-primary btn-load-more">Tải thêm bình thêm</button>
                                </div>
                            }



                        </div>
                    </div>

                </div>


            </div>
        )
    }
}

export default CommentGame;
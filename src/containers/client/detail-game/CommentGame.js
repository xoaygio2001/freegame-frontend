import React, { Component } from "react";

import './CommentGame.scss';

import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import * as Action from '../../../store/actions';

import { getComment } from '../../../services/userService';

import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class CommentGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentGame: [],
            allDataNumber: 0,
            moreCommentNumber: 1,
            typeComment: "NEW",
            contentComment: '',
            userLogin: {},
            relyToComment: 0,
        }
    }

    async componentDidMount() {
        let res = await this.props.getCommentGame(this.props.params.id, this.state.moreCommentNumber, this.state.typeComment);
        if (res && res.errCode == 0) {
            this.setState({
                allDataNumber: res.allDataNumber
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.commentGame !== this.props.commentGame) {
            this.setState({
                commentGame: this.props.commentGame
            })
        }

    }

    handleChangeTypeComment = async (e) => {
        let res = await this.props.getCommentGame(this.props.params.id, this.state.moreCommentNumber, e.target.value);
        if (res && res.errCode == 0) {
            this.setState({
                allDataNumber: res.allDataNumber
            })
        }

        this.setState({
            typeComment: e.target.value
        })
    }

    handleMoreComment = async () => {
        let res = await getComment(this.props.params.id, this.state.moreCommentNumber + 1, this.state.typeComment);

        if (res && res.errCode == 0 && res.data) {

            let commentGame = res.data
            let allDataNumber = res.allDataNumber

            let commentHtml = '<div class="other-comment">';

            if (commentGame && commentGame.length > 0) {
                commentGame.forEach(item => {
                    let minutes = ((new Date().getTime()) - (new Date(item.createdAt).getTime())) / 60000;
                    minutes = minutes.toFixed();
                    let total = '';
                    let unit = 'Phút trước';

                    if (minutes <= 60) {
                        total = `${minutes} ${unit}`;
                    } else if (minutes <= 3600) {
                        unit = 'Giờ trước';
                        total = `${(minutes / 60).toFixed()} ${unit}`;
                    } else if (minutes <= 2592000) {
                        unit = 'Ngày trước';
                        total = `${(minutes / 1440).toFixed()} ${unit}`;
                    } else if (minutes <= 77760000) {
                        unit = 'Tháng trước';
                        total = `${(minutes / 43200).toFixed()} ${unit}`;
                    } else {
                        unit = 'Năm trước';
                        total = `${(minutes / 518400).toFixed()} ${unit}`;
                    }

                    commentHtml += `
                        <div class="container-comment">
                            <div class="main-comment">
                                <div class="left">
                                    <div class="avatar"></div>
                                </div>
                                <div class="right">
                                    <div class="top-name">
                                        <div class="name">${item.userData.username}</div>
                                        <i class="far fa-clock"></i>
                                        <div class="time">${total}</div>
                                    </div>
                                    <div class="content-comment">
                                        ${item.content}
                                    </div>
                                </div>
                            </div>
                            <div class="reply">
                                <i class="fas fa-reply"></i>
                                <div class="text">Trả lời</div>
                            </div>`;

                    if (item.commentChild && item.commentChild.length > 0) {
                        item.commentChild.forEach(itemChild => {
                            let minutesChild = ((new Date().getTime()) - (new Date(itemChild.createdAt).getTime())) / 60000;
                            minutesChild = minutesChild.toFixed();
                            let totalChild = '';
                            let unitChild = 'Phút trước';

                            if (minutesChild <= 60) {
                                totalChild = `${minutesChild} ${unitChild}`;
                            } else if (minutesChild <= 3600) {
                                unitChild = 'Giờ trước';
                                totalChild = `${(minutesChild / 60).toFixed()} ${unitChild}`;
                            } else if (minutesChild <= 2592000) {
                                unitChild = 'Ngày trước';
                                totalChild = `${(minutesChild / 1440).toFixed()} ${unitChild}`;
                            } else if (minutesChild <= 77760000) {
                                unitChild = 'Tháng trước';
                                totalChild = `${(minutesChild / 43200).toFixed()} ${unitChild}`;
                            } else {
                                unitChild = 'Năm trước';
                                totalChild = `${(minutesChild / 518400).toFixed()} ${unitChild}`;
                            }

                            commentHtml += `
                                <div class="child-comment">
                                    <div class="left">
                                        <div class="avatar"></div>
                                    </div>
                                    <div class="right">
                                        <div class="top-name">
                                            <div class="name">${itemChild.userData.username}</div>
                                            <i class="far fa-clock"></i>
                                            <div class="time">${totalChild}</div>
                                        </div>
                                        <div class="content-comment">
                                            ${itemChild.content}
                                        </div>
                                    </div>
                                </div>
                                <div class="reply">
                                    <i class="fas fa-reply"></i>
                                    <div class="text">Trả lời</div>
                                </div>`;
                        });
                    }

                    commentHtml += `</div>`;
                });
            }

            commentHtml += '</div>';



            // Create a container to hold the HTML and append it to the div with id "title-2"
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = commentHtml;

            const targetContainer = document.getElementById('title-2');
            if (targetContainer) {
                targetContainer.appendChild(tempContainer);
            }

        }

        this.setState({
            moreCommentNumber: this.state.moreCommentNumber + 1
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handlePostComment = async () => {
        let { userLogin } = this.props
        let { contentComment } = this.state
        let gameId = this.props.params.id

        if (userLogin && contentComment.length > 0 && gameId) {
            await this.props.createNewCommentRedux({
                userId: userLogin.id,
                content: contentComment,
                gameId: gameId
            })
        } else {
            toast.error("Nhập nội dung bình luận")
        }

        let res = await this.props.getCommentGame(this.props.params.id, this.state.moreCommentNumber, this.state.typeComment);
        if (res && res.errCode == 0) {
            this.setState({
                allDataNumber: res.allDataNumber,
                relyToComment: null,
                contentComment: ''
            })
        }
    }


    handleChooseReply = (commentId) => {
        this.setState({
            relyToComment: commentId
        })
    }

    handleReplyComment = async (id) => {
        let { userLogin } = this.props
        let { contentComment } = this.state
        let gameId = this.props.params.id

        if (userLogin && contentComment.length > 0 && gameId) {
            await this.props.createNewCommentRedux({
                userId: userLogin.id,
                content: contentComment,
                gameId: gameId,
                relyToCommentId: id
            })
        } else {
            toast.error("Nhập nội dung bình luận")
        }

        let res = await this.props.getCommentGame(this.props.params.id, this.state.moreCommentNumber, this.state.typeComment);
        if (res && res.errCode == 0) {
            this.setState({
                allDataNumber: res.allDataNumber,
                relyToComment: null,
                contentComment: ''
            })
        }

    }



    render() {
        let { commentGame, allDataNumber, contentComment, relyToComment } = this.state
        let commentLength = commentGame.length;
        let { userLogin } = this.props

        console.log('relyToComment: ', relyToComment)



        return (
            <div className="comment-game" >
                <div className="title">
                    <div className="name">
                        Bình Luận
                    </div>
                </div>
                <div className="detail-2">
                    {userLogin &&
                        <div className="my-comment">
                            <div className="avatar"></div>
                            <textarea
                                value={contentComment}
                                onChange={(e) => this.handleOnChangeText(e, 'contentComment')}
                                className="form-control comment-box" id="exampleFormControlTextarea1" rows="3"></textarea>

                        </div>
                    }
                    {userLogin && <button onClick={() => this.handlePostComment()} type="button" className="btn btn-primary btn-post-comment">Đăng bình luận</button>}

                    <div id="title-2" className="title-2">
                        <div className="title">
                            <div className="name">
                                {allDataNumber} Bình Luận
                            </div>
                            <select onChange={(e) => this.handleChangeTypeComment(e)} className="form-select" aria-label="Default select example ">
                                <option selected value="NEW">Mới nhất</option>
                                <option value="OLD">Cũ nhất</option>
                            </select>
                            <div className="line"></div>
                        </div>

                        <div className="other-comment">
                            {commentGame && commentGame.length > 0 &&
                                commentGame.map((item, index) => {

                                    let minutes = ((new Date().getTime()) - (new Date(item.createdAt).getTime())) / 60000;
                                    minutes = minutes.toFixed();
                                    let timeComment;
                                    let unit = 'Phút trước';
                                    let total = '';


                                    if (minutes <= 60) {
                                        total = `${minutes} ${unit}`;
                                    } else if (minutes <= 3600) {
                                        unit = 'Giờ trước';
                                        total = `${(minutes / 60).toFixed()} ${unit}`;
                                    } else if (minutes <= 2592000) {
                                        unit = 'Ngày trước';
                                        total = `${(minutes / 1440).toFixed()} ${unit}`;
                                    } else if (minutes <= 77760000) {
                                        unit = 'Tháng trước';
                                        total = `${(minutes / 43200).toFixed()} ${unit}`;
                                    } else {
                                        unit = 'Năm trước';
                                        total = `${(minutes / 518400).toFixed()} ${unit}`;
                                    }

                                    return (
                                        <div className="container-comment">
                                            <div className="main-comment">
                                                <div className="left">
                                                    <div className="avatar"></div>
                                                </div>
                                                <div className="right">
                                                    <div className="top-name">
                                                        <div className="name">{item.userData.username}</div>
                                                        <i className="far fa-clock"></i>
                                                        <div className="time">{total}</div>
                                                    </div>

                                                    <div className="content-comment">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            </div>

                                            <div onClick={() => this.handleChooseReply(item.id)} className="reply">
                                                <i className="fas fa-reply"></i>
                                                <div className="text">Trả lời</div>
                                            </div>

                                            {relyToComment && relyToComment == item.id &&
                                                <>
                                                    <div className="my-comment">
                                                        <div className="avatar"></div>
                                                        <textarea
                                                            value={contentComment}
                                                            onChange={(e) => this.handleOnChangeText(e, 'contentComment')}
                                                            className="form-control comment-box" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                    </div>
                                                    <button onClick={() => this.handleReplyComment(item.id)} type="button" className="btn btn-primary btn-post-comment">Đăng bình luận</button>
                                                </>
                                            }



                                            {item.commentChild && item.commentChild.length > 0 &&
                                                item.commentChild.map((itemChild, indexChild) => {

                                                    let minutes = ((new Date().getTime()) - (new Date(itemChild.createdAt).getTime())) / 60000;
                                                    minutes = minutes.toFixed();
                                                    let timeComment;
                                                    let unit = 'Phút trước';
                                                    let total = '';


                                                    if (minutes <= 60) {
                                                        total = `${minutes} ${unit}`;
                                                    } else if (minutes <= 3600) {
                                                        unit = 'Giờ trước';
                                                        total = `${(minutes / 60).toFixed()} ${unit}`;
                                                    } else if (minutes <= 2592000) {
                                                        unit = 'Ngày trước';
                                                        total = `${(minutes / 1440).toFixed()} ${unit}`;
                                                    } else if (minutes <= 77760000) {
                                                        unit = 'Tháng trước';
                                                        total = `${(minutes / 43200).toFixed()} ${unit}`;
                                                    } else {
                                                        unit = 'Năm trước';
                                                        total = `${(minutes / 518400).toFixed()} ${unit}`;
                                                    }

                                                    return (
                                                        <>

                                                            <div className="child-comment">
                                                                <div className="left">
                                                                    <div className="avatar"></div>
                                                                </div>
                                                                <div className="right">
                                                                    <div className="top-name">
                                                                        <div className="name">{itemChild.userData.username}</div>
                                                                        <i className="far fa-clock"></i>
                                                                        <div className="time">
                                                                            {total}
                                                                        </div>
                                                                    </div>
                                                                    <div className="content-comment">
                                                                        {itemChild.content}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div onClick={() => this.handleChooseReply(itemChild.id)} className="reply">
                                                                <i className="fas fa-reply"></i>
                                                                <div className="text">Trả lời</div>
                                                            </div>

                                                            {relyToComment && relyToComment == itemChild.id &&
                                                                <>
                                                                    <div className="my-comment">
                                                                        <div className="avatar"></div>
                                                                        <textarea
                                                                            value={contentComment}
                                                                            onChange={(e) => this.handleOnChangeText(e, 'contentComment')}
                                                                            className="form-control comment-box" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                                    </div>
                                                                    <button onClick={() => this.handleReplyComment(itemChild.id)} type="button" className="btn btn-primary btn-post-comment">Đăng bình luận</button>
                                                                </>

                                                            }
                                                        </>
                                                    )
                                                })
                                            }


                                        </div>
                                    )
                                })
                            }


                        </div>


                    </div>

                    {
                        allDataNumber > 0 &&
                        <div className="for-button">
                            <button onClick={() => this.handleMoreComment()} type="button" className="btn btn-primary btn-load-more">Tải thêm bình thêm</button>
                        </div>
                    }

                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentGame: state.commentGame,
        userLogin: state.userLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCommentGame: (gameId, moreCommentNumber, type) => dispatch(Action.getCommentAction(gameId, moreCommentNumber, type)),
        createNewCommentRedux: (data) => dispatch(Action.createNewCommentAction(data)),
    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(CommentGame));
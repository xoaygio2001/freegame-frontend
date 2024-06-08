import React, { Component } from "react";
import './SuggestGame.scss';
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class SuggestGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: [],
            isSticky: false
        };
        this.suggestGameRef = React.createRef();
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const suggestGameElement = this.suggestGameRef.current;
        if (suggestGameElement) {
            const rect = suggestGameElement.getBoundingClientRect();
            if (rect.bottom <= window.innerHeight) {
                this.setState({ isSticky: true });
            } else {
                this.setState({ isSticky: false });
            }
        }
    };

    handleChooseGame = (id) => {
        this.props.history(`/detail-game/${id}`);
    };

    render() {
        let { suggestGame } = this.props;
        const { isSticky } = this.state;

        return (
            <div ref={this.suggestGameRef} className={`container-SuggestGame ${isSticky ? 'sticky' : ''}`}>
                <div className="head-SuggestGame">
                    GỢI Ý GAME CHO BẠN
                </div>
                <div className="body-SuggestGame">
                    <div className="box-item-SuggestGame">
                        {suggestGame && suggestGame.length > 0 &&
                            suggestGame.map((item, index) => {
                                return (
                                    <div onClick={() => this.handleChooseGame(item.id)} className="item-SuggestGame" key={index}>
                                        <div className="left-body-SuggestGame">
                                            <div className="picture-SuggestGame" style={{ backgroundImage: `url(${item.img})` }} />
                                        </div>
                                        <div className="right-body-SuggestGame">
                                            <div className="name-SuggestGame">
                                                {item.name}
                                            </div>
                                            <div className="date-SuggestGame">
                                                <i className="far fa-calendar-alt"></i> {moment(item.updatedAt).format('L')} (cập nhật)
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(SuggestGame);

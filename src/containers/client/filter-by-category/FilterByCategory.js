import React, { Component } from "react";

import './FilterByCategory.scss'

import Header from '../header-footer/Headerr'
import OutStandingGame from "../home-page/OutStandingGame";
import Game from "./Game";

import { useParams } from 'react-router-dom';



function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class FillterByCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: []
        }
    }

    async componentDidMount() {

    }

    render() {

        return (
            <div class="container-FillterByCategory">
                    <div class="content-container">
                        <Header />
                        <div class="body">

                            <Game />

                        </div>
                        <div class="footer"></div>
                    </div>
                    

            </div>
        )
    }
}

export default withParams(FillterByCategory);
import React, { Component } from "react";

import './HomePage.scss'

import Header from '../header-footer/Headerr'
import OutStandingGame from "./OutStandingGame";
import HomeGame from "./HomeGame";

import Footer from "../header-footer/Footer";

import { useParams } from 'react-router-dom';



function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class HomePage extends Component {

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
            <div class="container-homepage">
                    <div class="content-container">
                        <Header />
                        <div class="body">

                            <OutStandingGame />

                            <HomeGame />

                        </div>
                        <Footer/>
                        
                    </div>
                    

            </div>
        )
    }
}

export default withParams(HomePage);
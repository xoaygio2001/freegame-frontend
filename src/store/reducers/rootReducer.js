import { getAllCodeAction } from '../actions/userAction';

const initState = {
    category: [],
    os: [],
    playWith: [],
    language: [],
    role: [],
    games: [],
    detailGame: [],
    game: {},
    outStandingGame: [],
    newGame: [],
    hotGame: [],
    game18: [],
    allTagGame: [],
    topGame18: [],
    gameByKeyword: [],
    gameByCategory: [],
    categoryByTagId: [],
    allAccount: [],
    allGame: [],



    userLogin: JSON.parse(localStorage.getItem('userLogin'))

}

var d = new Date();


const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CATEGORY':
            state.category = action.data;
            return {
                ...state,
            }
            break;

        case 'OS':
            state.os = action.data;
            return {
                ...state,
            }
            break;

        case 'PLAYWITH':
            state.playWith = action.data;
            return {
                ...state,
            }
            break;

        case 'LANGUAGE':
            state.language = action.data;
            return {
                ...state,
            }
            break;
        case 'ROLE':
            state.role = action.data;
            return {
                ...state,
            }
            break;

        case 'GAME':
            state.game = action.data;
            return {
                ...state,
            }
            break;

        case 'ALLTAGGAME':
            state.allTagGame = action.data;
            return {
                ...state,
            }
            break;

        case 'TOPGAME18':
            state.topGame18 = action.data;
            return {
                ...state,
            }
            break;

        case 'LOGIN-SYSTEM':
            localStorage.setItem('userLogin', JSON.stringify(action.data));
            if (action.rememberLogin) {
                localStorage.setItem('expire', JSON.stringify({
                    endTime: d.getTime() + 604800000
                }));
            } else {
                localStorage.setItem('expire', JSON.stringify({
                    endTime: d.getTime() + 10800000
                }));
            }
            return {
                ...state
            }
            break;

        case 'LOGOUT':
            localStorage.removeItem("userLogin")
            localStorage.removeItem("expire")

            return {
                ...state
            }
            break;
        case 'CHECK-EXPIRE-ACCOUNT':
            let expire = JSON.parse(localStorage.getItem('expire'))
            let currentTime = d.getTime();
            if (expire && currentTime >= expire.endTime) {
                localStorage.removeItem("userLogin")
                localStorage.removeItem("expire")
            }

            return {
                ...state
            }
            break;



        case 'GAME-BY-KEYWORD':
            state.gameByKeyword = action.data;
            return {
                ...state,
            }
            break;

        case 'GAME-BY-CATEGORY':
            state.gameByCategory = action.data;
            return {
                ...state,
            }
            break;

        case 'CATEGORY-BY-TAGID':
            state.categoryByTagId = action.data;
            return {
                ...state,
            }
            break;

        case 'ALL-ACCOUNT':
            state.allAccount = action.data;
            return {
                ...state,
            }
            break;

        case 'ALL-GAME':
            state.allGame = action.data;
            return {
                ...state,
            }
            break;





        case 'TOPGAME':

            switch (action.typeTop) {
                case 'HOT':
                    state.hotGame = action.data;
                    break;
                case 'NEW':
                    state.newGame = action.data;
                    break;
                case '18':
                    state.game18 = action.data;
                    break;
                case 'OUTSTANDING':
                    state.outStandingGame = action.data;
                    break;
            }
            return {
                ...state,
            }
            break;

        default:
            return state
            break;
    }
}


export default rootReducer;
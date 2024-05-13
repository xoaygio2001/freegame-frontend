import axios from '../Axios';

const createNewGame = (data) => {
    return axios.post('/api/create-new-game', data);
}

const createNewAccount = (data) => {
    return axios.post('/api/create-new-account', data);

}

const ChangePasswordAccount = (data) => {
    return axios.post('/api/change-password-account', data);
}

const DeleteAccount = (data) => {
    return axios.post('/api/delete-account', data);
}

const DeleteGame = (data) => {
    return axios.post('/api/delete-game', data);
}



const ChangeInforAccount = (data) => {
    return axios.post('/api/change-infor-account', data);
}

const ChangeInforGame = (data) => {
    return axios.post('/api/change-infor-game', data);
}







const getTopGame = (limit, type, pageNumber) => {
    return axios.get(`/api/get-top-game?limit=${limit}&type=${type}&pageNumber=${pageNumber}`);
}

const getGameById = (id) => {
    return axios.get(`/api/get-game-by-id?id=${id}`);
}

const getAllCode = (type) => {
    return axios.get(`/api/get-allcode?type=${type}`);
}

const getAllTagGame = () => {
    return axios.get(`/api/get-all-taggame`);
}


const getAllTopGame18 = (limit) => {
    return axios.get(`/api/get-all-topgame-18?limit=${limit}`);
}

const getLoginIntoSystem = (username, password) => {
    return axios.get(`/api/login-into-system?username=${username}&password=${password}`);
}

const getGameByKeyWord = (keyword) => {
    return axios.get(`/api/find-game-by-keyword?keyword=${keyword}`);
}

const getGameByCategory = (tagId, limit, pageNumber) => {
    return axios.get(`/api/get-game-by-category?tagId=${tagId}&limit=${limit}&pageNumber=${pageNumber}`);
}

const getCategoryByTagId = (tagId) => {
    return axios.get(`/api/get-category-by-tagid?tagId=${tagId}`);
}

const getAllAccount = (limit, pageNumber) => {
    return axios.get(`/api/get-all-account?limit=${limit}&pageNumber=${pageNumber}`);
}

const getAllGame = (limit, pageNumber) => {
    return axios.get(`/api/get-all-game?limit=${limit}&pageNumber=${pageNumber}`);
}









export {
    getAllCode, createNewGame,
    getGameById, getTopGame, getAllTagGame,
    getAllTopGame18, createNewAccount, getLoginIntoSystem,
    getGameByKeyWord, getGameByCategory, getCategoryByTagId,
    ChangePasswordAccount, DeleteAccount, getAllAccount,
    ChangeInforAccount, getAllGame, DeleteGame,
    ChangeInforGame
}

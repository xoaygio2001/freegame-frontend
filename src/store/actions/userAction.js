import React from "react";
import {
    getAllCode, getGameById,
    getTopGame, getAllTagGame, getAllTopGame18,
    createNewAccount, getLoginIntoSystem,
    getGameByKeyWord, getGameByCategory,
    getCategoryByTagId, ChangePasswordAccount,
    DeleteAccount, getAllAccount, ChangeInforAccount,
    getAllGame, DeleteGame, ChangeInforGame, createNewGame
} from '../../services/userService'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const createNewAccountAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewAccount(data)
            if (res && res.errCode == 0) {
                toast.success("Tạo tài khoản thành công")
            } else {
                toast.error("Tạo tài khoản thất bại")
            }

        } catch (error) {
            console.log(error);
            toast.error("Tạo tài khoản thất bại")
        }
    }
}

export const createNewGameAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewGame(data)
            if (res && res.errCode == 0) {
                toast.success("Thêm game mới thành công")
            } else {
                toast.error("Thêm game mới thất bại")
            }

            return res;

        } catch (error) {
            console.log(error);
            toast.error("Tạo tài khoản thất bại")
        }
    }
}

export const DeleteAccountAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteAccount(data)
            if (res && res.errCode == 0) {
                toast.success("Xóa tài khoản thành công")
            } else {
                toast.error("Xóa tài khoản thất bại")
            }

        } catch (error) {
            console.log(error);
            toast.error("Xóa tài khoản thất bại")
        }
    }
}

export const DeleteGameAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteGame(data)
            if (res && res.errCode == 0) {
                toast.success("Xóa game thành công")
            } else {
                toast.error("Xóa game khoản thất bại")
            }

        } catch (error) {
            console.log(error);
            toast.error("Xóa game khoản thất bại")
        }
    }
}

export const ChangePasswordAccountAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await ChangePasswordAccount(data)
            if (res && res.errCode == 0) {
                toast.success("Thay đổi tài khoản thành công")
            } else {
                toast.error(res.errMessage)
            }

        } catch (error) {
            console.log(error);
            toast.error("Tạo tài khoản thất bại")
        }
    }
}

export const ChangeInforAccountAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await ChangeInforAccount(data)
            if (res && res.errCode == 0) {
                toast.success("Thay đổi thành công")
            } else {
                toast.error(res.errMessage)
            }

        } catch (error) {
            console.log(error);
            toast.error("Thay đổi thất bại")
        }
    }
}

export const ChangeInforGameAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await ChangeInforGame(data)
            if (res && res.errCode == 0) {
                toast.success("Thay đổi thông tin thành công")
            } else {
                toast.error(res.errMessage)
            }

        } catch (error) {
            console.log(error);
            toast.error("Thay đổi thông tin thất bại")
        }
    }
}






export const getAllCodeAction = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode(type)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: type,
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getAllTagGameAction = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTagGame()
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'ALLTAGGAME',
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}


export const getTopGameAction = (limit, type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopGame(limit, type)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'TOPGAME',
                    data: res.data,
                    typeTop: type

                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getAllTopGame18Action = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTopGame18(limit)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'TOPGAME18',
                    data: res.data,

                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}




export const getGameByIdAction = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGameById(id)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'GAME',
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getLoginIntoSystemAction = (username, password, rememberLogin) => {
    return async (dispatch, getState) => {
        try {
            let res = await getLoginIntoSystem(username, password)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'LOGIN-SYSTEM',
                    data: res.data,
                    rememberLogin: rememberLogin
                });

            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

            return res;

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const LogoutAccountAction = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: 'LOGOUT',
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const CheckExpireAccountAction = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: 'CHECK-EXPIRE-ACCOUNT',
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getGameByKeyWordAction = (keyword) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGameByKeyWord(keyword)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'GAME-BY-KEYWORD',
                    data: res.data
                });

            } else {
                dispatch({
                    type: `FAIL`,
                });
            }


        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getGameByCategoryAction = (tagId, limit, pageNumber) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGameByCategory(tagId, limit, pageNumber)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'GAME-BY-CATEGORY',
                    data: res.data
                });

            } else {
                dispatch({
                    type: `FAIL`,
                });
            }
            return ({
                errCode: res.errCode,
                errMessage: res.errMessage,
                allDataNumber: res.allDataNumber
            })

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getCategoryByTagIdAction = (tagId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getCategoryByTagId(tagId)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'CATEGORY-BY-TAGID',
                    data: res.data
                });

            } else {
                dispatch({
                    type: `FAIL`,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getAllAccountAction = (limit, pageNumber) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllAccount(limit, pageNumber)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'ALL-ACCOUNT',
                    data: res.data
                });

                return ({
                    errCode: res.errCode,
                    errMessage: res.errMessage,
                    allDataNumber: res.allDataNumber
                })

            } else {
                dispatch({
                    type: `FAIL`,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getAllGameAction = (limit, pageNumber) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllGame(limit, pageNumber)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'ALL-GAME',
                    data: res.data
                });

                return ({
                    errCode: res.errCode,
                    errMessage: res.errMessage,
                    allDataNumber: res.allDataNumber
                })

            } else {
                dispatch({
                    type: `FAIL`,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}



















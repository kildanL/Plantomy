
import axios from "axios";
import { TChars, TProduct } from "../../types";
import { AppDispatch } from "../store";
import { productSlice } from "./productSlice";

//TODO handle auth error
//TODO add error handlers and response status check to all requests

export async function SignIn(userLogin: string, userPassword: string): Promise<number> {
    let result = 200;

    await axios.post('/api/auth/login',
        {
            login: userLogin,
            hash: userPassword
        })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            window.location.reload();
        })
        .catch(error => result = error.response.status);

    return result;
}

export async function Register(userLogin: string, userPassword: string): Promise<number> {
    let result = 200;
    await axios.post('/api/auth/register',
        {
            login: userLogin,
            hash: userPassword
        })
        .catch(error => result = error.response.status);

    return result;
}

export const GetAllProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.ProductsFetching());
        const response = await axios.get<TProduct[]>('/api/goods/getAll');
        dispatch(productSlice.actions.ProductsFetchingSuccess(response.data));
    }
    catch (e) {
        if (e instanceof Error) {
            dispatch(productSlice.actions.ProductsFetchingError(e.message));
        }
        else {
            dispatch(productSlice.actions.ProductsFetchingError("Неизвестная ошибка"));
        }
    }
}

export async function GetProduct(id: number) {
    const response = await axios.get('/api/goods?id=' + id);
    return response.data;
}

export function GetPollResult(chars: TChars) {
    let prods: TProduct[] = [];
    if (chars) {
        return axios.post<TProduct[]>('/api/goods/getByFilter',
            {
                brief: chars
            })
            .then(response => prods = response.data);
    }
    return prods;
}

export async function GetUserInfo() {
    const token = localStorage.getItem('token');
    let result;
    if (token) {
        result = axios(
            {
                method: 'get',
                url: '/api/user/userInfo',
                headers: {
                    Authorization: token
                }
            })
            .then(response => response.data)
    }
    return result;
}

export async function GetFavorites() {
    const token = localStorage.getItem('token');
    let result;
    if (token) {
        result = axios(
            {
                method: 'get',
                url: '/api/fav/showfav',
                headers: {
                    Authorization: token
                }
            }
        ).then(response => response.data)
    }
    return result;
}

export async function SwitchFavorite(id: number) {
    let result = 200;

    await axios.post('/api/fav/switchfav',
        {
            productId: id
        },
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .catch(error => result = error.response.status)

    return result;
}

export async function GetCart() {
    const token = localStorage.getItem('token');
    let result;
    if (token) {
        result = axios(
            {
                method: 'get',
                url: '/api/cart/getCart',
                headers: {
                    Authorization: token
                }
            }
        ).then(response => response.data)
    }
    return result;
}

export async function AddToCart(id: number) {
    let result = 200;

    await axios.post('/api/cart/addtoCart',
        {
            productId: id
        },
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .catch(error => result = error.response.status);

    return result;
}

export async function RemoveFromCart(id: number) {
    let result = 200;

    await axios.post('/api/cart/dropfromCart',
        {
            productId: id
        },
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .catch(error => result = error.response.status);

    return result;
}

export async function IncCartItem(id: number) {
    let result = 200;

    await axios.post('/api/cart/incGoods',
        {
            productId: id
        },
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .catch(error => result = error.response.status);

    return result;
}

export async function DecCartItem(id: number) {
    let result = 200;

    await axios.post('/api/cart/decGoods',
        {
            productId: id
        },
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .catch(error => result = error.response.status);

    return result;
}

export async function GetAllOrders() {
    const token = localStorage.getItem('token');
    let result;
    if (token) {
        result = await axios(
            {
                method: 'get',
                url: '/api/order/getOrders',
                headers: {
                    Authorization: token
                }
            })
            .then(response => response.data)
    }
    return result;
}

export async function GetOrder(id: number) {
    const token = localStorage.getItem('token');
    let result;
    if (token) {
        result = await axios.post('api/order/getProductsInOrder',
            {
                orderId: id
            },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => response.data);
    }
    return result;
}
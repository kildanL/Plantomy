import { Button, Input, Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AddOrder, ChangeErrorMessage, GetAllOrders, GetCart } from '../../store/reducers/ActionCreators';
import { userSlice } from "../../store/reducers/UserSlice";
import './OrderPage.scss';

export function OrderPage(): JSX.Element {

    type TDeliveryType = 'delivery' | 'pickUp';
    const [deliveryType, setDeliveryType] = useState<TDeliveryType>('delivery');

    const { user } = useAppSelector(state => state.UserReducer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { quantity, totalAmount } = location.state.data;

    function ChangeDeliveryType(e: RadioChangeEvent) {
        setDeliveryType(e.target.value);
    }

    function ChangeUserValue(e: any) {
        dispatch(userSlice.actions.UserFetchingSuccess({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    function ChangeAddressValue(e: any) {
        dispatch(userSlice.actions.UserFetchingSuccess({
            ...user,
            address:
                {
                    ...user.address,
                    [e.target.name]: e.target.value,
                }
        }))
    }

    async function addOrder() {
        const result = await AddOrder(user.address);
        if (result === 200) {
            dispatch(GetAllOrders());
            dispatch(GetCart());

            dispatch(ChangeErrorMessage('Заказ создан'));
            navigate('/ordersList');
        }
        else if (result === 400) {
            dispatch(ChangeErrorMessage('В корзине нет товаров'));
        }
    }

    return (
        <>
            <div className='order_page'>
                <div className='wrapper_info_order'>
                    <div className='wrapper_input_info'>
                        <h1 className='h1_checkout'>Оформление заказа</h1>
                        <h2 className='h2_contact_info'>Контактные данные</h2>
                        <div className='wrapper_contact_info'>
                            <div className='inputs input_name'>
                                <h3>Имя</h3>
                                <Input placeholder='Введите ваше имя'
                                    value={user.firstName} name='firstName' onChange={ChangeUserValue} />
                            </div>
                            <div className='inputs input_surname'>
                                <h3>Фамилия</h3>
                                <Input placeholder='Введите вашу фамилию'
                                    value={user.lastName} name='lastName' onChange={ChangeUserValue} />
                            </div>
                            <div className='inputs input_lastname'>
                                <h3>Отчество</h3>
                                <Input placeholder='Введите ваше отчество'
                                    value={user.patronymic} name='patronymic' onChange={ChangeUserValue} />
                            </div>
                            <div className='inputs input_phone'>
                                <h3>Телефон</h3>
                                <Input placeholder='+7'
                                    value={user.phone} name='phone' onChange={ChangeUserValue} />
                            </div>
                        </div>
                    </div>
                    <div className='wrapper_delivery_info'>
                        <h2>Способ доставки</h2>
                        <div className='type_delivery'>
                            <h3>Тип доставки</h3>
                            <Radio.Group className='radio_group_type_delivery' onChange={ChangeDeliveryType} value={deliveryType}>
                                <Radio.Button value='delivery' className='btn_delivery'>Доставка</Radio.Button>
                                <Radio.Button value='pickUp'>Самовывоз</Radio.Button>
                            </Radio.Group>
                        </div>
                        {deliveryType === 'delivery' &&
                            <div className='wrapper_inputs_delivery_info'>
                                <div className='inputs input_delivery_city'>
                                    <h3>Город доставки</h3>
                                    <Input placeholder='Казань'
                                        value={user.address.city} name='city' onChange={ChangeAddressValue} />
                                </div>
                                <div className='inputs input_street'>
                                    <h3>Улица</h3>
                                    <Input placeholder='Пушкина'
                                        value={user.address.street} name='street' onChange={ChangeAddressValue} />
                                </div>
                                <div className='inputs input_flat'>
                                    <h3>Дом</h3>
                                    <Input placeholder='16'
                                        value={user.address.house} name='house' onChange={ChangeAddressValue} />
                                </div>
                                <div className='inputs input_phone'>
                                    <h3>Квартира</h3>
                                    <Input placeholder='12'
                                        value={user.address.flat} name='flat' onChange={ChangeAddressValue} />
                                </div>
                                <div className='inputs input_index'>
                                    <h3>Индекс</h3>
                                    <Input placeholder='420030'
                                        value={user.address.index} name='index' onChange={ChangeAddressValue} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='wrapper_confirm_order'>
                    <div className='wrapper_total_cost'>
                        <h1>Общая стоимость</h1>
                        <div className='span_total_cost'>
                            <span className='amount_product'>{quantity}</span>
                            <span className='total_cost_product'>{totalAmount} ₽</span>
                        </div>
                        <Button className='btn_confirm_order' onClick={addOrder}>Подтвердить заказ</Button>
                    </div>
                    <h1 className='h1_payment_method'>Способ оплаты</h1>
                    <h2 className='h2_online_payment'>Оплата онлайн</h2>
                    <div className='imgs_payment_system'>
                        <img src='/visa.png' width={76} alt='visa.png' />
                        <img src='/mastercard.png' width={45} className='img_payment' alt='mastercard' />
                        <img src='/mir.png' width={83} className='img_payment' alt='mir.png' />
                    </div>
                    <img src='/cdek.png' className='img_cdek' width={329} />
                </div>
            </div>
        </>
    )
}

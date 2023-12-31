import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { LazyLoading } from '../../components/LazyLoading';
import { ProductCard } from '../../components/ProductCard';
import { useAppSelector } from '../../hooks/redux';
import { GetOrder } from '../../store/reducers/ActionCreators';
import { TOrder, TProduct } from '../../types';
import './CompletedOrderPage.scss'

export function CompletedOrderPage(): JSX.Element {

    const { id } = useParams();
    const [orderData, setOrderData] = useState<TOrder>();
    const [isLoading, setIsLoading] = useState(true);

    //FIXME get userData from backend
    const { firstName, lastName, patronymic, phone, email } = useAppSelector(state => state.UserReducer.user);

    async function getOrder() {
        const order: TOrder = await GetOrder(+(id || -1));

        setOrderData(order);
        setIsLoading(false);
    }

    useEffect(() => {
        getOrder();
    }, [id]);

    let cardsList: JSX.Element[] = [];
    if (orderData) {
        cardsList = orderData.goods.map((prod: TProduct) => {
            return (
                <ProductCard product={prod} cardType={'order'} />
            )
        })
    }

    return (
        <>
            {isLoading
                ?
                <LazyLoading type='spin'/>
                :
                <>
                    {!orderData
                        ?
                        <h1>Заказ не существует</h1>
                        :
                        <>
                            <div className='completed_order_page'>
                                <h1>Заказ #{orderData.id}</h1>
                                <div className='notification'>
                                    <img src='/info_icon.png' width={21} alt='info_icn'></img>
                                    <span>На указанную вами электронную почту пришёл трек-номер с вашим заказом.</span>
                                </div>
                                <div className='order_status'>
                                    {orderData.status}
                                </div>
                                <div className='wrapper_user_order_info'>
                                    <div className='container_user_info'>
                                        <div className='container_address'>
                                            <h2>Адрес</h2>
                                            <img src='/place_icon.png' alt='address_icn' className='place_icn'></img>
                                            <h3>{`г. ${orderData.address.city} ул. ${orderData.address.street} дом ${orderData.address.house} кв. ${orderData.address.flat}. индекс ${orderData.address.index}`}</h3>
                                        </div>
                                        <div className='container_recipient'>
                                            <h2>Получатель</h2>
                                            <div className='container_h3_recipient'>
                                                <img src='/user_order_icon.png' alt='user_order_icn' className='user_order_icn'></img>
                                                <div className='wrapper_h3_recipient_info'>
                                                    <h3>{firstName} {lastName} {patronymic}</h3>
                                                    <h3>{email}</h3>
                                                    <h3>{phone}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container_order_info'>
                                        {/* FIXME fix style. <br/> - dirty hack */}
                                        <br />
                                        <h3 className='h3_total'>Стоимость заказа</h3>
                                        <h3 className='h3_total'>{orderData.totalCost} ₽</h3>
                                    </div>
                                </div>
                                <div className='wrapper_order_products'>
                                    <div className='titles_order_products'>
                                        <h1 className='h1_prod_quantity'>Товары</h1>
                                        <h2 className='h2_prod_price'>Цена</h2>
                                        <h2 className='h2_order_sum'>Сумма</h2>
                                    </div>
                                    {cardsList}
                                </div>

                            </div>
                        </>
                    }
                </>
            }


        </>
    )
}

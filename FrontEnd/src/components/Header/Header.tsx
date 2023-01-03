
import { Dispatch, SetStateAction } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { Logo } from '../Logo';
import { useAppSelector } from '../../hooks/redux';
import './Header.scss';

export function Header({ setLoginActive }: { setLoginActive: Dispatch<SetStateAction<boolean>> }): JSX.Element {

    const { isAuthorized } = useAppSelector(state => state.userReducer);

    function logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    //items for profile dropdown
    const items = [
        { label: <Link to={"/ordersList"} className='a_menu_label'><img className='icon_dropdown' src='orders.png' />Заказы</Link>, key: 'ordersList' },
        { label: <Link to={"/settings"} className='a_menu_label'><img className='icon_dropdown' src='settings.png' />Настройки</Link>, key: 'settings' },
        { label: <Link to={"/"} className='a_menu_label' onClick={logOut}><img className='icon_dropdown' src='logout.png' />Выйти</Link>, key: 'exit' },
    ];
    return (
        <>
            <header>
                <div className='logo'>
                    <Logo />
                </div>
                <ul className="navbar">
                    <li><NavLink to={"/"}>Главная</NavLink> </li>
                    <li><NavLink to={"/poll"}>Подбор растения</NavLink></li>
                    <li><NavLink to={"/about"}>О нас</NavLink></li>
                </ul>
                <div className='icons_header'>
                    {
                        isAuthorized
                            ?
                            <Dropdown className='dropdown_profile' menu={{ items }} trigger={['click']} >
                                <img src='account.svg' className='btn_profile' />
                            </Dropdown>
                            :
                            <Button type='primary' onClick={() => { setLoginActive(true) }} className='btn_login'>Войти</Button>
                    }
                    <Link to={"/favorites"}><img width={32} src='favorite_header.png' /></Link>
                    <Link to={"/cart"}><img src='cart.png' className='btn_cart' /></Link>
                </div>
            </header >
            <hr className='line_header' />
        </>
    )
}


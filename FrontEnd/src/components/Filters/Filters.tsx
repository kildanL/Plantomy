import { useEffect, useState } from 'react'
import { Button, Select, InputNumber, ConfigProvider, Radio, RadioChangeEvent } from 'antd'
import './Filters.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { filterSlice } from '../../store/reducers/filterSlice';

//* Function of this component:
//*
//* change filter and order by states in filterSlice 
//*
export function Filter(): JSX.Element {

    const { filter } = useAppSelector(state => state.FilterReducer);

    const { cost, type, sort } = filter;
    const [minPrice, setFromPrice] = useState<number | null>(cost.min);
    const [maxPrice, setToPrice] = useState<number | null>(cost.max);
    const dispatch = useAppDispatch();

    //FIXME get real price value
    const minPriceValue = 650;
    const maxPriceValue = 5999;

    function resetFilter() {
        dispatch(filterSlice.actions.resetFilter());
        setFromPrice(null);
        setToPrice(null);
    }

    useEffect(() => {
        resetFilter()
    }, [])

    // items of sort dropdown
    const items: { label: string, value: number }[] = [
        { label: 'Популярные', value: 0 },
        { label: 'Новинки', value: 1 },
        { label: 'Сначала дешевые', value: 2 },
        { label: 'Сначала дорогие', value: 3 },
    ];

    //change productType state to selected
    function ChangeType(e: RadioChangeEvent) {
        dispatch(filterSlice.actions.changeType(e.target.value));
    }

    // change sortBy state to selected by Select
    function sortProducts(value: number) {
        dispatch(filterSlice.actions.changeSort(value));
    };

    //FIXME mb remove local states minPrice and maxPrice and dispatch them 
    function changeMinPrice(value: any) {
        setFromPrice(value);
    }

    function changeMaxPrice(value: any) {
        setToPrice(value);
    }

    function filterPrice() {
        dispatch(filterSlice.actions.changeMinPrice(minPrice!));
        dispatch(filterSlice.actions.changeMaxPrice(maxPrice!));
    }

    return (
        <aside className='filter'>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: 'Montserrat',
                        fontSize: 20,
                        colorPrimary: '#F19173',
                        colorBgBase: '#F19173',
                        // colorText:'#FFFFFF',
                        colorBgElevated: '#FFFFFF',
                        // colorTextBase:'#FFFFFF',
                        // colorTextPlaceholder:'#000000',
                        colorTextPlaceholder: '#FFFFFF',
                        colorTextDisabled: '#FFFFFF',
                    }
                }}
            >
                <Select className="dropdown" options={items} value={sort} onSelect={sortProducts} />
            </ConfigProvider>
            <Radio.Group onChange={ChangeType} value={type} className='radio_group_filter'>
                <Radio.Button value={1} className='radio_plant_filter'>
                    <img className='img_plant' src="/plant.svg" />
                    Растения
                </Radio.Button>
                <Radio.Button value={2} className='radio_cachepot_filter'>
                    <img className='img_cachepot' src="/cachepot.svg" />
                    Кашпо
                </Radio.Button>
            </Radio.Group>
            {type === 1 &&
                <div className="careComplexity">
                    {/* TODO should be radio */}
                    <h3>Сложность ухода</h3>
                    <img className='img_easy' src="/easy.svg" alt="easy" />
                    <img className='img_middle' src="/middle.svg" alt="middle" />
                    <img className='img_hard' src="/hard.svg" alt="hard" />
                </div>
            }
            <div className='cont_price_editor'>
                <h3 className='h_price_editor'>Цена, ₽</h3>
                <div className='price_editor'>
                    <InputNumber className='btn_from' placeholder={minPriceValue.toString()} controls={false}
                        min={minPriceValue} max={maxPriceValue}
                        onChange={changeMinPrice} value={minPrice} />
                    <img className='line' src='/Line.svg' />
                    <InputNumber className='btn_to' placeholder={maxPriceValue.toString()} controls={false}
                        min={minPriceValue} max={maxPriceValue}
                        onChange={changeMaxPrice} value={maxPrice} />
                    <Button className='btn_ok' onClick={filterPrice}>ок</Button>
                </div>
            </div>
            <button onClick={resetFilter} className="btn_reset_filters">Сбросить фильтры</button>
        </aside >
    )
}

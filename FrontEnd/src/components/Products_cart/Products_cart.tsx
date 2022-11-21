import React, { useState } from 'react'
import { data } from '../../zDataExamples/Data';
import { TCard } from '../../types';
import { ProductCard_cart } from '../ProductCard_cart';
import { ProductCard_mini } from '../ProductCard_mini'
// import "./style.css"

//* Function of this component:
//*
//* Display list of product elements. Shopping cart version
//*
export function Products_cart(): JSX.Element {

    //TODO get data from props
    //get cards data from backend 
    const [cards, setCards] = useState<TCard[]>(data);

    const cardsList: JSX.Element[] = cards.map((card: TCard) => {
        return (
            <ProductCard_cart key={card.id} {...card} />
        )
    })

    return (
        <aside className='products_cart'>
            {cardsList}
        </aside>
    )
}

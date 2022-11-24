import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accessories } from '../../components/Accessories'
import { ProductCard } from '../../components/ProductCard'
import { data } from '../../zDataExamples/Data'
import { TCard } from '../../types'
// import './PlantPage.scss'

export function ProductPage(): JSX.Element {

    //TODO get selected product (card) from db
    
    const [cards, setCards] = useState<TCard[]>(data);

    const { id } = useParams();
    const productID: number = id ? (+id.split(":")[1] - 1) : 0; // FIXME
    const card = cards[productID];

    return (
        <article>
            <ProductCard key={card.id} {...card} />
            {/* <Accessories /> */}
        </article>
    )
}
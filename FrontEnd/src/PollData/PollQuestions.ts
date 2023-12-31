import { TPollQuestion } from "../types";

export const questions: TPollQuestion[] = [
    {
        id: 1,
        title: 'Как часто вы сможете поливать растение?',
        info: '',
        value: 'watering',
        image: '/1question.png',
        options: [
            {
                title: 'Редко',
                value: 1,
                description: 'Раз в месяц - раз в неделю'
            },
            {
                title: 'Периодически',
                value: 2,
                description: 'Раз в неделю - пару раз в неделю'
            },
            {
                title: 'Часто',
                value: 3,
                description: 'Несколько раз в неделю - раз в день'
            }
        ]
    },
    {
        id: 2,
        title: 'Как много света попадает в вашу квартиру?',
        info: '',
        value: 'lighting',
        image: '/2question.png',
        options: [
            {
                title: 'Мало',
                value: 1,
                description: 'Окна выходят на север или что-то мешает свету попадать в вашу квартиру'
            },
            {
                title: 'Умеренно',
                value: 2,
                description: 'Окна выходят на запад или восток. В квартиру попадают непрямые лучи света'
            },
            {
                title: 'Много',
                value: 3,
                description: 'Окна выходят на юг. Весь день в квартиру попадают прямые лучами света'
            },
        ]
    },
    {
        id: 3,
        title: 'Насколько жарко у вас дома?',
        info: 'Зимой растениям нужна более низкая температура',
        value: 'temperature',
        image: '/3question.png',
        options: [
            {
                title: 'Прохладно',
                value: 1,
                description: '15-22'
            },
            {
                title: 'Тепло',
                value: 2,
                description: '18-25'
            },
            {
                title: 'Жарко',
                value: 3,
                description: '25-30'
            },
            {
                title: 'Не знаю',
                value: 0,
                description: 'Температура часто меняется'
            }
        ]
    },
    {
        id: 4,
        title: 'Какую влажность воздуха вы сможете обеспечить для растений?',
        info: '',
        value: 'humidity',
        image: '/4question.png',
        options: [
            {
                title: 'Низкую',
                value: 1,
                description: 'Подойдет для обычных квартир. Растение может жить при низкой влажности'
            },
            {
                title: 'Среднюю',
                value: 2,
                description: 'Подойдет для обычных квартир, но нужно использовать распылитель'
            },
            {
                title: 'Высокую',
                value: 3,
                description: 'Можно поставить в ванную. Или придется постоянно использовать распылитель'
            },
            {
                title: 'Не знаю',
                value: 0,
                description: ''
            }
        ]
    },
    {
        id: 5,
        title: 'Как часто вы сможете удобрять растения?',
        info: 'Активно удобрять нужно лишь в определенные периоды ~ несколько месяцев в году',
        value: 'fertilization',
        image: '/5question.png',
        options: [
            {
                title: 'Редко',
                value: 1,
                description: 'Раз в месяц'
            },
            {
                title: 'Периодически',
                value: 2,
                description: 'Раз в 2 недели'
            },
            {
                title: 'Часто',
                value: 3,
                description: 'Пару раз в неделю'
            }
        ]
    },
    {
        id: 6,
        title: 'Сколько места вы готовы выделить под растение?',
        info: '',
        value: 'size',
        image: '/6question.png',
        options: [
            {
                title: 'Мало',
                value: 1,
                description: 'Поставить на полку или на небольшой подоконник'
            },
            {
                title: 'Немного',
                value: 2,
                description: 'Поставить на обычный подоконник'
            },
            {
                title: 'Много',
                value: 3,
                description: 'Поставить на пол'
            }
        ]
    },
    {
        id: 7,
        title: 'Какие у вас есть предпочтения?',
        info: '',
        value: 'preferences',
        image: '/7question.png',
        options: [
            {
                title: 'Нейтральные растения',
                value: 1,
                description: ''
            },
            {
                title: 'Красивые цветки',
                value: 2,
                description: ''
            },
            {
                title: 'Свисающие стебли',
                value: 3,
                description: ''
            },
            {
                title: 'Есть плоды',
                value: 4,
                description: ''
            },
            {
                title: 'Красивые листья',
                value: 5,
                description: ''
            },
            {
                title: 'Все нравится',
                value: 0,
                description: ''
            }
        ]
    },
    {
        id: 8,
        title: 'Сколько вы готовы потратить на растение?',
        info: '',
        value: 'cost',
        image: '/8question.png',
        options: [
            {
                title: 'Немного',
                value: 1,
                description: 'менее 1000 рублей'
            },
            {
                title: 'Достаточно',
                value: 2,
                description: 'от 1000 до 2500 рублей'
            },
            {
                title: 'Много',
                value: 3,
                description: 'более 2500 рублей'
            },
            {
                title: 'Цена не имеет значения',
                value: 0,
                description: ''
            }
        ]
    }
]
import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export function Logo(): JSX.Element {
    return (
        <Link to={"/"}>
            <div className="logo">
                <img src="Logo.svg" alt="logo" />
                {/* <h1>PLANTOMY</h1> */}
            </div>
        </Link>
    )
}

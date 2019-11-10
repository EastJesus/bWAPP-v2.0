import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'

export function PrivateRoute ({component: Component, render: Render, ...rest}) {
    return (
        <Route {...rest} 
        render={props => 
            localStorage.token != 'null' ?
            (
                Render ? (
                    Render(props)
                ) : Component ?
                (<Component {...props} />) : null
            )
            : (
                <Redirect
                    to="/competence_center/access_denied/"
                />    
            )
        }  
    /> 
    )             
}
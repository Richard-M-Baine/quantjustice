import { NavLink } from 'react-router-dom';
import React from 'react'




import './misconductCard.css'

function MisconductCard({ misconduct }) {

  



  
    
    return  (
        <div className='misconductCardMainDiv'>
            <h3>{misconduct.rank} {misconduct.firstName} {misconduct.lastName}</h3>
            <h4>{misconduct.office} {misconduct.country}</h4>
            <NavLink to={`/misconduct/${misconduct.id}${misconduct.dataSet}`}>click for more info</NavLink>
        </div>


    )
}


export default MisconductCard
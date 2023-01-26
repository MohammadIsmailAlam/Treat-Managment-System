import React from 'react'

export default function Limits( {setbudget, settime} ) {
  

  return (
    <div className='limits'>
      <div className='budget mb-3'>
        <label htmlFor="budge floatingInputt"> Budget Limit</label> 
        <input type="number" id='budget' className='form-control' 
        onChange={(event) => { 
          event.preventDefault();
          setbudget(event.target.value)}}/>
      </div>

      <div className='time mb-3'>
        <label htmlFor="time floatingInputt"> Time Limit</label>
        <input type="time" id='time' className='form-control' 
        onChange={(event) => {
          event.preventDefault();
          settime(event.target.value)}}/>
      </div>
      
    </div>
    
  )
}


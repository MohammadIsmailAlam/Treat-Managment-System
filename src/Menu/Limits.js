import React from 'react'

export default function Limits( {setbudget, settime} ) {
  

  return (
    <div className='limits'>
      <div className='budget'>
        <label htmlFor="budget"> Budget Limit</label> 
        <input type="number" id='budget' className='budget' 
        onChange={(event) => { 
          event.preventDefault();
          setbudget(event.target.value)}}/>
      </div>

      <div className='time'>
        <label htmlFor="time"> Time Limit</label>
        <input type="time" id='time' className='time' 
        onChange={(event) => {
          event.preventDefault();
          settime(event.target.value)}}/>
      </div>
      
    </div>
    
  )
}


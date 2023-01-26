import React from 'react'

export default function Limits( {setbudget, settime, budgetError, timeError, setBudgetError,setTimeError} ) {
  

  return (
    <div className='limits'>
      <div className='budget mb-3'>
        <label htmlFor="budge floatingInputt"> Budget Limit</label> 
        <input type="number" id='budget' className='form-control' 
        onChange={(event) => { 
          event.preventDefault();
          setbudget(event.target.value)
          setBudgetError(false)
          }}/>

          {
            budgetError &&

            <div className="error" style={{color:'red', marginTop:'10px'}}> Budget Can't Be Empty</div>
          }
      </div>

      <div className='time mb-3'>
        <label htmlFor="time floatingInputt"> Time Limit</label>
        <input type="time" id='time' className='form-control' 
        onChange={(event) => {
          event.preventDefault();
          settime(event.target.value)
          setTimeError(false)
          }}/>

          {
            timeError &&

            <div className="error" style={{color:'red', marginTop:'10px'}}> Time Can't Be Empty</div>
          }
      </div>
      
    </div>
    
  )
}


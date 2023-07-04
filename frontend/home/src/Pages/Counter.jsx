import React, {useState} from 'react'


function Counter() {
    const [counter, setCounter] = useState(0);

    const increamentCounter = () => {
        setCounter((prevcount) => prevcount + 1)
    };

    const decreamentCounter = () => {
        setCounter((prevcount) => prevcount - 1)
    };


  return (
    <div className='flex justify-center'>

        <h1>Counter</h1>

        <button data-testid="increament" onClick={increamentCounter}>+</button>
        <h1 data-testid="counter">{counter}</h1>
        <button onClick={decreamentCounter}>-</button>




    </div>
  )
}

export default Counter
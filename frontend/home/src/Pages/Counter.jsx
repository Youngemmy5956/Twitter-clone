import React, {useState} from 'react'

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prevcount) => prevcount + 1)
    };

    const decrement = () => {
        setCount((prevcount) => prevcount - 1)
    };


  return (
    <div className='flex justify-center'>

        <h1>Counter</h1>

        <button onClick={increment}>+</button>
        <h1>{count}</h1>
        <button onClick={decrement}>-</button>




    </div>
  )
}

export default Counter
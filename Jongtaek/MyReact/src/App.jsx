import React, {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('apple');
  console.log(count, text);
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1);
        }}>+</button>
      <div id="counter">
        count {count}
      </div>
      <div>{text}</div>
      <input onChange={e => setText(e.target.value)} />
    </div>
  )
}
import React, {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('apple');
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1);
        }}>+</button>
      <div>
        count {count}
      </div>
      <div>{text}</div>
      <input onChange={e => setText(e.target.value)} />
    </div>
  )
}
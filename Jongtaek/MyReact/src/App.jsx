import React, {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(1);
  return (
    <div>
      count {count}
    </div>
  )
}
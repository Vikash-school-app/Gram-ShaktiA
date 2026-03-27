import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Vite + React + TypeScript</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is: {count}
        </button>
        <p>
          <code>src/App.tsx</code> को एडिट करें और बदलाव देखें।
        </p>
      </div>
      <p style={{ color: '#888' }}>
        Vite और React के बारे में और जानने के लिए उनके लोगो पर क्लिक करें।
      </p>
    </div>
  )
}

export default App

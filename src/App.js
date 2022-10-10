import React, { useEffect, useState } from 'react';
import './App.css';
//import { height, HeightContext } from './HeightContext';
import Header from './Header'
import ThreeScene from './three/ThreeScene';

export const HeightContext = React.createContext()

function App() {
  const [height, setHeight] = useState({
    firstHeight: 1,
    secondHeight: 1
  })

  const settingHeight = (firstHeight, secondHeight) => {
    setHeight({
      firstHeight: firstHeight,
      secondHeight: secondHeight
    })
  }

  return (
    <div>
      <HeightContext.Provider value={height} >
        <Header setHeight={settingHeight} />
        <ThreeScene />
      </HeightContext.Provider>
    </div>
  );
}

export default App;

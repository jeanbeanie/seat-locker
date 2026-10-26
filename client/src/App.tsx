import { useState } from 'react'
import './App.css'
import SeatMap from './components/SeatMap';

function App() {
  
  return (
    <>
      <section id="center">
        <h1>Seat Locker Demo</h1>
        <SeatMap/>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App

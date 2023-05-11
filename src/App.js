import React from 'react'
import Dice from './components/Dice'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.ceil(Math.random() * 100000)
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 9; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => <Dice id={die.id} key={die.id} value={die.value} isHeld={die.isHeld} holdDice={holdDice} />)


  return (
    <main>
      <div className="text-container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>  
      <div className="dice-container">
        {diceElements}
        <button className="roll-dice" onClick={rollDice}>Roll</button>
      </div>
    </main>
  );
}
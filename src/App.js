import React from 'react'
import Dice from './components/Dice'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 9; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: Math.random() * 100000
      })
    }
    return newDice
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld} />)


  return (
    <main>
      <div className="dice-container">
        {diceElements}
        <button className="roll-dice" onClick={rollDice}>Roll</button>
      </div>
    </main>
  );
}
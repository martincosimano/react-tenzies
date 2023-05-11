import React from 'react'
import Dice from './components/Dice'
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.ceil(Math.random() * 100000)
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
      }
    }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => <Dice id={die.id} key={die.id} value={die.value} isHeld={die.isHeld} holdDice={holdDice} />)

  return (
    <main>
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice show the same value. Click to hold a die.</p>
    <div className="dice-container">
        {diceElements}
    </div>
    <button 
        className="roll-dice" 
        onClick={rollDice}
    >
        {tenzies ? "New Game" : "Roll"}
    </button>
</main>
  );
}
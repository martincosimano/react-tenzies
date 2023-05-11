import React from 'react'
import Dice from './components/Dice'
import Confetti from 'react-confetti'

const faces = {
  1: '🍕',
  2: '👻',
  3: '😾',
  4: '👽',
  5: '🤡',
  6: '🌼'
}

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  console.log(faces[1])

  function generateNewDie() {
    const value = Math.ceil(Math.random() * 6)
    return {
      value: faces[value],
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
      setCount(prevCount => prevCount = -1)
      setDice(allNewDice())
      }
      return setCount(prevCount => prevCount +1)
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
    <h1 className="title">Emoji Tenzies</h1>
    <p className="instructions">Roll until all dice show the same value. Click to hold a die.</p>
    <div className="dice-container">
        {diceElements}
    </div>
    <p className="roll-count">Dice rolls: <span className="count">{count}</span></p>
    <button 
        className="roll-dice" 
        onClick={rollDice}
    >
        {tenzies ? "New Game" : "Roll"}
    </button>
</main>
  );
}
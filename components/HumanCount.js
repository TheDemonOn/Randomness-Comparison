import React, { useContext, createContext } from 'react'

const humanArray = createContext()

// humanGeneration is an array of the inputed values
function HumanCount({ humanGeneration = [] }) {
	return <humanArray.Provider value={humanGeneration}></humanArray.Provider>
}

export default HumanCount

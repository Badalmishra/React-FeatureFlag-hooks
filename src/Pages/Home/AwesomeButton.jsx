import React from 'react'
import { useFlagHook } from '../../FeatureFlag'

const AwesomeButton = () => {
    const {  role } = useFlagHook()
    const handleAwesomeness = ()=>{
        alert('you have unlocked awesomeness')
    }
    return (
        <button onClick={handleAwesomeness}>I am Awesome {role}</button>
    )
}

export default AwesomeButton

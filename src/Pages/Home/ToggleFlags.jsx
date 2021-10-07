import React from 'react'
import { useFlagHook } from '../../FeatureFlag'

const ToggleFlags = () => {
    const {  role, updateContext } = useFlagHook()
    const nextRole = role==='admin'?'user':'admin'
    const callBack = (newFeatureFlags,role)=>{
        console.log('@callBack: newFeatureFlags',newFeatureFlags,'role',role)
    }
    const handleToggle =()=> {
        updateContext(nextRole,callBack)
    }
    return (
        <button onClick={handleToggle}>Switch to {nextRole} permissions</button>
    )
}

export default ToggleFlags

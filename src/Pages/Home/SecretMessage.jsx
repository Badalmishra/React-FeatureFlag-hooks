import React from 'react'
import { useGuardHook } from '../../FeatureFlag'

const SecretMessage = () => {
    const hasPermission = useGuardHook('message')
    return (
        hasPermission ?<h1>Secret message for user</h1>:null
    )
}

export default SecretMessage

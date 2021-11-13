import React from 'react'
import { useGuardHook } from '../../FeatureFlag'
import { Fallback } from './Fallback'

const SecretMessage = () => {
    const hasPermission = useGuardHook('message')
    return (
        hasPermission ?<h3>This is a secret message for user role</h3>:<Fallback/>
    )
}

export default SecretMessage

import React from 'react'
import { FeatureFlagContext } from '.'
/**
 * Custom hook for FeatureFlagContext
 * @returns context values and update function
 */
const useFlagHook = () => {
    const { data: { featureFlags,role }, updateContext } = React.useContext(FeatureFlagContext)

    return (
        {featureFlags,role,updateContext}
    )
}
const useGuardHook = (permission) => {
    const { data: { featureFlags }} = React.useContext(FeatureFlagContext)

    return (
        featureFlags? featureFlags[permission] : false
    )
}

export { useFlagHook, useGuardHook}

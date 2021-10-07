# React FeatureFlag Hooks and wrapper

# Hooks 
### useFlagHook
### useGaurdHook
##### usage useGaurdHook('awesome-button') | return boolean
# update feature flags on the fly
### The useFlagHook give updateContext method 
# callback after each update
### the updateContext accepts callback as second parameter
### this callback gets newFeatureFlags and new role as parameters
# Wrapper component <Gaurd> with support of fallback component
### Renders children only if flag prop is true for current role
### If fallback prop is provided and flag prop is false for current role, renders fallback
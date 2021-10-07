import {  useFlagHook } from ".."
import PropTypes from "prop-types";
/**
 * Secures a component | renders only if permissions are sufficient
 * @param {Element} children this component will only be rendered if permissions are sufficient
 * @param {string} flag this flag key must have a value of `true` for the children to be rendered
 * @param {boolean | Element} fallback this component will if permissions are not sufficient
 * @returns Children | fallback | null
 */
const Gaurd = ({ children, flag, fallback = null }) => {
  const {featureFlags } = useFlagHook()
  if (featureFlags && featureFlags[flag]) {
    return children
  } else {
    return fallback
  }
}
Gaurd.propTypes = {
    flag:PropTypes.string,
    fallback:PropTypes.oneOfType([PropTypes.bool,PropTypes.element])
}
export {Gaurd}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gaurd = void 0;

var _ = require("..");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Secures a component | renders only if permissions are sufficient
 * @param {Element} children this component will only be rendered if permissions are sufficient
 * @param {string} flag this flag key must have a value of `true` for the children to be rendered
 * @param {boolean | Element} fallback this component will if permissions are not sufficient
 * @returns Children | fallback | null
 */
const Gaurd = _ref => {
  let {
    children,
    flag,
    fallback = null
  } = _ref;
  const {
    featureFlags
  } = (0, _.useFlagHook)();

  if (featureFlags && featureFlags[flag]) {
    return children;
  } else {
    return fallback;
  }
};

exports.Gaurd = Gaurd;
Gaurd.propTypes = {
  flag: _propTypes.default.string,
  fallback: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.element])
};
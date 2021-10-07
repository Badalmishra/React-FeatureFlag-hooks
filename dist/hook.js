"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGuardHook = exports.useFlagHook = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Custom hook for FeatureFlagContext
 * @returns context values and update function
 */
const useFlagHook = () => {
  const {
    data: {
      featureFlags,
      role
    },
    updateContext
  } = _react.default.useContext(_.FeatureFlagContext);

  return {
    featureFlags,
    role,
    updateContext
  };
};

exports.useFlagHook = useFlagHook;

const useGuardHook = permission => {
  const {
    data: {
      featureFlags
    }
  } = _react.default.useContext(_.FeatureFlagContext);

  return featureFlags ? featureFlags[permission] : false;
};

exports.useGuardHook = useGuardHook;
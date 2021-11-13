"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureFlagProvider = exports.FeatureFlagContext = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FeatureFlagContext = /*#__PURE__*/_react.default.createContext(null);
/**
 * Makes feautue flags available to all the component in its context
 * @param {string} initialRoleName | note: changing this prop will not update feature flags on the fly, this is just for the initial load
 * @param {Object} featureFlagsDictionary  key value pair of {role_name:featureFlags}
 * @returns FeatureFlagContext
 */


exports.FeatureFlagContext = FeatureFlagContext;

const FeatureFlagProvider = _ref => {
  let {
    children,
    initialRoleName,
    featureFlagsDictionary
  } = _ref;
  const [contextValue, setContextValue] = (0, _react.useState)({
    featureFlags: {},
    role: initialRoleName
  });
  /**
   * Check if the given role is present in featureFlagsDictionary
   * @param {string} role
   * @param {Object} featureFlagsDictionary key value pair of role name : featureFlags
   * @returns {Boolean} does role belongs to featureFlagsDictionary
   */

  const validateRole = (role, featureFlagsDictionary) => {
    if (featureFlagsDictionary) return featureFlagsDictionary.hasOwnProperty(role);else return false;
  };
  /**
   * @callback updateCallback
   * @param {Object} newFeatureFlags
   * @param {string} newRole
   */

  /**
   * Updates the feature flags on the fly from any component
   * @param {string} role role whose feature flags should be loaded
   * @param {updateCallback} [cb] runs after featureFlags are update
   */


  const updateContext = async (role, cb) => {
    /** Get new set of permissions based on view mode */
    try {
      if (validateRole(role, featureFlagsDictionary)) {
        const newFeatureFlags = _objectSpread(_objectSpread({}, featureFlagsDictionary._common), featureFlagsDictionary[role]);

        setContextValue({
          featureFlags: newFeatureFlags,
          role
        });

        if (typeof cb === 'function') {
          cb(newFeatureFlags, role);
        }
      } else {
        console.error("Not a valid role name, you can only pass these role names", Object.keys(featureFlagsDictionary));
      }
    } catch (error) {
      console.error("something went wrong while updating the feaure flags", error);
    }
  };

  const componentDidMount = () => {
    updateContext(initialRoleName);
  };

  (0, _react.useEffect)(componentDidMount, []);
  return /*#__PURE__*/_react.default.createElement(FeatureFlagContext.Provider, {
    value: {
      data: contextValue,
      updateContext
    }
  }, children);
};

exports.FeatureFlagProvider = FeatureFlagProvider;
FeatureFlagProvider.propTypes = {
  initialRoleName: _propTypes.default.string,
  featureFlagsDictionary: _propTypes.default.object
};
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
export const FeatureFlagContext = React.createContext(null);
/**
 * Makes feautue flags available to all the component in its context
 * @param {string} initialRoleName | note: changing this prop will not update feature flags on the fly, this is just for the initial load
 * @param {Object} featureFlagsDictionary  key value pair of {role_name:featureFlags}
 * @returns FeatureFlagContext
 */
const FeatureFlagProvider = ({
  children,
  initialRoleName,
  featureFlagsDictionary,
}) => {
  const [contextValue, setContextValue] = useState({
    featureFlags: {},
    role: initialRoleName,
  });

  /**
   * Check if the given role is present in featureFlagsDictionary
   * @param {string} role
   * @param {Object} featureFlagsDictionary key value pair of role name : featureFlags
   * @returns {Boolean} does role belongs to featureFlagsDictionary
   */
  const validateRole = (role, featureFlagsDictionary) => {
    if (featureFlagsDictionary)
      return featureFlagsDictionary.hasOwnProperty(role);
    else return false;
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
        const newFeatureFlags = featureFlagsDictionary[role];

        setContextValue({ featureFlags: newFeatureFlags, role });
        if (typeof cb === 'function') {
          cb(newFeatureFlags, role);
        }
      } else {
        console.error(
          "Not a valid role name, you can only pass these role names",
          Object.keys(featureFlagsDictionary)
        );
      }
    } catch (error) {
      console.error(
        "something went wrong while updating the feaure flags",
        error
      );
    }
  };
  const componentDidMount = () => {
    updateContext(initialRoleName);
  };
  useEffect(componentDidMount, []);

  return (
    <FeatureFlagContext.Provider value={{ data: contextValue, updateContext }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
FeatureFlagProvider.propTypes = {
  initialRoleName: PropTypes.string,
  featureFlagsDictionary: PropTypes.object,
};
export { FeatureFlagProvider };

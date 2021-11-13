import React from "react";
import { useFlagHook } from "../../FeatureFlag";

const AwesomeButton = () => {
  const { role } = useFlagHook();
  const handleAwesomeness = () => {
    alert("you have unlocked awesomeness");
  };
  return (
    <div>
      <button onClick={handleAwesomeness}>I am Awesome {role}</button>
    </div>
  );
};

export default AwesomeButton;

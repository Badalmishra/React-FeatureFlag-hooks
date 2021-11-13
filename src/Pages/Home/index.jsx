import React from "react";
import { Gaurd } from "../../FeatureFlag";
import AwesomeButton from "./AwesomeButton";
import SecretMessage from "./SecretMessage";
import Strory from "./Strory";
import ToggleFlags from "./ToggleFlags";
import { Fallback } from "./Fallback";

const Home = () => {
  const style = {padding:'1rem',border:'1px dashed grey',borderRadius:'8px', background:'wheat'}
  return (
    <div>
      <ToggleFlags />
      <hr />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={style}>
          <code>1. With &lt;Gaurd /&gt; Wrapper, only visible for admin role </code>
          <Gaurd fallback={<Fallback />} flag="awesomebutton">
            <AwesomeButton />
          </Gaurd>
        </div>

        <div style={style}>
          <code>2. With useGuardHook, only visible for user role</code>
          <SecretMessage />
        </div>

        <div style={style}>
          <code>3. Common flag, visible for every role</code>
          <Gaurd fallback={<Fallback />} flag="story">
            <Strory />
          </Gaurd>
        </div>
      </div>
    </div>
  );
};

export default Home;

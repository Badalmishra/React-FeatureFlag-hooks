# React FeatureFlag Hooks and wrapper

### Hooks 
* useFlagHook
* useGaurdHook
* usage useGaurdHook('awesome-button') | return boolean
### update feature flags on the fly
* The useFlagHook give updateContext method 
### callback after each update
* the updateContext accepts callback as second parameter
* this callback gets newFeatureFlags and new role as parameters
### Wrapper component <Gaurd> with support of fallback component
* Renders children only if flag prop is true for current role
* If fallback prop is provided and flag prop is false for current role, renders fallback
#### Demo
[See Demo on Sandbox](https://codesandbox.io/s/react-feature-flags-hooks-64n45?file=/src/Page/Home/ToggleFlags.jsx)
### App.js
```js
import { FeatureFlagProvider } from 'featureflag-hooks';
import Home from './Pages/Home';

const flagList = {
    _common:{
        story:true,
        awesomebutton:true,
        message:true
    },
    admin:{
        message:false /** Message will not be shown to admin*/
    },
    user:{
        awesomebutton:false /** AwesomeButton will not be shown to users*/
    }
}

function App() {
  return (
    <FeatureFlagProvider initialRoleName='admin' featureFlagsDictionary={flagList} >
      <Home/>
    </FeatureFlagProvider>
  );
}

export default App;
```
### Home.js
* using the Gaurd wrapper
```JS
import React from "react";
import { Gaurd } from 'featureflag-hooks';
import AwesomeButton from "./AwesomeButton";
import SecretMessage from "./SecretMessage";
import ToggleFlags from "./ToggleFlags";
import { Fallback } from "./Fallback";
import Strory from "./Strory";

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
```
### SecretMessage.jsx
* using the useGaurdHook
```JS
import { useGuardHook } from 'featureflag-hooks'
import { Fallback } from './Fallback'

const SecretMessage = () => {
    const hasPermission = useGuardHook('message')
    return (
        hasPermission ?<h3>This is a secret message for user role</h3>:<Fallback/>
    )
}

export default SecretMessage
```
### ToggleFlags.jsx
* using the updateContext method via useFlagHook
```js
import React from 'react'
import { useFlagHook } from 'featureflag-hooks'

const ToggleFlags = () => {
    const {  role, updateContext } = useFlagHook()
    const nextRole = role==='admin'?'user':'admin'
    const callBack = (newFeatureFlags,role)=>{
        console.log('@callBack: newFeatureFlags',newFeatureFlags,'role',role)
    }
    const handleToggle =()=> {
        updateContext(nextRole,callBack)
    }
    return (
        <button onClick={handleToggle}>Switch to {nextRole} permissions</button>
    )
}

export default ToggleFlags
```
### Output
![Output with console logs](Screenshot1.2.png "Output")
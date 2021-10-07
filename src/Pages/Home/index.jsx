import React from 'react'
import { Gaurd } from '../../FeatureFlag'
import AwesomeButton from './AwesomeButton'
import SecretMessage from './SecretMessage'
import ToggleFlags from './ToggleFlags'
const fallback = <h1>Opps you don't have the permissions</h1>
const Home = () => {
    return (
        <div>
             /** With &lt;Gaurd /&gt; Wrapper */
            <Gaurd fallback={fallback} flag='awesomebutton'>
                <AwesomeButton/>
            </Gaurd>
            <hr/>
            /** With useGuardHook */
            <SecretMessage/>
            <hr/>
            <ToggleFlags/>
        </div>
    )
}

export default Home

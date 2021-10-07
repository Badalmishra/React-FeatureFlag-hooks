
import { FeatureFlagProvider } from './FeatureFlag';
import { flagList } from './flaglist';
import Home from './Pages/Home';

function App() {
  return (
    <FeatureFlagProvider initialRoleName='admin' featureFlagsDictionary={flagList} >
      <Home/>
    </FeatureFlagProvider>
  );
}

export default App;

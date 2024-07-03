import {NavigationContainer} from '@react-navigation/native';
import StackNav from "./Screens/StackNav";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
      </SafeAreaProvider>

  );
}

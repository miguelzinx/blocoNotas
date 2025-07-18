import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import Sidebar from './components/sidebar'
const Drawer = createDrawerNavigator()
const App = () => {
 return (
 <Drawer.Navigator
 initialRouteName="Main"
 drawerContent={props => <Sidebar {...props} />}
 screenOptions={{
 headerShown: false,
 drawerType: 'back',
 overlayColor: '#00000000'
 }}
 >
 <Drawer.Screen name="Main" component={MainScreen} />
 </Drawer.Navigator>
 )
}
export default App
import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import UserScreen from '../Containers/UserScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  UserScreen: { screen: UserScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

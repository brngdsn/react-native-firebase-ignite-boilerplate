import React, { Component } from 'react'
import autoBind from 'react-autobind'
// import { connect } from 'react-redux'
import { ScrollView, Text, Image, View } from 'react-native'
import firebase from 'react-native-firebase';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class UserScreen extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      busy: false
    }
  }
  onLogout () {
    this.props.navigation.navigate('LaunchScreen')
  }
  render () {
    const { onLogout } = this
    const { busy } = this.state
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.centered}>
            <Text style={{
              color: '#eee',
              fontSize: 25,
              paddingTop: 25,
              paddingBottom: 25
            }}>LOGGED IN YAY</Text>
          </View>
          <Button
            title='Logout'
            onPress={onLogout}
            disabled={busy}
            loading={busy}
          />
        </ScrollView>
      </View>
    )
  }
}

// export const mapStateToProps = state => ({
//   user: state.user.toJS()
// })

// export default connect(mapStateToProps, null)(UserScreen)

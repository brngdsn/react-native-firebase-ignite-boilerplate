import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { ScrollView, Text, Image, View } from 'react-native'
import firebase from 'react-native-firebase';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      user: {},
      busy: false,
      username: null,
      password: null,
      loggedIn: false,
      usernameError: false,
      passwordError: false
    }
  }
  onUsername (username) {
    return this.setState({
      username: username
    })
  }
  onPassword (password) {
    return this.setState({
      password: password
    })
  }
  async onLogin () {
    const { username, password } = this.state
    this.setState({
      busy: true
    })
    const user = await firebase.auth().signInWithEmailAndPassword(username, password)
    if (!user) {
      this.setState({
        busy: false,
        usernameError: true,
        passwordError: true
      })
    } else {
      this.setState({
        busy: false,
        loggedIn: true,
        user: user,
        usernameError: false,
        passwordError: false
      })
      this.props.navigation.navigate('UserScreen')
    }
    this.setState({
      busy: false
    })
  }
  render () {
    const { onUsername, onPassword, onLogin } = this
    const { usernameError, passwordError, busy } = this.state
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.loginContainer}>

            <FormLabel labelStyle={styles.labelStyle}>Username</FormLabel>
            <FormInput onChangeText={onUsername} autoCapitalize={'none'} />
            {usernameError && <FormValidationMessage>No such username.</FormValidationMessage>}

            <FormLabel labelStyle={styles.labelStyle}>Password</FormLabel>
            <FormInput onChangeText={onPassword} autoCapitalize={'none'} secureTextEntry={true} />
            {passwordError && <FormValidationMessage>Password incorrect.</FormValidationMessage>}

          </View>
          <Button
            title='Login'
            onPress={onLogin}
            disabled={busy}
            loading={busy}
          />
        </ScrollView>
      </View>
    )
  }
}

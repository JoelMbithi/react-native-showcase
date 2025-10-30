/* import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '@/app/LoginScreen'
import { Stack } from 'expo-router'
import RegisterScreen from '@/app/RegisterScreen'
import { createStackNavigator } from '@react-navigation/stack'

const StackNavigator = () => {
    const Stack = createStackNavigator();
  return (
 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})

 */
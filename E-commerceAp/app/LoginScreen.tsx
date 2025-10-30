import React, { useState, useRef } from 'react';
import { Text, KeyboardAvoidingView, View, TextInput, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { loginUser } from '@/services/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading,setLoading] = useState(false)
  const navigation: any = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getInputStyle = (fieldName: string) => {
    return focusedField === fieldName 
      ? "bg-white/30 border-pink-400" 
      : "bg-white/20 border-white/30";
  };

  const handleLogin = async () => {
    setLoading(true)
    try {
      //call login api
      const response = await loginUser({
        email,
        password,
      })

      console.log("Login Response:", response);

      if (response.error){
        //show alert
        alert(response.error)
      }
      else{
        //login successful
        alert("login successful")

        navigation.navigate("index")
      }
    } catch (error) {
      
    }
  }

  return (
    <LinearGradient
      colors={['#ec4899', '#7e22ce']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Section */}
        <View className='flex flex-col mt-10 items-center justify-center'>
          <View className='bg-white/20 p-5 rounded-3xl mb-4'>
            <Image
              source={require('../assets/images/logo2.svg')}
              style={{ width: 80, height: 80 }}
              contentFit="contain"
            />
          </View>
          <Text className='text-5xl font-bold text-white mb-2'>ZuriMart</Text>
          <Text className='text-lg text-pink-200 text-center'>
            Welcome back! Sign in to continue
          </Text>
        </View>
       
        <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center">
          <View className="w-full px-6">
            {/* Form Title */}
            <Text className="text-2xl text-white font-bold text-center mb-8">
              Login to Your Account
            </Text>

            {/* Input Fields */}
            <View className="flex flex-col gap-4">
              {/* Email */}
              <View className={`flex-row items-center border rounded-xl px-4 py-4 ${getInputStyle('email')}`}>
                <MaterialCommunityIcons name="email" size={24} color="white" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  style={{ color: 'white', flex: 1, marginLeft: 12, fontSize: 16 }}
                  placeholder="Email Address"
                  placeholderTextColor="#e5e7eb"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View className={`flex-row items-center border rounded-xl px-4 py-4 ${getInputStyle('password')}`}>
                <Fontisto name="locked" size={24} color="white" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  secureTextEntry={!showPassword}
                  style={{ color: 'white', flex: 1, marginLeft: 12, fontSize: 16 }}
                  placeholder="Password"
                  placeholderTextColor="#e5e7eb"
                  autoCapitalize="none"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={24} 
                    color="white" 
                  />
                </Pressable>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between items-center mt-4">
              <Pressable 
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 border-2 ${rememberMe ? 'bg-pink-400 border-pink-400' : 'border-white'} rounded-md mr-2 flex items-center justify-center`}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
                <Text className="text-white">Remember me</Text>
              </Pressable>

              <Pressable>
                <Text className="text-white font-semibold">Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Action Buttons */}
            <View className="flex flex-col gap-4 mt-8">
              {/* Login Button */}
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Pressable 
                   onPress={handleLogin}
                  className="bg-white rounded-xl p-4 shadow-2xl"
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Text className="text-xl text-purple-700 font-bold text-center">
                    Sign In
                  </Text>
                </Pressable>
              </Animated.View>

              {/* Register Redirect */}
              <Pressable 
                onPress={() => navigation.navigate("RegisterScreen")}
                className="p-4"
              >
                <Text className="text-white text-center text-lg">
                  Don't have an account? <Text className="font-bold underline">Sign up</Text>
                </Text>
              </Pressable>
            </View>

            {/* Social Login Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-white/30" />
              <Text className="text-white mx-4">or continue with</Text>
              <View className="flex-1 h-px bg-white/30" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row justify-center space-x-6">
              <Pressable className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                <Ionicons name="logo-google" size={24} color="white" />
              </Pressable>
              <Pressable className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                <Ionicons name="logo-apple" size={24} color="white" />
              </Pressable>
              <Pressable className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                <Ionicons name="logo-facebook" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
import React, { useState, useRef } from 'react';
import { Text, KeyboardAvoidingView, View, TextInput, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from 'expo-router';
import { registerUser } from '@/services/api';


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [loading,setLoading] = useState(false);
  
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


   const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await registerUser({
        name,
        email,
        password
      })

      console.log("Registration Response:", response);
      if (response.error) {
      // Show some alert or toast
      alert(response.error);
    } else {
      // Registration successful → navigate to LoginScreen
      alert("Registration successful! Please log in.");
      navigation.navigate("LoginScreen");
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
          <Text className='text-5xl font-bold text-white mb-4'>ZuriMart</Text>
          <Text className='text-lg text-pink-200 text-center'>
            Create your account and start shopping
          </Text>
        </View>
       
        <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center">
          <View className="w-full px-6">
            {/* Form Title */}
            <Text className="text-2xl text-white font-bold text-center mb-8">
              Join ZuriMart
            </Text>

            {/* Input Fields */}
            <View className="flex flex-col gap-4">
              {/* Full Name */}
              <View className={`flex-row items-center border rounded-xl px-4 py-4 ${getInputStyle('name')}`}>
                <Ionicons name="person" size={24} color="white" />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  style={{ color: 'white', flex: 1, marginLeft: 12, fontSize: 16 }}
                  placeholder="Full Name"
                  placeholderTextColor="#e5e7eb"
                />
              </View>

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

            {/* Action Buttons */}
            <View className="flex flex-col gap-4 mt-8">
              {/* Register Button */}
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Pressable onPress={handleRegister}
                  className="bg-white rounded-xl p-4 shadow-2xl"
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Text className="text-xl text-purple-700 font-bold text-center">
                    Create Account
                  </Text>
                </Pressable>
              </Animated.View>

              {/* Login Redirect */}
              <Pressable 
                onPress={() => navigation.navigate("LoginScreen")}
                className="p-4"
              >
                <Text className="text-white text-center text-lg">
                  Already have an account? <Text className="font-bold underline">Sign in</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;
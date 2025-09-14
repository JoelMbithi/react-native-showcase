import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
  placeholder: string
  onPress?: () => void
  value?: string
  onChangeText?: (text: string) => void
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  const input = (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-6"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!onPress} // disable typing if it's just pressable
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  )

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{input}</TouchableOpacity>
  }

  return input
}

export default SearchBar

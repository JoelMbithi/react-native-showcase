import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const router = useRouter();

  const userData = {
    name: "Joel Mbithi",
    email: "joellembithi@email.com",
    membership: "Premium Member",
    joinDate: "september",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stats: {
      moviesWatched: 47,
      favorites: 12,
      reviews: 8
    }
  };

  const menuItems = [
    {
      id: 1,
      title: "My Watchlist",
      icon: icons.save,
      onPress: () => console.log("Watchlist")
    },
    {
      id: 2,
      title: "Favorites",
      icon: icons.star,
      onPress: () => console.log("Favorites")
    },
    {
      id: 3,
      title: "Settings",
      icon: icons.star,
      onPress: () => console.log("Settings")
    },
    {
      id: 4,
      title: "Help & Support",
      icon: icons.star,
      onPress: () => console.log("Help")
    },
    {
      id: 5,
      title: "About",
      icon: icons.person,
      onPress: () => console.log("About")
    },
    {
      id: 6,
      title: "Logout",
      icon: icons.arrow,
      onPress: () => console.log("Logout"),
      color: "text-red-500"
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-white mt-4">Profile</Text>
        </View>

        {/* User Profile Card */}
        <View className="bg-secondary rounded-3xl p-6 mb-6 shadow-lg">
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: userData.avatar }}
              className="w-20 h-20 rounded-full border-4 border-accent"
            />
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-white">{userData.name}</Text>
              <Text className="text-gray-300 text-sm">{userData.email}</Text>
              <View className="flex-row items-center mt-1">
                <View className="bg-accent px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-semibold">{userData.membership}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-gray-400 text-sm">
            Member since {userData.joinDate}
          </Text>
        </View>

        {/* Stats Card */}
        <View className="bg-secondary rounded-3xl p-6 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Your Activity</Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-3xl font-bold text-accent">{userData.stats.moviesWatched}</Text>
              <Text className="text-gray-300 text-sm">Watched</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-accent">{userData.stats.favorites}</Text>
              <Text className="text-gray-300 text-sm">Favorites</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-accent">{userData.stats.reviews}</Text>
              <Text className="text-gray-300 text-sm">Reviews</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-secondary rounded-3xl p-1">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-5 py-4 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-700' : ''
              }`}
              onPress={item.onPress}
            >
              <Image
                source={item.icon}
                className="w-6 h-6 tint-white mr-4"
                style={{ tintColor: item.color?.includes('red') ? '#ef4444' : '#9ca3af' }}
              />
              <Text className={`text-lg flex-1 ${item.color || 'text-white'}`}>
                {item.title}
              </Text>
              <Image
                source={icons.star}
                className="w-5 h-5 tint-gray-400"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text className="text-gray-500 text-center mt-8 mb-4">
          MovieApp v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
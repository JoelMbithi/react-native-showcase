import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for saved movies
const mockSavedMovies = [
  {
    id: 1,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    year: "2010",
    rating: 8.8,
    type: "movie"
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: "2008",
    rating: 9.0,
    type: "movie"
  },
  {
    id: 3,
    title: "Stranger Things",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    year: "2016",
    rating: 8.7,
    type: "tv"
  },
  {
    id: 4,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: "2014",
    rating: 8.6,
    type: "movie"
  },
  {
    id: 5,
    title: "The Queen's Gambit",
    poster_path: "/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    year: "2020",
    rating: 8.6,
    type: "tv"
  },
  {
    id: 6,
    title: "La La Land",
    poster_path: "/uDO8zWDhfWwoFdKS4fzkUJt0R7U.jpg",
    year: "2016",
    rating: 8.0,
    type: "movie"
  }
];

const Saved = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'tv'>('all');
  const [savedItems, setSavedItems] = useState(mockSavedMovies);

  // Filter items based on active tab
  const filteredItems = savedItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'movies') return item.type === 'movie';
    if (activeTab === 'tv') return item.type === 'tv';
    return true;
  });

  const removeItem = (id: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-secondary rounded-2xl p-4 mb-3 flex-row">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        className="w-16 h-24 rounded-lg"
        resizeMode="cover"
      />
      
      <View className="flex-1 ml-4 justify-between">
        <View>
          <Text className="text-white font-semibold text-lg" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="text-gray-400 text-sm">
            {item.type === 'movie' ? 'Movie' : 'TV Series'} • {item.year}
          </Text>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={icons.star}
              className="w-4 h-4 tint-yellow-400 mr-1"
            />
            <Text className="text-yellow-400 text-sm">{item.rating}</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            className="p-2"
          >
            <Image
              source={icons.save}
              className="w-5 h-5 tint-accent"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full h-full" />
      
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-white mt-4">Saved Items</Text>
          <Text className="text-gray-400 text-sm mt-1">
            {savedItems.length} items saved
          </Text>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row bg-secondary rounded-2xl p-1 mb-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'movies', label: 'Movies' },
            { key: 'tv', label: 'TV Shows' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 py-3 rounded-xl mx-1 ${
                activeTab === tab.key ? 'bg-accent' : ''
              }`}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === tab.key ? 'text-white' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Saved Items List */}
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image
              source={icons.save}
              className="w-20 h-20 tint-gray-400 mb-4"
            />
            <Text className="text-gray-400 text-lg text-center">
              {activeTab === 'all' 
                ? 'No saved items yet'
                : activeTab === 'movies'
                ? 'No movies saved yet'
                : 'No TV shows saved yet'
              }
            </Text>
            <Text className="text-gray-500 text-sm text-center mt-2">
              Start saving your favorite content to see them here!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Saved;
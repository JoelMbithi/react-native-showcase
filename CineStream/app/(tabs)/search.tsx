import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/assets/images/components/MovieCard";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/assets/images/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // If searchQuery is empty, fetch default movies
        const results = await fetchMovies({ query: searchQuery });
        setMovies(results);

        // Only update Appwrite metrics if user typed something
        if (searchQuery.trim() && results.length > 0) {
          await updateSearchCount(searchQuery, results[0]);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce only if user typed
    if (searchQuery.trim()) {
      const timer = setTimeout(loadMovies, 1000);
      return () => clearTimeout(timer);
    } else {
      loadMovies();
    }
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies ?? []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-4">
              <Image
                source={icons.logo}
                style={{
                  width: 240,
                  height: 240,
                  tintColor: "#FFFFFF",
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 12,
                  marginBottom: 2,
                }}
              />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <View className="my-3">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}

            {error && (
              <Text className="text-red-500 px-4 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length === 0 && (
              <Text className="text-center text-red-400 mt-3">
                No movies found for "{searchQuery}"
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;

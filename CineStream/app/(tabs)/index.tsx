import MovieCard from "@/assets/images/components/MovieCard";
import SearchBar from "@/assets/images/components/SearchBar";
import TrendingCard from "@/assets/images/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";

export default function Index() {

  const router = useRouter()

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error:trendingError,

  } = useFetch(getTrendingMovies)

const { data: movies,
   loading: MoviesLoading,
   error: MovieError } = useFetch(() =>
  fetchMovies({ query: "" })
);
  return (
    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5">
        {/* Logo with tintColor white */}
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

        {/* Loading movies */}
        {MoviesLoading || trendingLoading ? (
          <ActivityIndicator
          size="large"
          color={"#0000ff"}
          className="mt-10 self-center"
          />
        ) : MovieError  || trendingError ? (
          <Text>Error:{MovieError?.message || trendingError?.message}</Text>
        ): (

         
        <View className="flex-1 mt-1">
          <SearchBar 
           onPress={() => router.push("/search")}
            placeholder = "Search for a movie"
            />
 
           {trendingMovies && (
            <View className="mt-10">
              <Text className="text-2xl text-white font-bold mb-3">
                Trending Movies
              </Text>

                 <FlatList
                  style={{ height: 250 }}              
                  nestedScrollEnabled={true}            
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index}/>
                  )}
                  /* keyExtractor={(item) => item.$id} */
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"/>}
                />

            </View>
           )}
           <>
            <Text className="text-2xl text-white font-bold mt-5 mb-3" >
              Latest Movies
            </Text>
          

            <FlatList
           data={movies}
           renderItem={({ item }) => (
           
               <MovieCard  {...item}/>
           )}

           keyExtractor={( item) => item.id.toString()}

           numColumns={3}
           columnWrapperStyle={{
            justifyContent:'flex-start',
            gap:20,
            paddingRight:5,
            marginBottom:10

           }}
           className="mt-2 pb-32"
           scrollEnabled={false}
           />
            </>
        </View>
        )}

        
      </ScrollView>
    </View>
  );
}

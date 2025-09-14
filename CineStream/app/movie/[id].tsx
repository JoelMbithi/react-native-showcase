import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/usefetch'
import { icons } from '@/constants/icons'

const MovieDetails = () => {

  const { id} = useLocalSearchParams()

  interface MovieInfoProps{
    value:string;
    label?: string | number | null
  }

  const MovieInfo = ({ label,value}: MovieInfoProps) => (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='mt-5 text-light-200 font-bold text-xl'>
        {label}
      </Text>
       <Text className='mt-2 text-light-100 font-normal text-sm'>
        {value || 'N/A'}
      </Text>
    </View>
  )

  const { data:movie, loading} = useFetch(() => fetchMovieDetails(id as string))
  return (
    <View className='bg-primary flex-1'>
    <ScrollView contentContainerStyle={{
      paddingBottom:80
    }}>
      <View >
        <Image
        className='w-full h-[800px]' 
        resizeMode='stretch'
         source={{ 
          uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`
        }}/>
      </View>
      <View className='flex-col items-start justify-center mt-5 px-5'>
        <Text className='text-white text-2xl font-bold'>{movie?.title}</Text>
        <View className='flex-row items-center gap-x-4 mt-2'>
          <Text className='text-light-200 text-sm'>{movie?.release_date?.split('_')[0]}</Text>
           <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
        </View>
        <View className='flex-row items-center mt-2 bg-dark-100 px-2 py-2 rounded-md gap-x-2'>
          <Image source={icons.star} className='size-4'/>
          <Text className='text-white font-bold text-sm'>
            {Math.round(movie?.vote_average ?? 0)} / 10
          </Text>
          <Text className='text-light-200 text-sm'>
            ({movie?.vote_count} votes)
          </Text>
        </View>
        <MovieInfo label="Overview" value={movie?.overview}/>
         <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(' - ' ) || 'N/A'}/>
          <View className='flex flex-row justify-between w-1/2'>
          <MovieInfo label="Budget" value={`$${movie?.budget / 1_000_000} million`}/>
          <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue)/ 1000_000} `}/>
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies.map((c) => c.name).join('-') || 'N/A'}/>
            <MovieInfo label="Production Country" value={movie?.production_countries.map((c) => c.name).join('-') || 'N/A'}/>
      </View>

    </ScrollView>
    <TouchableOpacity
    onPress={router.back}
    className='absolute bottom-5 left-0 right-0  mx-5 bg-accent rounded-lg py-3 flex items-center justify-center z-50 '>
      <Image source={icons.arrow} className='size-5 mr-1 mt-1 rotate-180' tintColor={"#fff"}/>
      <Text className='text-white font-semibold'>Go back</Text>
    </TouchableOpacity>
    </View>
  )
}

export default MovieDetails
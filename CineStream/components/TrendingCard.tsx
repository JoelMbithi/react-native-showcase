import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.9}
        className="w-36 mr-5 relative"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        {/* Movie Poster */}
        <Image
          source={{ uri: poster_url }}
          className="w-36 h-52 rounded-2xl"
          resizeMode="cover"
        />

        {/* Ranking Badge */}
        <View className="absolute  -left-3 rounded-full overflow-hidden">
          <MaskedView
            maskElement={
              <Text className="font-extrabold text-white text-4xl px-2">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="w-14 h-14 "
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        {/* Movie Title */}
        <Text
          className="text-sm font-semibold mt-2 text-white w-36"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

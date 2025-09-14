import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {
 
  return (
    <View
    className="flex-1 "
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-5xl font-bold text-blue-600">Joe realEstate</Text>
     <Link className="text-5xl" href="/sign-in">Sign in</Link>
     <Link href="/explorer">Explorer</Link>
     <Link href="/profile">Profile</Link>
     <Link href="/properties/1">Property</Link>
    </View>
  );
}

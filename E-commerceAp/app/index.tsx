import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#ec4899', '#7e22ce']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
    >
      {/* Main Content */}
      <View style={{ alignItems: 'center', marginBottom: 60 }}>
        <Text style={{ fontSize: 42, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
          ZuriMart
        </Text>
        <Text style={{ fontSize: 16, color: '#fbcfe8', textAlign: 'center' }}>
          Welcome to your shopping paradise
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ width: '100%', gap: 12 }}>
        <Pressable
          onPress={() => router.push("/RegisterScreen")}
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#7e22ce' }}>
            Create Account
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/LoginScreen")}
        >
          <Text style={{ 
            fontSize: 16, 
            color: 'white', 
            textAlign: 'center',
            marginTop: 10
          }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
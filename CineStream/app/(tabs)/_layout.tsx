import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import { Image, ImageBackground, Text, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] gap-2 min-h-16 mt-5 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary mt-1 text-base font-bold">{title}</Text>
      </ImageBackground>
    );
  }
  return (
    <View className="size-full flex justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor='#151312' className="size-5 mt-5" />
    </View>
  );
};

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      {/* Full-screen background for all tabs */}
      <Image source={images.bg} style={styles.background} />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <BlurView
              intensity={85}
              tint="default"
              style={styles.tabBlur}
            />
          ),
          tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            height: 58,
            paddingHorizontal: 20,
            paddingBottom: 10,
            borderRadius: 60,
            marginHorizontal:4,
            marginBottom:18,
            backgroundColor: 'transparent', // allow the BlurView to show through
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
             borderTopWidth: 0,
  elevation: 10,        // Android shadow
  shadowOpacity: 10, 
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.save} title="Save" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0D23' },
  background: { position: 'absolute', width: '100%', height: '100%', zIndex: -1 },
  tabBlur: {
    flex: 1,
    borderRadius: 60,
    overflow: 'hidden',
  },
});

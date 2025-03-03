import HomeScreen from "@/components/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          router.replace('/')
        }}
        style={{
          backgroundColor: '#851f17',
          height: 48,
          width: '90%',
          marginBottom: 16,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20
        }}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};


const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Dashboard" }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />

      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}

export default Home;
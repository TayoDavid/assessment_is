import mock from "@/api/mock";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { useState } from "react";
import { Animated, StyleSheet, Text, TextInput, ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export default function Index() {

  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUs, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  const [fadeInAnim, _] = useState(new Animated.Value(0))
  const [positionAnim, __] = useState(new Animated.Value(68));

  const [fadeOutAnim, ___] = useState(new Animated.Value(1))

  const signUp = async () => {
    if (loading) return;
    if (fullname.trim() === '' || username.trim() === '' || password.trim() === '') {
      Toast.show({ type: 'error', text1: 'All fields are required' })
      return
    }
    try {
      setLoading(true)
      const response = await mock.post('/users', {
        "fullname": fullname,
        "username": username,
        "password": password,
      })
      if (response.status === 201) {
        Toast.show({ type: 'success', text1: 'Account created successfully!' })
        setTimeout(() => {
          router.replace('/home')
        }, 1000);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);

      Toast.show({ type: 'error', text1: 'Error creating account' })
    } finally {
      setLoading(false)
    }
  }

  const animation = Animated.parallel([
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.spring(positionAnim, {
      toValue: 0,
      useNativeDriver: true,
    }),
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    })
  ]);

  const signUpPress = () => {
    setIsSignUp(!isSignUs);
    animation.start();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <View style={{ flex: 1 }} />
      <Text style={styles.header}>Assessment</Text>
      <View style={{ flex: 1 }} />
      {isSignUs && (
        <Animated.View style={{ width: '100%', opacity: fadeInAnim, transform: [{ translateY: positionAnim }] }}>
          <TextInput
            placeholder="Full name"
            placeholderTextColor="#858383"
            autoCorrect={false}
            style={styles.inputFields}
            onChangeText={setFullname}
            value={fullname}
          />
        </Animated.View>
      )}
      <TextInput
        placeholder="Username"
        placeholderTextColor="#858383"
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.inputFields}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#858383"
        style={styles.inputFields}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.touchOpacity} onPress={signUp}>
        {loading ? <ActivityIndicator /> : <Text style={styles.touchText}>{isSignUs ? 'Sign up' : 'Log in'}</Text>}
      </TouchableOpacity>
      {/* {!isSignUs && ( */}
      <Animated.View style={{ opacity: fadeOutAnim, flexDirection: 'row', marginBottom: 20 }}>
        <Text style={{ marginTop: 4 }}>Don't have account? </Text>
        <TouchableOpacity onPress={signUpPress}>
          <ThemedText style={{ color: '#e3391b' }}>Sing up</ThemedText>
        </TouchableOpacity>
      </Animated.View>
      {/* )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    marginBottom: 30
  },

  logo: {
    width: 60,
    height: 60,
    color: '#356e2f',
  },

  touchText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },

  touchOpacity: {
    backgroundColor: '#356e2f',
    height: 48,
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputFields: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    height: 48,
    marginBottom: 20,
    paddingStart: 12,
    paddingEnd: 12,
  }
});

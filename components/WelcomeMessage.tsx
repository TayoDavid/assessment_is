import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";

export interface Message {
  name: string
}

const WelcomeMessage = (prop: Message) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Welcome, </Text>
      <ThemedText
        style={{ color: 'black', fontStyle: 'italic', fontWeight: '500', fontSize: 18 }}
      >
        {prop.name}
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: '400',
    color: '#474747',
    textAlign: 'left',
    paddingTop: 1
  }
});

export default WelcomeMessage


import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Toast from "react-native-toast-message";
import { AccountInfo } from "./HomeScreen";


interface AccountInfoCardProp {
  info: AccountInfo,
  index: number
}

const AccountInfoCard = (props: AccountInfoCardProp) => {
  const [balanceVisible, setBalanceVisible] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  return (
    <View key={`${props.index} - ${props.info.id}`} style={{ ...styles.card, width: windowWidth * 0.75 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.accountNumber}>{props.info.accountNumber}</Text>
        <Pressable onPress={() => {
          Toast.show({ type: 'info', text1: 'Account number copied to clipboard' })
        }}>
          <MaterialIcons name='content-copy' size={16} color='white' />
        </Pressable>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row' }}>
        {balanceVisible ?
          <Text style={styles.balance}>₦ {props.info.balance.toLocaleString()}</Text>
          : <Text style={styles.balance}>* * * *</Text>}
        <Pressable onPress={() => setBalanceVisible(!balanceVisible)}>
          {balanceVisible
            ? <MaterialIcons name='visibility' size={20} color='white' style={{ marginTop: 0 }} />
            : <MaterialIcons name='visibility-off' size={20} color='white' style={{ marginTop: 0 }} />
          }
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 144,
    backgroundColor: '#02516e',
    borderColor: 'red',
    borderRadius: 16,
    padding: 16,
    margin: 8,
  },
  accountNumber: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
    color: 'white'
  },
  balance: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
    marginRight: 8,
    color: 'white'
  }
})

export default AccountInfoCard
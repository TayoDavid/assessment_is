import mock from "@/api/mock";
import WelcomeMessage from "@/components/WelcomeMessage";
import { AuthUser, userSelector } from "@/redux/reducers/user_reducer";
import React, { useCallback, useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from "react-redux";
import AccountInfoCard from "./AccountInfoCard";

export interface AccountInfo {
  createdAt: string,
  accountNumber: string,
  balance: number,
  ownerId: string,
  id: string
}

const HomeScreen = () => {
  const authUser = useSelector(userSelector);
  const [activeUser, setActiveUser] = useState<AuthUser | undefined>();
  const [accountInfos, setAccountInfos] = useState<AccountInfo[]>([])

  useEffect(() => {
    if (authUser !== undefined) {
      const user = Object.values(authUser)[0];
      setActiveUser(user);
      fetchAccountInfo()
    }
  }, [authUser]);

  const fetchAccountInfo = useCallback(async () => {
    const response = await mock.get('/bankAccount');
    if (response.status === 200) {
      setAccountInfos(response.data)
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <WelcomeMessage name={activeUser?.fullname ?? ""} />
      </View>
      <View>
        {accountInfos.length > 0 && (
          <ScrollView horizontal style={{ marginBottom: 8 }}>
            {accountInfos.map((accountInfo, index) => (
              <AccountInfoCard index={index} info={accountInfo} />
            ))}
          </ScrollView>
        )}
      </View>

      <Text style={styles.headerCaption}>Transaction History</Text>

      <SectionList
        sections={
          [
            {
              title: '01/03/2025',
              data: [
                { date: '01/03/2025', description: 'Airtime Transfer', amount: 1000 },
                { date: '01/03/2025', description: 'Funds Transfer', amount: 10000 },
                { date: '01/03/2025', description: 'Funds Transfer', amount: 5000 },
                { date: '01/03/2025', description: 'Electricity', amount: 10000 },
                { date: '01/03/2025', description: 'Data Purchase', amount: 4000 },
              ]
            },
            {
              title: '02/03/2025',
              data: [
                { date: '02/03/2025', description: 'Funds Transfer', amount: 1000 },
                { date: '02/03/2025', description: 'Wallet Top Up', amount: 100000 },
                { date: '02/03/2025', description: 'Funds Transfer', amount: 5000 },
                { date: '02/03/2025', description: 'DSTv Subscription', amount: 10000 },
                { date: '02/03/2025', description: 'Airtime Purchase', amount: 4000 }
              ]
            },
          ]
        }
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', height: 44, justifyContent: 'space-between' }}>
            <Text style={{ paddingLeft: 16, fontSize: 18 }}>{item.description}</Text>
            <Text style={{ padding: 16, fontSize: 12 }}>{item.amount}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item}-${index}`}
      />
    </View>
  );
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
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 4,
    paddingLeft: 16,
    paddingRight: 10,
    paddingBottom: 4,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#80b2d1',
  },
  headerCaption: {
    backgroundColor: '#02516e',
    color: 'white',
    fontSize: 18,
    paddingLeft: 12,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 4,
    fontWeight: '500'
  }
})

export default HomeScreen

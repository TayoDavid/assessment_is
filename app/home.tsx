import { AuthUser, userSelector } from "@/redux/reducers/user_reducer";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const Home = () => {

  const authUser = useSelector(userSelector)
  const [activeUser, setActiveUser] = useState<AuthUser | undefined>()

  useEffect(() => {
    console.log('Logged in user: ');
    if (authUser !== undefined) {
      const user = Object.values(authUser)[0]
      setActiveUser(user)
      console.log(user);
    }
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
}

export default Home;

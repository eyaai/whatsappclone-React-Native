import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListProfils from './ListProfils';
import MyProfil from './MyProfil';
import { View, Text } from 'react-native';
import firebase from '../config';
const auth = firebase.auth();
const database = firebase.database();
const ref_tableProfils = database.ref("Tabledeprofils");

export default function Acceuil({ route }) {
  const Tab = createBottomTabNavigator();
  const currentid = auth.currentUser.uid;
  const [profileExist, setProfileExist] = useState(true);

  useEffect(() => {

  const userProfileRef = ref_tableProfils.child(`unprofil${currentid}`);
  userProfileRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setProfileExist(true);
    } else {
      setProfileExist(false);
    }
  }
  );

  return () => userProfileRef.off();
}, []);

  return (
    <>
    {
      profileExist ?
        <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen
        name="listprofil"
        component={ListProfils}
        initialParams={{ currentid }}
        options = {{headerShown:false}}
      />
      <Tab.Screen
        name="My Profile"
        component={MyProfil}
        initialParams={{ currentid }}
        options = {{headerShown:false}}
      />
    </Tab.Navigator>
    :
    <Tab.Navigator screenOptions={{headerShown:false}}>
    <Tab.Screen
    name="My Profile"
    component={MyProfil}
    initialParams={{ currentid }}
    options = {{headerShown:false}}
  />
</Tab.Navigator>
}
    </>
  );
}

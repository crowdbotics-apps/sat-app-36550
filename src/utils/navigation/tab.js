import React, { useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Image, Text, View } from "react-native"
import {
  DocStackNavigator,
  MainStackNavigator,
  MessageStackNavigator,
  ProfileStackNavigator
} from "./stack"
import { colors } from "../colors"

MaterialCommunityIcons.loadFont()

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.whiteBackground,
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          borderTopWidth: 1
        }
      })}
    >
      <Tab.Screen
        name="Shifts"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? colors.orange : colors.grayColor}
              size={30}
            />
          ),
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? colors.orange : colors.grayColor,
                fontSize: 10
              }}
            >
              Shifts
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="Chats"
        component={MessageStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="message-text"
              color={focused ? colors.orange : colors.grayColor}
              size={30}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? colors.orange : colors.grayColor,
                fontSize: 10
              }}
            >
              Chats
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="Docs"
        component={DocStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="file-multiple"
              color={focused ? colors.orange : colors.grayColor}
              size={30}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? colors.orange : colors.grayColor,
                fontSize: 10
              }}
            >
              Docs
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="More"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? colors.orange : colors.grayColor}
              size={30}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? colors.orange : colors.grayColor,
                fontSize: 10
              }}
            >
              More
            </Text>
          )
        }}
      />
    </Tab.Navigator>
  )
}

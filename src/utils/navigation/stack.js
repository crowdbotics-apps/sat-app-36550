import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import SplashScreen from "../../screens/SplashScreen"
import HomeDashboard from "../../screens/HomeDashboard"
import Login from "../../screens/Login"
import SetNewPassword from "../../screens/SetNewPassword"
import ForgotPassword from "../../screens/ForgotPassword"
import SignUp from "../../screens/SignUp"
import DriverLicense from "../../screens/onboarding/DriverLicense"
import Credentials from "../../screens/onboarding/Credentials"
import Vaccine from "../../screens/onboarding/Vaccine"
import Photo from "../../screens/onboarding/Photo"
import AddCred from "../../screens/onboarding/AddCred"
import AddVaccine from "../../screens/onboarding/AddVaccine"
import TokenInput from "../../screens/TokenInput"
import PasswordSuccess from "../../screens/PasswordSuccess"
import ChatScreen from "../../screens/ChatScreen"
import DocScreen from "../../screens/DocScreen"
import Profile from "../../screens/Profile"
import AddLicense from "../../screens/onboarding/AddLicense"
import ScheduleDetail from "../../screens/ScheduleDetail"
import RequestDetail from "../../screens/RequestDetail"
import PastDetail from "../../screens/PastDetail"
import Hazard from "../../screens/Hazard"
import Requirements from "../../screens/Requirements"
import More from "../../screens/More"
import EditProfile from "../../screens/EditProfile"
import Certificates from "../../screens/Certificates"
import TimeSheets from "../../screens/TimeSheets"
import CreateTimesheet from "../../screens/CreateTimesheet"
import TimesheetSuccess from "../../screens/TimeSheetSuccess"
import ChatList from "../../screens/ChatList"
import DocSigned from "../../screens/DocSigned"
import DocUnsigned from "../../screens/DocUnsigned"
import DocDetail from "../../screens/DocDetail"
import Terms from "../../screens/Terms"
import Privacy from "../../screens/Privacy"
import SigningScreen from "../../screens/SigningScreen"

const Stack = createStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeDashboard" component={HomeDashboard} />
      <Stack.Screen name="DriverLicense" component={DriverLicense} />
      <Stack.Screen name="Credentials" component={Credentials} />
      <Stack.Screen name="Vaccine" component={Vaccine} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="AddCred" component={AddCred} />
      <Stack.Screen name="AddVaccine" component={AddVaccine} />
      <Stack.Screen name="AddLicense" component={AddLicense} />
      <Stack.Screen name="ScheduleDetail" component={ScheduleDetail} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
      <Stack.Screen name="PastDetail" component={PastDetail} />
      <Stack.Screen name="Hazard" component={Hazard} />
      <Stack.Screen name="Requirements" component={Requirements} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Certificates" component={Certificates} />
      <Stack.Screen name="TimeSheets" component={TimeSheets} />
      <Stack.Screen name="CreateTimesheet" component={CreateTimesheet} />
      <Stack.Screen name="TimesheetSuccess" component={TimesheetSuccess} />
    </Stack.Navigator>
  )
}

const MessageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  )
}

const DocStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DocScreen" component={DocScreen} />
      <Stack.Screen name="DocSigned" component={DocSigned} />
      <Stack.Screen name="DocUnsigned" component={DocUnsigned} />
      <Stack.Screen name="DocDetail" component={DocDetail} />
      <Stack.Screen name="SigningScreen" component={SigningScreen} />
    </Stack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Certificates" component={Certificates} />
      <Stack.Screen name="TimeSheets" component={TimeSheets} />
      <Stack.Screen name="CreateTimesheet" component={CreateTimesheet} />
      <Stack.Screen name="TimesheetSuccess" component={TimesheetSuccess} />
    </Stack.Navigator>
  )
}

const OnboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TokenInput" component={TokenInput} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccess} />
    </Stack.Navigator>
  )
}

const WebStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeDashboard" component={HomeDashboard} />
      <Stack.Screen name="ScheduleDetail" component={ScheduleDetail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
    </Stack.Navigator>
  )
}

export {
  MainStackNavigator,
  DocStackNavigator,
  MessageStackNavigator,
  ProfileStackNavigator,
  OnboardStackNavigator,
  WebStack
}

// main //
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { store } from './store';

// design //
import { Fonts } from './constants/Fonts';
import { Colors } from './constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Exo2_600SemiBold, Exo2_700Bold } from '@expo-google-fonts/exo-2';
import {
  useFonts,
  Mulish_400Regular,
  Mulish_300Light
} from '@expo-google-fonts/mulish';

// navigation //
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components //
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ProjectsScreen from './screens/projects/ProjectsScreen';
import ProjectsCategoryScreen from './screens/projects/ProjectsCategoryScreen';
import ProjectDetailScreen from './screens/projects/ProjectDetailScreen';
import ManageScreen from './screens/ManageScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';

// header //
import TabBarIcon from './components/interface/TabBarIcon';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BigCustomTabBarButton = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        top: -25,
        borderRadius: 35,
        ...styles.shadow
      }}>
      <View
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          backgroundColor: Colors.accent,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {children}
      </View>
    </Pressable>
  );
};

const ProjectsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: Colors.gray400,
        headerTitleStyle: {
          ...Fonts.h3,
          color: Colors.white,
          paddingRight: Platform.OS === 'ios' ? 8 : 0
        },
        headerStyle: {
          backgroundColor: Colors.gray50,
          shadowColor: 'transparent',
          elevation: 0
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          paddingLeft: Platform.OS === 'ios' ? 8 : 0
        }
      }}>
      <Stack.Screen
        name='projectsList'
        component={ProjectsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='projectsCategory'
        component={ProjectsCategoryScreen}
      />
      <Stack.Screen name='projectDetail' component={ProjectDetailScreen} />
    </Stack.Navigator>
  );
};

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 35,
          left: 15,
          right: 15,
          borderRadius: 16,
          height: 70,
          ...styles.shadow
        }
      }}>
      <Tab.Screen
        name='home'
        component={HomeScreen}
        sceneContainerStyle={{}}
        options={{
          cardStyle: {
            paddingTop: 45,
            paddingHorizontal: 20
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon label='Tablica' icon='stats-chart' focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name='projects'
        component={ProjectsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon label='Projekty' icon='rocket' focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name='manage'
        component={ManageScreen}
        options={({ navigation }) => ({
          tabBarIcon: () => (
            <Ionicons name='add' size={32} color={Colors.white} />
          ),
          tabBarButton: (props) => (
            <BigCustomTabBarButton
              {...props}
              onPress={() => {
                navigation.navigate('manage', { mode: 'add', type: '' });
              }}
            />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: Colors.gray400,
          headerTitleStyle: {
            ...Fonts.h3,
            color: Colors.white,
            paddingRight: Platform.OS === 'ios' ? 8 : 0
          },
          headerStyle: {
            backgroundColor: Colors.gray50,
            shadowColor: 'transparent',
            elevation: 0
          },
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === 'ios' ? 8 : 0
          }
        })}
      />
      <Tab.Screen
        name='calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon label='Kalendarz' icon='calendar' focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name='settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon label='Opcje' icon='options' focused={focused} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Mulish_300Light,
    Mulish_400Regular,
    Exo2_600SemiBold,
    Exo2_700Bold
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.gray50
    }
  };

  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name='welcome' component={WelcomeScreen} />
          <Stack.Screen name='dashboard' component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.gray10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4
  }
});

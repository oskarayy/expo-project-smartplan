import { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import * as Notifications from 'expo-notifications';
import { getNotificationsPermission } from '../utils/getNotificationsPermission';

import Button from '../components/interface/Button';
import { Fonts } from '../constants/Fonts';

import { setTasks } from '../store/reducers/taskSlice';
import { setProjects } from '../store/reducers/projectSlice';
import { updateOptions } from '../store/reducers/settingsSlice';
import { getData } from '../utils/storage';
import { checkAsyncStorageData } from '../utils/validations';

const cmImage = require('../assets/cmimage.png');
const backgroundImage = require('../assets/splash-bg-md.jpg');

const getDataFromStorage = async (dispatchFn) => {
  const projects = await getData('projects');
  const tasks = await getData('tasks');
  const settings = await getData('settings');

  const { projectsOK, tasksOK, settingsOK } = checkAsyncStorageData(
    projects,
    tasks,
    settings
  );

  if (projectsOK) dispatchFn(setProjects(projects));
  if (tasksOK) dispatchFn(setTasks(tasks));
  if (settingsOK) dispatchFn(updateOptions(settings));

  if (projectsOK && tasksOK && settingsOK) return true;
};

const getUserNotificationSettings = async (dispatchFn) => {
  const { permission } = await getNotificationsPermission();

  if (!permission) {
    dispatchFn(updateOptions({ notificationsActive: false }));
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
};

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getDataFromStorage(dispatch);
    getUserNotificationSettings(dispatch);
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        await getDataFromStorage(dispatch);
        const { projectId } = response.notification.request.content.data;
        navigation.navigate('projects', {
          screen: 'projectDetail',
          params: { id: projectId }
        });
      }
    );
    return () => subscription.remove();
  }, []);

  const openDashboard = () => navigation.navigate('dashboard');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode='cover'
        style={styles.bg}>
        <View style={styles.textContainer}>
          <View style={styles.logo}>
            <Image source={cmImage} style={{ width: 36, height: 36 }} />
          </View>
          <Text style={styles.subtext}>Zbyt długo czekasz na szczęście?</Text>
          <Text style={styles.title}>Czas zacząć działać!</Text>
        </View>
        <Button style={styles.button} onPress={openDashboard}>
          Do dzieła!
        </Button>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    flex: 1,
    paddingVertical: 80,
    justifyContent: 'space-between'
  },
  textContainer: {
    paddingHorizontal: 24
  },
  logo: {
    alignItems: 'center',
    marginBottom: 20
  },
  subtext: {
    ...Fonts.text300,
    textAlign: 'center'
  },
  title: {
    ...Fonts.h1
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    marginBottom: 6
  }
});

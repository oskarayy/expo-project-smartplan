import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@' + key);
    const data = JSON.parse(jsonValue);
    return data;
  } catch (error) {
    console.log(error);
    console.log('getData error');
  }
};

export const sendProjects = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@projects', jsonValue);
  } catch (error) {
    console.log(error);
    console.log('sending tasks error');
  }
};

export const sendTasks = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@tasks', jsonValue);
  } catch (error) {
    console.log(error);
    console.log('sending tasks error');
  }
};

export const sendSettings = async (settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem('@settings', jsonValue);
  } catch (error) {
    console.log(error);
    console.log('sending settings error');
  }
};

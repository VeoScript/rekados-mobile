/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { API_URL } from '@env';
import io from 'socket.io-client';
import notifee, { AndroidImportance } from '@notifee/react-native';

const socket = io(API_URL);

socket.on('connect', () => {
  console.log('Connected to socket.io server');
});

socket.on('new_notification', async (data) => {
  console.log('Received new notification:', data);

  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: data.userId === data.userLoggedIn ? 'default' : data.userId,
    name: 'Rekados Push Notification',
    importance: data.userId === data.userLoggedIn ? AndroidImportance.NONE : AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.title,
    body: data.message,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => App);

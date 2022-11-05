import notifee, { TimestampTrigger, TriggerType, RepeatFrequency, AndroidImportance } from '@notifee/react-native';

export const useNotification = () => {
  async function displayNotification(title: string, body: string) {
    // Create a channel required for Android Notifications
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

    // Display a notification
    const notificationId = notifee.displayNotification({
      // id: "string" | updates Notification instead if provided id already exists
      title: title,
      body: body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        /* smallIcon: "smallIcon" | defaults to 'ic_launcher', respectively your app icon. */
      },
    });
    return notificationId;
  }

  async function displayTriggerNotification(
    title: string,
    body: string,
    timestamp: number,
    repeatFrequency: RepeatFrequency | undefined = undefined
  ) {
    // Create a channel required for Android Notifications
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: timestamp, // fire at the provided date
      repeatFrequency: repeatFrequency, // repeat the notification on a hourly/daily/weekly basis
    };
    // Please note, for iOS, a repeating trigger does not work the same as Android - the initial trigger cannot be delayed
    // See https://notifee.app/react-native/docs/triggers

    // You can also use Intervall triggers
    /*
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: 30
      timeUnit: TimeUnit.MINUTES
    };
    */

    // Create a trigger notification
    const triggerNotificationId = await notifee.createTriggerNotification(
      {
        // id: "string" | updates Notification instead if provided id already exists
        title: title,
        body: body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger, // use displayNotification to update triggerNotifications which trigger already fired
    );
    return triggerNotificationId;
  }

  // get all trigger notifications
  async function getTriggerNotificationIds() {
    const triggerNotificationIds = await notifee.getTriggerNotificationIds();
    return triggerNotificationIds;
  }

  // cancel all or specific trigger notifications
  async function cancelTriggerNotifications(notificationIds: string[] | undefined) {
    await notifee.cancelTriggerNotifications(notificationIds);
  }

  // cancel all notifications
  async function cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }

  // cancel notification via notificationId or tag
  async function cancelNotification(notificationId: string, tag: string | undefined = undefined) {
    await notifee.cancelNotification(notificationId, tag);
  }

  // There are way more methods I didn't cover here that can help you in various scenarios
  // See https://notifee.app/react-native/reference

  return {
    displayNotification,
    displayTriggerNotification,
    getTriggerNotificationIds,
    cancelTriggerNotifications,
    cancelAllNotifications,
    cancelNotification
  }
}
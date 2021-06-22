import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { styles } from './styles';
import { CoreComponent, TrackerComponent } from './components/Core';
import InAppMessagingComponent from './components/InAppMessaging';
import VariablesComponent from './components/Variables';
import VisualTrackingComponent from './components/VisualTracking';
import NotificationUseEffect from './Notification';

export default function App() {
  React.useEffect(() => {
    NotificationUseEffect();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TrackerComponent />
        <InAppMessagingComponent />
        <CoreComponent />
        <VariablesComponent />
        <VisualTrackingComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

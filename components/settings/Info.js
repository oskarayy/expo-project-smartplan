import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../constants/Fonts';

import Animated, {
  interpolate,
  useAnimatedProps
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const ProjectStatus = ({ progress, type }) => {
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  const animatedOpacity = useAnimatedProps(() => {
    let infoBoxOpacity = interpolate(progress.value, [0, 1], [-0.2, 1]);

    return { opacity: infoBoxOpacity };
  });

  const text = type === 'save' ? 'Zapisano' : 'Zresetowano';
  const icon = type === 'save' ? 'save-outline' : 'sync-outline';

  return (
    <AnimatedView progress={progress} style={[styles.info, animatedOpacity]}>
      <Text style={{ ...Fonts.h3, marginBottom: 4 }}>{text}</Text>
      <Ionicons name={icon} size={28} color={accentColor} />
    </AnimatedView>
  );
};

export default ProjectStatus;

const styles = StyleSheet.create({
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
});

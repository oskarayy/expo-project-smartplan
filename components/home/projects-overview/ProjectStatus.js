import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

import Animated, {
  interpolate,
  useAnimatedProps
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const ProjectStatus = ({ progress, procent, prev }) => {
  const animatedWidth = useAnimatedProps(() => {
    let barWidth = interpolate(
      progress.value,
      [0, 1],
      [prev ?? 0, procent]
    ).toString();

    if (+prev && +prev < +procent) {
      barWidth =
        +prev + +barWidth.slice(prev.length, prev.length + procent.length + 2);
    } else if (+prev && +prev > +procent) {
      const numbersArr = barWidth.split('-');
      barWidth =
        numbersArr.length === 1
          ? +numbersArr[0]
          : +numbersArr[0] - +numbersArr[1];
    }

    return {
      width: barWidth + '%'
    };
  });

  return (
    <>
      <View style={styles.status}>
        <AnimatedView
          progress={progress}
          style={[styles.statusBar, animatedWidth]}></AnimatedView>
      </View>
      <Text style={styles.procent}>{`${procent}%`}</Text>
    </>
  );
};

export default ProjectStatus;

const styles = StyleSheet.create({
  status: {
    height: 2,
    width: '100%',
    marginBottom: 4,
    borderRadius: 1,
    backgroundColor: Colors.gray300
  },
  statusBar: {
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.accent
  },
  procent: {
    ...Fonts.text300,
    color: Colors.gray300,
    fontSize: 9,
    textAlign: 'right'
  }
});
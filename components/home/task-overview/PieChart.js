import { View, Text, StyleSheet } from 'react-native';

import Svg from 'react-native-svg';
import ChartSegment from './ChartSegment';

import { Colors, ChartColors } from '../../../constants/Colors';
import { Styles } from '../../../constants/Styles';
import { Fonts } from '../../../constants/Fonts';

const size = 140;
const strokeWidth = 20;
const colors = Object.values(ChartColors);

const PieChart = ({ children, stats, overall, progress }) => {
  const items = [stats.finished / overall, stats.active / overall];
  const angles = [];
  let angle = -90;

  items.forEach((item) => {
    angles.push(angle);
    angle += item * 360;
  });

  if (overall < 1)
    return (
      <View style={{ ...Styles.centered, height: size }}>
        <Text
          style={{
            ...styles.noProjectsText,
            ...Fonts.text400,
            color: Colors.gray300
          }}>
          Wrzucasz na luz?
        </Text>
        <Text style={styles.noProjectsText}>
          Nie znaleziono zadań na dzisiaj...
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Svg viewBox={`0 0 ${size} ${size}`}>
        {items.map((item, index) => {
          return (
            <ChartSegment
              key={index}
              percent={item}
              size={size}
              color={colors[index]}
              angle={angles[index]}
              strokeWidth={strokeWidth}
              progress={progress}
            />
          );
        })}
      </Svg>
      <View
        style={{
          width: 80,
          height: 80,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          left: '50%',
          top: '50%',
          transform: [{ translateX: -40 }, { translateY: -40 }]
        }}>
        {children}
      </View>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: size,
    width: size
  },
  noProjectsText: {
    ...Fonts.text300,
    marginHorizontal: 12,
    lineHeight: 22,
    color: Colors.gray200,
    textAlign: 'center'
  }
});

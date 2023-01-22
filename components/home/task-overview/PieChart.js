import { View } from 'react-native';
import Svg from 'react-native-svg';
import ChartSegment from './ChartSegment';
import { Colors } from '../../../constants/Colors';

const size = 140;
const strokeWidth = 20;
const colors = [Colors.accent, Colors.chart2];

const PieChart = ({ children, tasks, progress }) => {
  const items = [tasks.finished / tasks.overall, tasks.running / tasks.overall];
  const angles = [];
  let angle = -90;

  items.forEach((item) => {
    angles.push(angle);
    angle += item * 360;
  });

  return (
    <View
      style={{
        position: 'relative',
        height: size,
        width: size
      }}>
      <Svg viewBox={`0 0 ${size} ${size}`}>
        {items.map((item, index) => (
          <ChartSegment
            key={index}
            percent={item}
            size={size}
            color={colors[index]}
            angle={angles[index]}
            strokeWidth={strokeWidth}
            progress={progress}
          />
        ))}
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

import { Circle } from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartSegment = ({
  color,
  progress,
  percent,
  angle,
  strokeWidth,
  size
}) => {
  const radius = (size - strokeWidth) / 2;
  const curicumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [curicumference, curicumference * (1 - percent)]
    );

    const deg = interpolate(progress.value, [0, 1], [0, angle]);

    return {
      strokeDashoffset,
      transform: [
        { translateX: size / 2 },
        { translateY: size / 2 },
        { rotate: `${deg}deg` },
        { translateX: size / -2 },
        { translateY: size / -2 }
      ]
    };
  });

  return (
    <AnimatedCircle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={curicumference}
      originX={size / 2}
      originY={size / 2}
      progress={progress}
      animatedProps={animatedProps}
    />
  );
};

export default ChartSegment;

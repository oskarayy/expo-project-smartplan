import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

import Button from '../../interface/Button';

const ProjectControls = ({
  mode,
  type,
  onType,
  onSubmit,
  activeProjectId,
  backTo
}) => {
  const navigation = useNavigation();
  const { accentColor } = useSelector((state) => state.settingsSlice.options);

  const goBackHandler = (submit) => {
    if (((activeProjectId || backTo) && type === 'task') || mode === 'update') {
      navigation.navigate('projects', {
        screen: 'projectDetail',
        params: { id: activeProjectId ?? backTo, submit: true }
      });
    } else if (
      (submit === true || activeProjectId) &&
      backTo &&
      type === 'project'
    ) {
      navigation.navigate('projects', {
        screen: 'projectsCategory',
        params: {
          id: backTo ?? activeProjectId,
          submit: true
        }
      });
    } else if (activeProjectId && type === 'project') {
      navigation.navigate('projects', {
        screen: 'projectsList'
      });
    } else {
      onType('');
      navigation.navigate('manage', {
        mode: 'add',
        type: ''
      });
    }
  };

  const submitHandler = async () => {
    const validation = await onSubmit();
    if (validation.form) goBackHandler(true);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        zIndex: -1
      }}>
      <Button
        style={{ flexBasis: '40%' }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: accentColor,
          backgroundColor: Colors.gray10
        }}
        textStyle={{ ...Fonts.h4, color: Colors.gray500 }}
        onPress={goBackHandler}>
        {mode === 'update' ? 'Anuluj' : 'Cofnij'}
      </Button>
      <Button
        onPress={submitHandler}
        style={{ flexBasis: '40%' }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: accentColor,
          backgroundColor: accentColor
        }}
        textStyle={{
          ...Fonts.h4,
          color: Colors.gray500
        }}>
        {mode === 'update' ? 'Zapisz' : 'Dodaj'}
      </Button>
    </View>
  );
};

export default ProjectControls;

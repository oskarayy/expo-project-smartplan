import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

import Button from '../../interface/Button';

const ProjectControls = ({
  mode,
  type,
  onType,
  onSubmit,
  activeProject,
  backTo
}) => {
  const navigation = useNavigation();

  const goBackHandler = (submit) => {
    if ((activeProject || backTo) && type === 'task') {
      navigation.navigate('projects', {
        screen: 'projectDetail',
        params: { id: activeProject ?? backTo, submit }
      });
    } else if (
      (submit === true || activeProject) &&
      backTo &&
      type === 'project'
    ) {
      navigation.navigate('projects', {
        screen: 'projectsCategory',
        params: {
          id: backTo,
          submit: true
        }
      });
    } else if (activeProject && type === 'project') {
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

  const submitHandler = () => {
    const validation = onSubmit();
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
          borderColor: Colors.accent,
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
          borderColor: Colors.accent,
          backgroundColor: Colors.accent
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

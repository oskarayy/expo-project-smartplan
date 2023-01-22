import { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject } from '../../store/reducers/projectSlice';
import { addTask } from '../../store/reducers/taskSlice';

import { Colors } from '../../constants/Colors';

import DatePicker from './form/DatePicker';
import DropdownPicker from './form/DropdownPicker';
import FormItem from './form/FormItem';
import FormControls from './form/FormControls';

const ProjectForm = ({ type, mode, onType, activeProject }) => {
  const dispatch = useDispatch();
  const [dropdownValue, setDropdownValue] = useState(activeProject ?? null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const categories = useSelector((state) => state.projectSlice.categories);
  const projects = useSelector((state) => state.projectSlice.projects);

  const categoryPickerData = categories
    .map((item) => ({
      label: item.name,
      value: item.id
    }))
    .filter((item) => item.value !== 'all');

  const projectPickerData = projects.map((item) => ({
    label: item.title,
    value: item.id
  }));

  const formSubmitHandler = () => {
    if (type === 'task') {
      const { tasks } = projects.find(
        (project) => project.id === dropdownValue
      );
      dispatch(
        addTask({
          id: `${dropdownValue}-task-${new Date().getTime()}`,
          task: title,
          projectId: dropdownValue,
          deadline: date,
          finished: false
        })
      );
      dispatch(
        updateProject({
          id: dropdownValue,
          tasks: { ...tasks, active: tasks.active + 1 }
        })
      );
    }

    if (type === 'project')
      dispatch(
        addProject({
          id: `project-${dropdownValue}-${new Date().getTime()}`,
          title: title.trim(),
          desc: description.trim(),
          category: dropdownValue,
          progress: 0,
          tasks: { active: 0, finished: 0 },
          deadline: date
        })
      );
  };

  return (
    <View style={styles.form}>
      <View style={styles.pickersContainer}>
        <FormItem
          label={type === 'project' ? 'Kategoria' : 'Projekt'}
          itemStyle={styles.dropdown}>
          <DropdownPicker
            value={dropdownValue}
            onChange={setDropdownValue}
            data={type === 'project' ? categoryPickerData : projectPickerData}
          />
        </FormItem>
        <FormItem
          label='Termin'
          itemStyle={Platform.OS === 'android' && { flex: 1 }}>
          <View style={styles.dateInput}>
            <DatePicker date={date} onDate={setDate} />
          </View>
        </FormItem>
      </View>
      <FormItem
        label={type === 'project' ? 'Projekt' : 'Zadanie'}
        inputConfig={{
          onChangeText: (text) => setTitle(text),
          required: true,
          placeholder: 'Jaki cel siedzi Ci w głowie?',
          maxLength: 30,
          returnKeyType: 'done'
        }}
      />
      {type === 'project' && (
        <FormItem
          label='Opis'
          inputStyle={{ minHeight: 120, paddingTop: 12 }}
          inputConfig={{
            onChangeText: (text) => setDescription(text),
            multiline: true,
            textAlignVertical: 'top',
            placeholder: 'Co znajduje się na szczycie tej góry?',
            maxLength: 160
          }}
        />
      )}
      <FormControls
        mode={mode}
        type={type}
        onType={onType}
        onSubmit={formSubmitHandler}
        activeProject={activeProject}
      />
    </View>
  );
};

export default ProjectForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
    marginBottom: 32
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropdown: {
    flex: 1.5,
    marginRight: 16,
    zIndex: 1000
  },
  dateInput: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray100,
    backgroundColor: Colors.gray10
  }
});

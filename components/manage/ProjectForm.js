import { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkProjectValues } from '../../utils/checkFromValues';
import { addProject, updateProject } from '../../store/reducers/projectSlice';
import { addTask } from '../../store/reducers/taskSlice';
import { Colors } from '../../constants/Colors';

import DatePicker from './form/DatePicker';
import DropdownPicker from './form/DropdownPicker';
import FormItem from './form/FormItem';
import FormControls from './form/FormControls';
import { useEffect } from 'react';

const ProjectForm = ({ type, mode, onType, activeProject = {} }) => {
  const dispatch = useDispatch();
  const todayFormatted = new Date().toISOString().slice(0, 10);
  const defaultDDValue = activeProject.category ?? activeProject.id;

  const [dropdownValue, setDropdownValue] = useState(defaultDDValue ?? null);
  const [dropdownIsValid, setDropdownIsValid] = useState(true);
  const [date, setDate] = useState(todayFormatted);
  const [title, setTitle] = useState({
    value: '',
    isValid: true
  });
  const [description, setDescription] = useState('');

  const categories = useSelector((state) => state.projectSlice.categories);
  const categoriesIds = categories.map((item) => item.id);
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

  useEffect(() => {
    if (activeProject && mode === 'update' && type === 'project') {
      setDropdownValue(activeProject.category);
      setDate(activeProject.deadline);
      setTitle((prevState) => ({ ...prevState, value: activeProject.title }));
      setDescription(activeProject.desc ?? '');
    }
  }, [mode, type, projects, activeProject]);

  useEffect(() => {
    if (mode === 'add') {
      setDescription('');
      setTitle({ value: '', isValid: true });
      setDate(todayFormatted);
    }
  }, [mode]);

  const formSubmitHandler = () => {
    const actualTimeMs = new Date().getTime();
    const validation = checkProjectValues({
      titleValue: title.value,
      dropdownValue
    });

    if (!validation.form) {
      setDropdownIsValid(validation.dropdown);
      setTitle((prevState) => ({ ...prevState, isValid: validation.title }));
      return validation;
    }

    if (type === 'task') {
      const { tasks } = projects.find(
        (project) => project.id === dropdownValue
      );
      const newTask = {
        id: `${dropdownValue}-task-${actualTimeMs}`,
        task: title.value.trim(),
        projectId: dropdownValue,
        deadline: date,
        finished: false
      };
      dispatch(addTask(newTask));
      dispatch(
        updateProject({
          id: dropdownValue,
          tasks: { ...tasks, active: tasks.active + 1 }
        })
      );
    } else if (type === 'project' && mode === 'add') {
      const newProject = {
        id: `project-${dropdownValue}-${actualTimeMs}`,
        title: title.value.trim(),
        desc: description.trim(),
        category: dropdownValue,
        progress: 0,
        tasks: { active: 0, finished: 0 },
        deadline: date
      };
      dispatch(addProject(newProject));
    } else if (type === 'project' && mode === 'update') {
      const isCategory = categoriesIds.includes(dropdownValue);
      const updatedProject = {
        id: activeProject.id,
        title: title.value.trim(),
        desc: description.trim(),
        category: isCategory ? dropdownValue : activeProject.category,
        progress: activeProject.progress,
        tasks: activeProject.tasks,
        deadline: date
      };
      dispatch(updateProject(updatedProject));
    }

    setDate(todayFormatted);
    setDropdownValue(null);
    setDropdownIsValid(true);
    setDescription('');
    setTitle({ value: '', isValid: true });
    return validation;
  };

  return (
    <View style={styles.form}>
      <View style={styles.pickersContainer}>
        <FormItem
          isValid={dropdownIsValid}
          label={type === 'project' ? 'Kategoria' : 'Projekt'}
          itemStyle={styles.dropdown}>
          <DropdownPicker
            value={dropdownValue}
            onChange={setDropdownValue}
            onValid={setDropdownIsValid.bind(true)}
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
        isValid={title.isValid}
        label={type === 'project' ? 'Projekt' : 'Zadanie'}
        inputConfig={{
          value: title.value,
          onChangeText: (text) => setTitle({ isValid: true, value: text }),
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
            value: description,
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
        activeProjectId={activeProject.id}
        backTo={dropdownValue}
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

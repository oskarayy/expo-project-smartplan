import { useReducer, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { checkProjectValues } from '../../utils/validations';
import {
  addProject,
  updateProject,
  updateActiveTasks
} from '../../store/reducers/projectSlice';
import { addTask } from '../../store/reducers/taskSlice';
import { Colors } from '../../constants/Colors';

import { Task } from '../../models/Task';
import { Project } from '../../models/Project';
import { Notification } from '../../models/Notification';

import DatePicker from './DatePicker';
import DropdownPicker from './dropdown/DropdownPicker';
import FormItem from './FormItem';
import FormControls from './FormControls';

const initialUserValues = {
  dropdown: null,
  dropdownIsValid: true,
  title: '',
  titleIsValid: true,
  titleIsUnique: true,
  description: '',
  date: ''
};

const userValuesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUES': {
      state = {
        ...state,
        ...action.values
      };
      return state;
    }
    case 'RESET_VALUES': {
      state = {
        ...initialUserValues,
        date: action.todayFormatted
      };
      return state;
    }
    case 'VALUES_VALIDATION': {
      state = {
        ...state,
        titleIsValid: action.title ?? state.titleIsValid,
        dropdownIsValid: action.dropdown ?? state.dropdownIsValid,
        titleIsUnique: action.unique ?? state.titleIsUniqe
      };
      return state;
    }
  }
};

const getDropdownPickerData = (categories, projects) => {
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

  return { categoryPickerData, projectPickerData };
};

const saveTask = async (values, projects, notificationsActive, dispatchFn) => {
  const project = projects.find((project) => project.id === values.dropdown);
  const newTask = new Task(values.title, values.dropdown, values.date);

  let notificationId;
  if (notificationsActive) {
    const notificationData = new Notification(newTask, project);
    notificationId = await Notifications.scheduleNotificationAsync(
      notificationData
    );
  }

  dispatchFn(
    updateActiveTasks({
      id: values.dropdown,
      active: 1,
      finished: 0
    })
  );
  dispatchFn(addTask({ ...newTask, notificationId }));
};

const saveProject = (
  mode,
  values,
  activeProject,
  categoriesIds,
  dispatchFn
) => {
  if (mode === 'add') {
    const newProject = new Project(
      values.title,
      values.description,
      values.date,
      values.dropdown
    );
    dispatchFn(addProject({ ...newProject }));
  } else if (mode === 'update') {
    const isCategory = categoriesIds.includes(values.dropdown);
    const updatedProject = new Project(
      values.title,
      values.description,
      values.date,
      values.dropdown,
      activeProject.id,
      isCategory ? values.dropdown : activeProject.category
    );
    dispatchFn(updateProject({ ...updatedProject }));
  }
};

const submitForm = (
  values,
  type,
  mode,
  projects,
  activeProject,
  categoriesIds,
  notificationsActive,
  dispatchValues,
  onResetScreen,
  dispatchFn
) => {
  const todayFormatted = new Date().toISOString().slice(0, 10);
  const valuesToValidate = {
    titleValue: values.title,
    dropdownValue: values.dropdown
  };

  const validation = checkProjectValues(valuesToValidate, projects, type);

  if (!validation.form) {
    dispatchValues({
      type: 'VALUES_VALIDATION',
      title: validation.title,
      dropdown: validation.dropdown,
      unique: validation.uniqueTitle
    });
    return validation;
  }

  if (type === 'task')
    saveTask(values, projects, notificationsActive, dispatchFn);
  else if (type === 'project')
    saveProject(mode, values, activeProject, categoriesIds, dispatchFn);

  dispatchValues({ type: 'RESET_VALUES', todayFormatted });
  onResetScreen();
  return validation;
};

const ProjectForm = ({ type, mode, onResetScreen, activeProject = {} }) => {
  const dispatch = useDispatch();
  const todayFormatted = new Date().toISOString().slice(0, 10);
  const defaultDDValue = activeProject.category ?? activeProject.id;

  const [values, dispatchValues] = useReducer(userValuesReducer, {
    ...initialUserValues,
    date: todayFormatted,
    dropdown: defaultDDValue ?? null
  });

  const projects = useSelector((state) => state.projectSlice.projects);
  const categories = useSelector((state) => state.projectSlice.categories);
  const categoriesIds = categories.map((item) => item.id);
  const { notificationsActive } = useSelector(
    (state) => state.settingsSlice.options
  );

  const { categoryPickerData, projectPickerData } = getDropdownPickerData(
    categories,
    projects
  );

  useEffect(() => {
    if (activeProject && mode === 'update' && type === 'project') {
      dispatchValues({
        type: 'UPDATE_VALUES',
        values: {
          description: activeProject.desc ?? '',
          date: activeProject.deadline,
          title: activeProject.title,
          dropdown: activeProject.category
        }
      });
    }
  }, [mode, type, projects, activeProject]);

  useEffect(() => {
    if (mode === 'add') {
      dispatchValues({
        type: 'UPDATE_VALUES',
        values: {
          description: '',
          date: todayFormatted,
          title: '',
          titleIsValid: true
        }
      });
    }
  }, [mode]);

  const formSubmitHandler = () => {
    return submitForm(
      values,
      type,
      mode,
      projects,
      activeProject,
      categoriesIds,
      notificationsActive,
      dispatchValues,
      onResetScreen,
      dispatch
    );
  };

  const descriptionItem = (
    <FormItem
      label='Opis'
      inputStyle={{ minHeight: 120, paddingTop: 12 }}
      inputConfig={{
        value: values.description,
        onChangeText: (text) =>
          dispatchValues({
            type: 'UPDATE_VALUES',
            values: { description: text }
          }),
        multiline: true,
        textAlignVertical: 'top',
        placeholder: 'Co znajduje się na szczycie tej góry?',
        maxLength: 160
      }}
    />
  );

  return (
    <View style={styles.form}>
      <View style={styles.pickersContainer}>
        <FormItem
          isValid={values.dropdownIsValid}
          label={type === 'project' ? 'Kategoria' : 'Projekt'}
          itemStyle={styles.dropdown}>
          <DropdownPicker
            value={values.dropdown}
            isValid={values.dropdownIsValid}
            onValue={dispatchValues}
            data={type === 'project' ? categoryPickerData : projectPickerData}
          />
        </FormItem>
        <FormItem
          label='Termin'
          itemStyle={Platform.OS === 'android' && { flex: 1 }}>
          <View style={styles.dateInput}>
            <DatePicker
              date={values.date ?? todayFormatted}
              onValue={dispatchValues}
              type='date'
            />
          </View>
        </FormItem>
      </View>
      <FormItem
        isValid={values.titleIsValid}
        isUnique={values.titleIsUnique}
        label={type === 'project' ? 'Projekt' : 'Zadanie'}
        inputConfig={{
          value: values.title,
          onChangeText: (text) =>
            dispatchValues({
              type: 'UPDATE_VALUES',
              values: { title: text, titleIsValid: true }
            }),
          required: true,
          placeholder: 'Jaki cel siedzi Ci w głowie?',
          maxLength: 30,
          returnKeyType: 'done'
        }}
      />
      {type === 'project' && descriptionItem}
      <FormControls
        mode={mode}
        type={type}
        onResetScreen={onResetScreen}
        onSubmit={formSubmitHandler}
        activeProjectId={activeProject.id}
        backTo={values.dropdown}
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

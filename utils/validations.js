export const checkProjectValues = (newItem, projects, type) => {
  let { titleValue, dropdownValue } = newItem;

  let titleIsValid = titleValue.length > 0 && typeof titleValue === 'string';
  let titleIsUnique = false;
  const dropdownIsValid =
    dropdownValue && dropdownValue?.length > 0 && dropdownValue !== 'all';

  if (type === 'project') {
    const projectsNames = projects.map((project) => project.title);
    titleIsUnique = projectsNames.indexOf(titleValue) === -1;
    titleIsValid = titleIsValid && titleIsUnique;
  }

  const formIsValid = titleIsValid && dropdownIsValid;

  return {
    title: titleIsValid ?? false,
    dropdown: dropdownIsValid ?? false,
    form: formIsValid ?? false,
    uniqueTitle: titleIsUnique ?? false
  };
};

export const checkAsyncStorageData = (projects, tasks, settings) => {
  const projectsOK = Array.isArray(projects);
  const tasksOK = Array.isArray(tasks);
  const settingsOK =
    Array.isArray(settings.notificationsTime) &&
    settings.accentColor.length === 7 &&
    typeof settings.notificationsActive === 'boolean';

  return { projectsOK, tasksOK, settingsOK };
};

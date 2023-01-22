export const getProjectProgress = (project) => {
  const { finished, active } = project.tasks;
  const procent = (finished * 100) / (finished + active);

  return procent.toFixed();
};

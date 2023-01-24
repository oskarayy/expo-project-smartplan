const categories = [
  'love',
  'health',
  'career',
  'finances',
  'soul',
  'relations'
];

export const checkProjectValues = (newItem) => {
  let { titleValue, dropdownValue } = newItem;

  let titleIsValid = false;
  let dropdownIsValid = false;

  if (titleValue.length > 0 && typeof titleValue === 'string')
    titleIsValid = true;
  if (dropdownValue && dropdownValue?.length > 0 && dropdownValue !== 'all')
    dropdownIsValid = true;

  let formIsValid = false;
  if (titleIsValid && dropdownIsValid) formIsValid = true;

  return {
    title: titleIsValid,
    dropdown: dropdownIsValid,
    form: formIsValid
  };
};

export class Project {
  constructor(
    title,
    description,
    date,
    dropdownValue,
    id = `project-${dropdownValue}-${new Date().getTime()}`,
    category = dropdownValue,
    progress = 0,
    tasks = { active: 0, finished: 0 }
  ) {
    this.id = id;
    this.title = title.trim();
    this.desc = description.trim();
    this.category = category;
    this.progress = progress;
    this.tasks = tasks;
    this.deadline = date;
  }
}

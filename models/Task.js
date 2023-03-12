export class Task {
  constructor(title, dropdownValue, date) {
    this.id = `${dropdownValue}-task-${new Date().getTime()}`;
    this.task = title.trim();
    this.projectId = dropdownValue;
    this.deadline = date;
    this.finished = false;
  }
}

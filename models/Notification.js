import { getDeadlineString } from '../utils/getDeadlineString';

export class Notification {
  constructor(task, project, trigger = { hour: 8, minute: 0, repeats: true }) {
    this.content = {
      title: task.task,
      subtitle: getDeadlineString(task.deadline, true),
      body: `Projekt: ${project.title}`,
      data: { projectId: task.projectId }
    };
    this.trigger = trigger;
  }
}

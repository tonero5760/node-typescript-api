interface ITask {
  _id: string;
  title: string;
  categoryId: string;
  user: string;
  isCompleted: boolean;
  isEditable: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export default ITask;

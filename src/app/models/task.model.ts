
export interface TaskModel {
    id: number;
    title: string;
    description: string;
    dueDate?: string;
    reference?: string;
}

export interface TaskState{
    open?: TaskModel[],
    pending?: TaskModel[],
    inProgress?: TaskModel[],
    completed?: TaskModel[],
}


package com.codurance.training.tasks;

import java.util.List;

public class Project {
    private List<Task> tasks;

    public Project(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void remove(Task taskToRemove) {
        tasks.remove(taskToRemove);
    }
}

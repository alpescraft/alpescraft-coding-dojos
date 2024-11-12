package com.codurance.training.tasks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.*;

public final class TaskList implements Runnable {
    private static final String QUIT = "quit";

    private final Map<ProjectName, Project> tasks = new LinkedHashMap<>();
    private final BufferedReader in;
    private final PrintWriter out;

    private long lastId = 0;

    public static void main(String[] args) throws Exception {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        new TaskList(in, out).run();
    }

    public TaskList(BufferedReader reader, PrintWriter writer) {
        this.in = reader;
        this.out = writer;
    }

    public void run() {
        while (true) {
            out.print("> ");
            out.flush();
            String command;
            try {
                command = in.readLine();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            if (command.equals(QUIT)) {
                break;
            }
            execute(command);
        }
    }

    private void execute(String commandLine) {
        String[] commandRest = commandLine.split(" ", 2);
        String command = commandRest[0];
        switch (command) {
            case "show":
                show();
                break;
            case "add":
                add(commandRest[1]);
                break;
            case "check":
                check(commandRest[1]);
                break;
            case "uncheck":
                uncheck(commandRest[1]);
                break;
            case "help":
                help();
                break;
            case "delete":
                delete(commandRest[1]);
                break;
            default:
                error(command);
                break;
        }
    }

    private void delete(String taskId) {
        ProjectName projectKey = new ProjectName("");
        Task taskToRemove = null;
        for (Map.Entry<ProjectName, Project> project : tasks.entrySet()) {
            for (Task task : project.getValue().getTasks()) {
                if (task.getId() == Long.parseLong(taskId)) {
                    projectKey = project.getKey();
                    taskToRemove = task;
                }
            }
            if (projectKey.name().isEmpty()) continue;
            project.getValue().remove(taskToRemove);
            removeTask result = new removeTask(projectKey, taskToRemove);
            Result result = new Result(projectKey, taskToRemove);
        }

    }

    private record Result(ProjectName projectKey, Task taskToRemove) {
    }

    private record removeTask(ProjectName projectKey, Task taskToRemove) {
    }

    private void show() {
        for (Map.Entry<ProjectName, Project> project : tasks.entrySet()) {
            out.println(project.getKey().name());
            for (Task task : project.getValue().getTasks()) {
                out.printf("    [%c] %d: %s%n", (task.isDone() ? 'x' : ' '), task.getId(), task.getDescription());
            }
            out.println();
        }
    }

    private void add(String commandLine) {
        String[] subcommandRest = commandLine.split(" ", 2);
        String subcommand = subcommandRest[0];
        if (subcommand.equals("project")) {
            addProject(subcommandRest[1]);
        } else if (subcommand.equals("task")) {
            String[] projectTask = subcommandRest[1].split(" ", 2);
            addTask(projectTask[1], new ProjectName(projectTask[0]));
        }
    }

    private void addProject(String name) {
        tasks.put(new ProjectName(name), new Project(new ArrayList<>()));
    }

    private void addTask(String description, ProjectName projectName) {
        List<Task> projectTasks = tasks.get(projectName).getTasks();
        if (projectTasks == null) {
            out.printf("Could not find a project with the name \"%s\".", projectName);
            out.println();
            return;
        }
        projectTasks.add(new Task(nextId(), description, false));
    }

    private void check(String idString) {
        setDone(idString, true);
    }

    private void uncheck(String idString) {
        setDone(idString, false);
    }

    private void setDone(String idString, boolean done) {
        int id = Integer.parseInt(idString);
        for (Map.Entry<ProjectName, Project> project : tasks.entrySet()) {
            for (Task task : project.getValue().getTasks()) {
                if (task.getId() == id) {
                    task.setDone(done);
                    return;
                }
            }
        }
        out.printf("Could not find a task with an ID of %d.", id);
        out.println();
    }

    private void help() {
        out.println("Commands:");
        out.println("  show");
        out.println("  add project <project name>");
        out.println("  add task <project name> <task description>");
        out.println("  check <task ID>");
        out.println("  uncheck <task ID>");
        out.println();
    }

    private void error(String command) {
        out.printf("I don't know what the command \"%s\" is.", command);
        out.println();
    }

    private long nextId() {
        return ++lastId;
    }
}

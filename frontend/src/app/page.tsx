"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export default function Home() {
  // @ts-nocheck
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/api/v1/get_all_todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTask = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const newTask = {
        title,
        description,
      };

      // Send POST request to API (Mock API or real backend)
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/create_todo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );

        if (response.ok) {
          await response.json();
          setTitle(""); // Reset title input
          setDescription(""); // Reset description input
          fetchTodos();
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:8000/api/v1/delete_todo/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          To-Do App
        </h1>

        {/* Input Area */}
        <div className="space-y-4 mb-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={addTask}
            className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {todos.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-100 rounded-md text-gray-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{task.title}</span>
                  <span className="text-sm text-gray-600">
                    {task.description}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

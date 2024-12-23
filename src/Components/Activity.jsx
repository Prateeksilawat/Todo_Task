import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToTask } from "../redux/slices/cartSlice";
import StopWatch from "./StopWatch";
import { v4 as uuidv4 } from "uuid";

const Activity = () => {
  const [task, setTask] = useState({
    date: "",
    action: "",
  });

  const [activeTimerId, setActiveTimerId] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  const Tasks = useSelector((state) => state.Day_to_Task);
  const dispatch = useDispatch();

  console.log(Tasks, "Tasks List");

  // Change handler for task inputs
  function changeHandler(event) {
    setTask((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  // Change handler for filter input
  function filterDateHandler(event) {
    setFilterDate(event.target.value);
  }

  // Form submit handler
  function submitHandler(event) {
    event.preventDefault();

    if (task.date === "" || task.action === "") {
      alert("Please enter both task name and date!");
      return;
    }

    const newTask = {
      id: uuidv4(),
      ...task,
    };

    dispatch(addToTask(newTask));
    setTask({ date: "", action: "" });
  }

  // Filtered tasks based on the selected date
  const filteredTasks = filterDate
    ? Tasks.filter((task) => task.date === filterDate)
    : Tasks;

  return (
    <div className="mt-20">
      {/* Task Submission Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 items-center justify-center"
      >
        <div className="flex flex-col gap-4 items-center">
          <label className="font-mono text-xl font-semibold">
            Select Date
            <input
              type="date"
              onChange={changeHandler}
              name="date"
              required
              value={task.date}
              className="outline-none border rounded-lg pl-1 py-1.5 ml-4"
            />
          </label>

          <label className="font-mono text-xl font-semibold">
            Task
            <input
              type="text"
              placeholder="Enter Your Task"
              onChange={changeHandler}
              required
              name="action"
              value={task.action}
              className="pl-1 py-1.5 outline-none border rounded-lg ml-4"
            />
          </label>

          <button className="border w-[100px] h-10 rounded-lg font-semibold text-lg">
            Submit
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex gap-3 mt-4">
          <input
            type="date"
            onChange={filterDateHandler}
            value={filterDate}
            className="outline-none border pl-1 py-1.5 rounded-lg font-mono font-semibold text-lg w-[150px]"
          />
        </div>
      </form>

      {/* Task List Header */}
      <div>
        <ul className="flex item-center mt-4 justify-between w-[420px]">
          <li className="text-2xl font-serif font-bold">Date</li>
          <li className="text-2xl font-serif font-bold">Activity</li>
          <li className="text-2xl font-serif font-bold">Timer</li>
        </ul>
      </div>

      {/* Filtered Task List */}
      <div className="mt-5">
        <ul>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex gap-2 mt-4 items-center justify-between w-full"
            >
              <li className="font-mono text-xl font-bold">{task.date}</li>
              <div className="w-[2px] h-4 bg-slate-500 ml-2"></div>
              <li className="font-mono text-xl ml-2 font-bold">
                {task.action}
              </li>
              <div className="w-[2px] h-4 bg-slate-500 ml-2"></div>
              <StopWatch
                id={task.id}
                activeTimerId={activeTimerId}
                setActiveTimerId={setActiveTimerId}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Activity;

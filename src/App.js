import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import useLocalStorage from "./lib/useLocalStorage";

function App() {
  // State untuk menyimpan daftar tugas
  const [todos, setTodos, isLoading] = useLocalStorage("todos", []);
  // State untuk menyimpan filter yang dipilih
  const [filter, setFilter] = useState("All");
  // State untuk menyimpan ID tugas yang sedang diedit
  const [currentlyEditing, setCurrentlyEditing] = useState("");
  const navigate = useNavigate();
  
  // Ref untuk latar belakang Vanta
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    console.log("State Todos:", todos);
    console.log("Sedang Memuat:", isLoading);
  }, [todos, isLoading]);

  // Initialize Vanta.WAVES
  useEffect(() => {
    if (!vantaEffect) {
      const scriptThree = document.createElement('script');
      // Downgrade Three.js to r124
      scriptThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.min.js';
      scriptThree.async = true;
      scriptThree.onload = () => {
        const scriptVanta = document.createElement('script');
        scriptVanta.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.21/vanta.waves.min.js';
        scriptVanta.async = true;
        scriptVanta.onload = () => {
          if (window.VANTA && window.VANTA.WAVES) {
            setVantaEffect(
              window.VANTA.WAVES({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x1e3a8a, // Customize as needed
                shininess: 50,
                waveHeight: 20,
                waveSpeed: 0.25,
                zoom: 0.75
              })
            );
          }
        };
        document.body.appendChild(scriptVanta);
      };
      document.body.appendChild(scriptThree);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Fungsi untuk menambah tugas baru
  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  // Fungsi untuk menghapus tugas berdasarkan ID
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Fungsi untuk menghapus semua tugas
  function deleteAll() {
    setTodos([]);
  }

  // Fungsi untuk mengubah status selesai tugas berdasarkan ID
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  }

  // Fungsi untuk mengubah status selesai semua tugas
  function toggleAll() {
    const newCompletedStatus = !todos.every(todo => todo.completed);
    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: newCompletedStatus,
      }))
    );
  }

  // Fungsi untuk memperbarui teks tugas berdasarkan ID
  function updateTodo(text, id) {
    console.log(text);
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: text,
            }
          : todo
      )
    );
  }

  // Fungsi untuk menandai semua tugas sebagai selesai
  function completeAll() {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      }))
    );
  }

  // Daftar tombol filter berdasarkan nama filter
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={vantaRef} className="app-container flex h-screen relative">
      <div className="m-auto bg-primary-600 bg-opacity-75 p-6 rounded-lg text-white max-w-md w-full relative z-10 flex flex-col items-center">
        <h2 className="text-white text-xl font-semibold mb-4 handwritten text-center">To Do List</h2>
        <Form addTodo={addTodo} />
        <ul className="todos w-full">
          {todos.filter(FILTER_MAP[filter]).map(({ text, id, completed }) => (
            <Todo
              key={id}
              text={text}
              id={id}
              completed={completed}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              isEditing={id === currentlyEditing}
              setCurrentlyEditing={setCurrentlyEditing}
            />
          ))}
        </ul>

        <div className="hidden">
          <button onClick={deleteAll}>Delete All</button>
          <button onClick={toggleAll}>Toggle All</button>
          <button onClick={completeAll}>Complete All</button>
        </div>
        <div className={todos.length === 0 ? "hidden" : ""}>{filterList}</div>
      </div>
    </div>
  );
}

export default App;

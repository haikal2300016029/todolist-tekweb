import { useState } from "react";
import { nanoid } from 'nanoid'; // Import untuk menghasilkan ID unik
import plus from '../icons/plus.svg'; // Import ikon tambah

function Form ({ addTodo }) {

  // State untuk menyimpan teks input
  const [text, setText] = useState("");

  // Fungsi ketika formulir disubmit
  function handleSubmit(e) {
    e.preventDefault();
    const todoText = text.trim();
    if (!todoText) return;
    addTodo({
      text: todoText,
      id: `todo-${nanoid()}`, // Membuat ID unik untuk tugas
      completed: false
    });
    clearForm(); // Membersihkan formulir setelah menambah tugas
  }

  // Fungsi untuk membersihkan input
  function clearForm() {
    setText("");
  }

  return (
    <form className="text-white flex gap-1 w-full mb-4" onSubmit={handleSubmit}>
      <label htmlFor="todo" className="flex-1 mr-1" > 
        <span className="hidden">Todo</span>
        {/* Input teks untuk menambah tugas baru */}
        <input 
          className="w-full text-inherit px-1 py-2 border-0 border-b border-white bg-transparent outline-0" 
          type="text" 
          name="todo" 
          placeholder="Tambahkan To Do List Baru" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      {/* Tombol tambah tugas */}
      <button className="text-inherit bg-secondary w-9 h-9 flex justify-center items-center rounded-full shadow-button" type="submit">
        <img src={plus} alt="plus" />
        <span className="sr-only">Tambahkan To Do List</span>
      </button>
    </form>
  )
}

export default Form;
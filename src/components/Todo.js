import { useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2';
import trashcan from '../icons/trashcan.svg'; // Import ikon tong sampah
import edit from '../icons/edit.svg'; // Import ikon edit

function Todo ({ text, id, completed, deleteTodo, toggleTodo, updateTodo, isEditing, setCurrentlyEditing }) {

  // State untuk menyimpan teks baru saat mengedit
  const [newText, setNewText] = useState(text);

  // Ref untuk input saat mengedit agar bisa difokuskan
  const editingInput = useRef(null);

  useEffect(() => {
    // Jika sedang mengedit, fokuskan input
    if (!isEditing) return;
    editingInput.current.focus();
  }, [isEditing]);
  
  // Fungsi ketika formulir disubmit
  function handleSubmit(e) {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    updateTodo(text, id); // Memperbarui tugas dengan teks baru
    setCurrentlyEditing(); // Menghentikan mode mengedit
  }

  // Fungsi ketika teks diinput saat mengedit berubah
  function handleEditInputChange (e) {
    setNewText(e.target.value);
    updateTodo(e.target.value, id); // Memperbarui tugas secara real-time
  }

  // Fungsi untuk menangani klik tombol edit
  function handleEditButtonClick (e) {
    isEditing ? setCurrentlyEditing("") : setCurrentlyEditing(id);
  }

  // Fungsi untuk menangani klik tombol hapus dengan konfirmasi SweetAlert
  function handleDeleteButtonClick (e) {
    Swal.fire({
      title: 'Apakah kamu yakin mau hapus?',
      text: "Tugas ini akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<span style="font-size: 1.2em;">Ya, hapus!</span>',
      cancelButtonText: '<span style="font-size: 1.2em;">Tidak, batalkan</span>',
      customClass: {
        confirmButton: 'swal2-confirm swal2-styled visible-button',
        cancelButton: 'swal2-cancel swal2-styled visible-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id);
        Swal.fire({
          title: 'Terhapus!',
          text: 'Tugas telah dihapus.',
          icon: 'success',
          confirmButtonText: '<span style="font-size: 1.2em;">OK</span>',
          customClass: {
            confirmButton: 'swal2-confirm swal2-styled visible-button'
          }
        });
      }
    });
  }

  return (
    <li className="relative flex items-center text-white bg-primary-400 mb-3 p-2" id={id} key={id} data-completed={completed}>
      <label htmlFor={`input-${id}`} className="group cursor-pointer" >
        {/* Checkbox untuk menandai tugas selesai */}
        <input 
          checked={completed} 
          onChange={() => toggleTodo(id)} 
          value={completed} 
          className="appearance-none w-3.5 h-3.5 mr-2 border rounded-full ease-linear duration-400 group-hover:shadow-checkbox group-hover:border-secondary checked:border-secondary checked:bg-secondary" 
          id={`input-${id}`} 
          type="checkbox" 
        />
        {/* Teks tugas dengan garis tengah jika selesai */}
        <span className={`todo-text ${completed ? 'completed' : ''}`}>{text}</span>
      </label>
      
      {/* Formulir untuk mengedit tugas */}
      <form className={!isEditing ? 'hidden' : ''} onSubmit={handleSubmit}>
        <input 
          ref={editingInput} 
          className="absolute left-7.5 top-2 bg-primary-400 outline-none border-0 border-b border-white" 
          id={`edit-box-${id}`} 
          type="text" 
          value={newText} 
          onChange={handleEditInputChange}
        />
        <button className="hidden" type="submit">Update</button>
      </form>
      
      {/* Tombol edit */}
      <button className="ml-auto text-white" onClick={handleEditButtonClick}>
        <img src={edit} alt="edit" />
      </button> 
      
      {/* Tombol hapus */}
      <button className="ml-2 text-white" onClick={handleDeleteButtonClick}>
        <img src={trashcan} alt="delete" />    
      </button>
      
      {/* Tombol toggle tersembunyi */}
      <button className="hidden" onClick={() => toggleTodo(id)}>Toggle</button>
      
    </li>
  )
}

export default Todo;

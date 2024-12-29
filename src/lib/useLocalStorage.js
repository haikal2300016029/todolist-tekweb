import { useEffect, useState } from "react";

function useLocalStorage(key, initial) {
  // Menggunakan useState untuk menyimpan nilai dari localStorage atau nilai awal
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initial;
  });
  
  // State untuk menandakan apakah data sedang dimuat
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Menghapus item dari localStorage untuk kunci tertentu
        localStorage.removeItem(key);
        
        // Mengambil data dari file JSON
        const response = await fetch('/data/todos.json');
        console.log('Mengambil data dari:', '/data/todos.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Mengubah respons menjadi format JSON
        const data = await response.json();
        console.log("Data berhasil diambil:", data);
        
        // Menyimpan data ke localStorage
        localStorage.setItem(key, JSON.stringify(data));
        
        // Memperbarui state dengan data yang diambil
        setValue(data);
      } catch (error) {
        console.error("Error mengambil data:", error);
      } finally {
        // Menandakan bahwa proses loading telah selesai
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [key]);

  useEffect(() => {
    if (!isLoading && value !== initial) {
      console.log("Menyimpan ke localStorage:", value);
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, initial, isLoading]);

  return [value, setValue, isLoading];
}

export default useLocalStorage;
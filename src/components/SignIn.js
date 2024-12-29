import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // State untuk menyimpan email dan password yang diinput
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State untuk menyimpan pesan error
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Memeriksa kredensial yang diinput
    if (email === 'haikal@example.com' && password === '123456') {
      // Menyimpan status autentikasi di localStorage
      localStorage.setItem('isAuthenticated', 'true');
      // Mengarahkan pengguna ke halaman utama
      navigate('/');
    } else {
      // Menampilkan pesan error jika kredensial salah
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Sign In</h2>
        {/* Menampilkan pesan error jika ada */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          {/* Input untuk email */}
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          {/* Input untuk password */}
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Tombol submit */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;

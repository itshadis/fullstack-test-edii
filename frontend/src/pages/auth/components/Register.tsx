import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nama }),
      });
      
      
      // Periksa apakah respons sukses
      if (!response.ok) {
        throw new Error(`Register gagal: ${response.statusText}`);
      }
      
      const data = await response.json()      
      
      if(data.status) {
        Swal.fire({
          icon: 'success',
          text: 'Register berhasil, silahkan login untuk melanjutkan',
          timer: 1000
        })

        setTimeout(() => {
          navigate('/')
        }, 800);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          <p className="text-center mt-3">
            Sudah punya akun? <button className="btn btn-link text-decoration-none p-0" onClick={toggle}>Sign In</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register
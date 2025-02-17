import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { DataDiri } from "../../types/biodata.type";
import ModalDetailPelamar from "./components/ModalDetailPelamar";
import Swal from "sweetalert2";
import { Form, Row, Col } from "react-bootstrap";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [applicants, setApplicants] = useState<DataDiri[]>([]);
  const [detailApplicant, setDetailApplicant] = useState<DataDiri | null>(null);
  const [showModal, setShowModal] = useState(false);

  // State untuk filter yang akan dikirim ke API
  const [filterNama, setFilterNama] = useState("");
  const [filterPosisi, setFilterPosisi] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");

  // State untuk input filter sebelum debounce
  const [searchNama, setSearchNama] = useState("");
  const [searchPosisi, setSearchPosisi] = useState("");
  const [searchJenjang, setSearchJenjang] = useState("");

  if (user && user.role !== "admin") {
    navigate("/");
  }

  useEffect(() => {
    getAllBiodataPelamar();
  }, [filterNama, filterPosisi, filterJenjang]); // Jalankan ulang saat filter berubah

  // Debounce untuk filter dengan delay 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilterNama(searchNama);
      setFilterPosisi(searchPosisi);
      setFilterJenjang(searchJenjang);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchNama, searchPosisi, searchJenjang]);

  // Get All Biodata Pelamar dengan Filter
  const getAllBiodataPelamar = async () => {
    try {
      const url = new URL("http://localhost:4000/biodata/all");
      if (filterNama) url.searchParams.append("nama", filterNama);
      if (filterPosisi) url.searchParams.append("posisi", filterPosisi);
      if (filterJenjang) url.searchParams.append("jenjang", filterJenjang);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengambil data");
      }

      const data = await response.json();
      setApplicants(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle detail
  const handleDetail = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/biodata/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status) {
        setDetailApplicant(data.data);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/biodata/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          text: "Biodata berhasil dihapus",
          timer: 1000,
        });
        getAllBiodataPelamar();
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Daftar Pelamar</h2>

      {/* Filter Section */}
      <div className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Cari berdasarkan nama"
                value={searchNama}
                onChange={(e) => setSearchNama(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Cari berdasarkan posisi"
                value={searchPosisi}
                onChange={(e) => setSearchPosisi(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Cari berdasarkan pendidikan"
                value={searchJenjang}
                onChange={(e) => setSearchJenjang(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tempat, Tanggal Lahir</th>
            <th>Posisi yang Dilamar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.user.nama}</td>
              <td>{applicant.tempat_lahir} - {applicant.tanggal_lahir}</td>
              <td>{applicant.posisi_lamaran}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleDetail(applicant.id_user)}
                >
                  Detail
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(applicant.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Detail */}
      <ModalDetailPelamar
        data={detailApplicant}
        show={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default AdminPage;

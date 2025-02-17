import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { RiwayatPekerjaan } from "../../../types/biodata.type"; // Pastikan tipe ini sudah ada

interface Props {
  id_biodata: string;
  riwayat_pekerjaan: RiwayatPekerjaan[];
}

const RiwayatPekerjaanComponent: React.FC<Props> = ({ id_biodata, riwayat_pekerjaan: initialRiwayatPekerjaan }) => {
  const [riwayatPendidikan, setRiwayatPekerjaan] = useState<RiwayatPekerjaan[]>(initialRiwayatPekerjaan);
  const [showModal, setShowModal] = useState(false);
  const [selectedRiwayat, setSelectedRiwayat] = useState<RiwayatPekerjaan | null>(null);
  const [formData, setFormData] = useState({
    id_biodata: id_biodata,
    nama_perusahaan: "",
    jabatan: "",
    salary: "",
    tahun: "",
  });
  const [loading, setLoading] = useState(false);

  const handleTambahRiwayat = () => {
    setSelectedRiwayat(null);
    setFormData({
      id_biodata: id_biodata,
      nama_perusahaan: "",
      jabatan: "",
      salary: "",
      tahun: "",
    });
    setShowModal(true);
  };

  const handleUpdateRiwayat = (item: RiwayatPekerjaan) => {
    setSelectedRiwayat(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleHapusRiwayat = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/riwayat-pekerjaan/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setRiwayatPekerjaan((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSimpanRiwayat = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation()
    setLoading(true);

    try {
      const url = selectedRiwayat
        ? `http://localhost:4000/riwayat-pekerjaan/update/${selectedRiwayat.id}`
        : "http://localhost:4000/riwayat-pekerjaan/create";
      const method = selectedRiwayat ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        if (selectedRiwayat) {
          // Update riwayat pendidikan yang sudah ada
          setRiwayatPekerjaan((prev) =>
            prev.map((item) => (item.id === selectedRiwayat.id ? data.data : item))
          );
        } else {
          // Tambah riwayat pendidikan baru
          setRiwayatPekerjaan((prev) => [...prev, data.data]);
        }
        setShowModal(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="d-flex flex-column gap-3 mb-5">
      {riwayatPendidikan.length > 0 ? (
        riwayatPendidikan.map((item, index) => (
          <Card key={index} className="p-2">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>
                  {item.jabatan}
                </Card.Title>
                <div className="d-flex gap-1">
                  <Button size="sm" onClick={() => handleUpdateRiwayat(item)} disabled={loading}>
                    Ubah
                  </Button>
                  <Button
                    size="sm"
                    className="btn-danger"
                    onClick={() => handleHapusRiwayat(item.id)}
                    disabled={loading}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
              <Card.Text>{item.nama_perusahaan}</Card.Text>
              <Card.Text>Tahun: {item.tahun}</Card.Text>
              <Card.Text>Salary: {item.salary}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">Tidak ada riwayat pekerjaan</p>
      )}
      <div>
        <Button className="btn btn-success" onClick={handleTambahRiwayat} disabled={loading}>
          Tambah Riwayat Pekerjaan +
        </Button>
      </div>

      {/* Modal untuk menambah/mengubah riwayat pekerjaan */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRiwayat ? "Ubah Riwayat Pekerjaan" : "Tambah Riwayat Pekerjaan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSimpanRiwayat}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Perusahaan</Form.Label>
              <Form.Control
                type="text"
                name="nama_perusahaan"
                value={formData.nama_perusahaan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tahun</Form.Label>
              <Form.Control
                type="text"
                name="tahun"
                value={formData.tahun}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
                Batal
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RiwayatPekerjaanComponent;
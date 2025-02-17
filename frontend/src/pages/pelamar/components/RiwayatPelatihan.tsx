import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { RiwayatPelatihan } from "../../../types/biodata.type"; // Pastikan tipe ini sudah ada

interface Props {
  id_biodata: string;
  riwayat_pelatihan: RiwayatPelatihan[];
}

const RiwayatPelatihanComponent: React.FC<Props> = ({ id_biodata, riwayat_pelatihan: initialRiwayatPelatihan }) => {
  const [riwayatPelatihan, setRiwayatPelatihan] = useState<RiwayatPelatihan[]>(initialRiwayatPelatihan);
  const [showModal, setShowModal] = useState(false);
  const [selectedRiwayat, setSelectedRiwayat] = useState<RiwayatPelatihan | null>(null);
  const [formData, setFormData] = useState({
    id_biodata: id_biodata,
    jenis_pelatihan: "",
    sertifikat: "",
    tahun: "",
  });
  const [loading, setLoading] = useState(false);

  const handleTambahRiwayat = () => {
    setSelectedRiwayat(null);
    setFormData({
      id_biodata: id_biodata,
      jenis_pelatihan: "",
      sertifikat: "",
      tahun: "",
    });
    setShowModal(true);
  };

  const handleUpdateRiwayat = (item: RiwayatPelatihan) => {
    setSelectedRiwayat(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleHapusRiwayat = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/riwayat-pelatihan/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setRiwayatPelatihan((prev) => prev.filter((item) => item.id !== id));
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
        ? `http://localhost:4000/riwayat-pelatihan/update/${selectedRiwayat.id}`
        : "http://localhost:4000/riwayat-pelatihan/create";
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
          setRiwayatPelatihan((prev) =>
            prev.map((item) => (item.id === selectedRiwayat.id ? data.data : item))
          );
        } else {
          // Tambah riwayat pendidikan baru
          setRiwayatPelatihan((prev) => [...prev, data.data]);
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
      {riwayatPelatihan.length > 0 ? (
        riwayatPelatihan.map((item, index) => (
          <Card key={index} className="p-2">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>
                  {item.jenis_pelatihan}
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
              <Card.Text>Tahun: {item.tahun}</Card.Text>
              <Card.Text>Sertifikat: {item.sertifikat}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">Tidak ada riwayat pelatihan</p>
      )}
      <div>
        <Button className="btn btn-success" onClick={handleTambahRiwayat} disabled={loading}>
          Tambah Riwayat Pelatihan +
        </Button>
      </div>

      {/* Modal untuk menambah/mengubah riwayat pelatihan */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRiwayat ? "Ubah Riwayat Pelatihan" : "Tambah Riwayat Pelatihan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSimpanRiwayat}>
            <Form.Group className="mb-3">
              <Form.Label>Jenis Pelatihan</Form.Label>
              <Form.Control
                type="text"
                name="jenis_pelatihan"
                value={formData.jenis_pelatihan}
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
              <Form.Label>Sertifikat</Form.Label>
              <Form.Control
                type="text"
                name="sertifikat"
                value={formData.sertifikat}
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

export default RiwayatPelatihanComponent;
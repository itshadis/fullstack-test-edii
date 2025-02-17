import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { RiwayatPendidikan } from "../../../types/biodata.type"; // Pastikan tipe ini sudah ada

interface Props {
  id_biodata: string;
  riwayat_pendidikan: RiwayatPendidikan[];
}

const RiwayatPendidikanComponent: React.FC<Props> = ({ id_biodata, riwayat_pendidikan: initialRiwayatPendidikan }) => {
  const [riwayatPendidikan, setRiwayatPendidikan] = useState<RiwayatPendidikan[]>(initialRiwayatPendidikan);
  const [showModal, setShowModal] = useState(false);
  const [selectedRiwayat, setSelectedRiwayat] = useState<RiwayatPendidikan | null>(null);
  const [formData, setFormData] = useState({
    id_biodata: id_biodata,
    jenjang_pendidikan: "",
    jurusan: "",
    instansi: "",
    tahun_lulus: "",
    ipk: "",
  });
  const [loading, setLoading] = useState(false);

  const handleTambahRiwayat = () => {
    setSelectedRiwayat(null);
    setFormData({
      id_biodata: id_biodata,
      jenjang_pendidikan: "",
      jurusan: "",
      instansi: "",
      tahun_lulus: "",
      ipk: "",
    });
    setShowModal(true);
  };

  const handleUpdateRiwayat = (item: RiwayatPendidikan) => {
    setSelectedRiwayat(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleHapusRiwayat = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/riwayat-pendidikan/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setRiwayatPendidikan((prev) => prev.filter((item) => item.id !== id));
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
        ? `http://localhost:4000/riwayat-pendidikan/update/${selectedRiwayat.id}`
        : "http://localhost:4000/riwayat-pendidikan/create";
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
          setRiwayatPendidikan((prev) =>
            prev.map((item) => (item.id === selectedRiwayat.id ? data.data : item))
          );
        } else {
          // Tambah riwayat pendidikan baru
          setRiwayatPendidikan((prev) => [...prev, data.data]);
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
                  {item.jenjang_pendidikan} {item.jurusan}
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
              <Card.Text>{item.instansi}</Card.Text>
              <Card.Text>Tahun Lulus: {item.tahun_lulus}</Card.Text>
              <Card.Text>IPK: {item.ipk}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">Tidak ada riwayat pendidikan</p>
      )}
      <div>
        <Button className="btn btn-success" onClick={handleTambahRiwayat} disabled={loading}>
          Tambah Riwayat Pendidikan +
        </Button>
      </div>

      {/* Modal untuk menambah/mengubah riwayat pendidikan */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRiwayat ? "Ubah Riwayat Pendidikan" : "Tambah Riwayat Pendidikan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSimpanRiwayat}>
            <Form.Group className="mb-3">
              <Form.Label>Jenjang Pendidikan</Form.Label>
              <Form.Control
                type="text"
                name="jenjang_pendidikan"
                value={formData.jenjang_pendidikan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jurusan</Form.Label>
              <Form.Control
                type="text"
                name="jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instansi</Form.Label>
              <Form.Control
                type="text"
                name="instansi"
                value={formData.instansi}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tahun Lulus</Form.Label>
              <Form.Control
                type="text"
                name="tahun_lulus"
                value={formData.tahun_lulus}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>IPK</Form.Label>
              <Form.Control
                type="text"
                name="ipk"
                value={formData.ipk}
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

export default RiwayatPendidikanComponent;
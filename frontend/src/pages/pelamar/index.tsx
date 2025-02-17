import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import RiwayatPendidikanComponent from "./components/RiwayatPendidikan";
import RiwayatPekerjaanComponent from "./components/RiwayatPekerjaan";
import RiwayatPelatihanComponent from "./components/RiwayatPelatihan";
import { useAuth } from "../../context/AuthContext";

const DetailPelamar: React.FC = () => {
  const { user, token } = useAuth()
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const location = useLocation()
  const biodata = location.state
  const [formData, setFormData] = useState({
    id: biodata?.id || "",
    id_user: biodata?.id_user || "",
    posisi_lamaran: biodata?.posisi_lamaran || "",
    nama: biodata?.user?.nama || user?.nama,
    no_ktp: biodata?.no_ktp || "",
    tempat_lahir: biodata?.tempat_lahir || "",
    tanggal_lahir: biodata?.tanggal_lahir || "",
    jenis_kelamin: biodata?.jenis_kelamin || "",
    agama: biodata?.agama || "",
    gol_darah: biodata?.gol_darah || "",
    status_perkawinan: biodata?.status_perkawinan || "",
    alamat_ktp: biodata?.alamat_ktp || "",
    alamat_sekarang: biodata?.alamat_sekarang || "",
    email: biodata?.user?.email || user?.email,
    no_telp: biodata?.no_telp || "",
    orang_terdekat: biodata?.orang_terdekat || "",
    riwayat_pendidikan: biodata?.riwayat_pendidikan || "",
    riwayat_pelatihan: biodata?.riwayat_pelatihan || "",
    riwayat_pekerjaan: biodata?.riwayat_pekerjaan || "",
    skill: biodata?.skill || "",
    ketersediaan_penempatan: biodata?.ketersediaan_penempatan || "",
    expected_salary: biodata?.expected_salary || "",
  });

  // Handle perubahan input form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    console.log('changee', name, value, type )

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if(type === 'date') {
      const formatDate = moment(value, "YYYY-MM-DD").format('DD/MM/YYYY')
      setFormData((prev) => ({ ...prev, [name]: formatDate }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle submit form (edit data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/biodata/upsert/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()
      console.log('resssssssss', data)
      if(data.success) {
        Swal.fire({
          icon: 'success',
          text: data.message,
          timer: 1000
        })
        setTimeout(() => {
          navigate('/')
        }, 900);
      } else {
        Swal.fire({
          icon: 'warning',
          text: "Gagal simpan perubahan",
          timer: 1000
        })
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  console.log('formmmmm', formData);
  
  return (
    <div className="container mt-5">
      <h2>Detail Pelamar</h2>
      <hr />
      
      <Form className="mt-4" onSubmit={handleSubmit}>
        {/* Posisi yang Dilamar */}
        <Form.Group as={Row} className="mb-3" controlId="posisi_lamaran">
          <Form.Label column sm="3">
            Posisi yang Dilamar
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="posisi_lamaran"
              value={formData.posisi_lamaran}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} className="mb-3" controlId="nama">
          <Form.Label column sm="3">
            Nama
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* No KTP */}
        <Form.Group as={Row} className="mb-3" controlId="no_ktp">
          <Form.Label column sm="3">
            No KTP
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="no_ktp"
              value={formData.no_ktp}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Tempat, Tanggal Lahir */}
        <Form.Group as={Row} className="mb-3" controlId="tempatTanggalLahir">
          <Form.Label column sm="3">
            Tempat, Tanggal Lahir
          </Form.Label>
          <Col sm="2">
            {/* Tempat Lahir */}
            <Form.Control
              type="text"
              name="tempat_lahir"
              value={formData.tempat_lahir}
              onChange={handleOnChange}
              className={`border border-dark rounded px-2`}
            />
          </Col>
          <Col sm="5">
            {/* Tanggal Lahir */}
            <input type="date"
              name="tanggal_lahir"
              value={moment(formData.tanggal_lahir).format("YYYY-MM-DD")}
              onChange={handleOnChange}
              className={`w-50 form-control border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>


        {/* Jenis Kelamin */}
        <Form.Group as={Row} className="mb-3" controlId="jenis_kelamin">
          <Form.Label column sm="3">
            Jenis Kelamin
          </Form.Label>
          <Col sm="9">
            <>
              <Form.Check
                type="radio"
                label="Laki-laki"
                name="jenis_kelamin"
                value="Laki-laki"
                checked={formData.jenis_kelamin === "Laki-laki"}
                onChange={handleOnChange}
                
              />
              <Form.Check
                type="radio"
                label="Perempuan"
                name="jenis_kelamin"
                value="Perempuan"
                checked={formData.jenis_kelamin === "Perempuan"}
                onChange={handleOnChange}
              />
            </>
          </Col>
        </Form.Group>

        {/* Agama */}
        <Form.Group as={Row} className="mb-3" controlId="agama">
          <Form.Label column sm="3">
            Agama
          </Form.Label>
          <Col sm="9">
            <Form.Select
              name="agama"
              value={formData.agama}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            >
              <option value="" disabled>Pilih Agama</option> {/* Opsi kosong awal */}
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Golongan Darah */}
        <Form.Group as={Row} className="mb-3" controlId="gol_darah">
          <Form.Label column sm="3">
            Golongan Darah
          </Form.Label>
          <Col sm="9">
            <>
              <Form.Check
                type="radio"
                label="A"
                name="gol_darah"
                value="A"
                checked={formData.gol_darah === "A"}
                onChange={handleOnChange}
              />
              <Form.Check
                type="radio"
                label="B"
                name="gol_darah"
                value="B"
                checked={formData.gol_darah === "B"}
                onChange={handleOnChange}
              />
              <Form.Check
                type="radio"
                label="AB"
                name="gol_darah"
                value="AB"
                checked={formData.gol_darah === "AB"}
                onChange={handleOnChange}
              />
              <Form.Check
                type="radio"
                label="O"
                name="gol_darah"
                value="O"
                checked={formData.gol_darah === "O"}
                onChange={handleOnChange}
                className="border-black"
              />
            </>
          </Col>
        </Form.Group>

        {/* Status */}
        <Form.Group as={Row} className="mb-3" controlId="status_perkawinan">
          <Form.Label column sm="3">
            Status
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="status_perkawinan"
              value={formData.status_perkawinan}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Alamat KTP */}
        <Form.Group as={Row} className="mb-3" controlId="alamat_ktp">
          <Form.Label column sm="3">
            Alamat KTP
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={3}
              name="alamat_ktp"
              value={formData.alamat_ktp}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Alamat Tinggal */}
        <Form.Group as={Row} className="mb-3" controlId="alamat_sekarang">
          <Form.Label column sm="3">
            Alamat Tinggal
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={3}
              name="alamat_sekarang"
              value={formData.alamat_sekarang}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Email */}
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* No Telp */}
        <Form.Group as={Row} className="mb-3" controlId="no_telp">
          <Form.Label column sm="3">
            No Telp
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Orang Terdekat yang Dapat Dihubungi */}
        <Form.Group as={Row} className="mb-3" controlId="orang_terdekat">
          <Form.Label column sm="3">
            Orang Terdekat yang Dapat Dihubungi
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="orang_terdekat"
              value={formData.orang_terdekat}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Pendidikan Terakhir */}
        <Form.Group as={Row} className="mb-3" controlId="pendidikanTerakhir">
          <Form.Label column sm="3">
            Pendidikan Terakhir
          </Form.Label>
          <Col sm="9">
            <RiwayatPendidikanComponent id_biodata={biodata?.id} riwayat_pendidikan={formData.riwayat_pendidikan} />
          </Col>
        </Form.Group>

        {/* Riwayat Pelatihan */}
        <Form.Group as={Row} className="mb-3" controlId="riwayat_pelatihan">
          <Form.Label column sm="3">
            Riwayat Pelatihan
          </Form.Label>
          <Col sm="9">
            <RiwayatPelatihanComponent id_biodata={biodata?.id} riwayat_pelatihan={formData.riwayat_pelatihan} />
          </Col>
        </Form.Group>

        {/* Riwayat Pekerjaan */}
        <Form.Group as={Row} className="mb-3" controlId="riwayat_pekerjaan">
          <Form.Label column sm="3">
            Riwayat Pekerjaan
          </Form.Label>
          <Col sm="9">
            <RiwayatPekerjaanComponent id_biodata={biodata?.id} riwayat_pekerjaan={formData.riwayat_pekerjaan} />
          </Col>
        </Form.Group>

        {/* Skill */}
        <Form.Group as={Row} className="mb-3" controlId="skill">
          <Form.Label column sm="3">
            Skill
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={3}
              name="skill"
              value={formData.skill}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Bersedia Ditempatkan di Seluruh Kantor Perusahaan */}
        <Form.Group as={Row} className="mb-3" controlId="ketersediaan_penempatan">
          <Form.Label column sm="3">
            Bersedia Ditempatkan di Seluruh Kantor Perusahaan
          </Form.Label>
          <Col sm="9">
            <>
              <Form.Check
                type="radio"
                label="YA"
                name="ketersediaan_penempatan"
                id="bersedia-ya"
                value="YA"
                checked={formData.ketersediaan_penempatan === "YA"}
                onChange={handleOnChange}
              />
              <Form.Check
                type="radio"
                label="TIDAK"
                name="ketersediaan_penempatan"
                id="bersedia-tidak"
                value="TIDAK"
                checked={formData.ketersediaan_penempatan === "TIDAK"}
                onChange={handleOnChange}
              />
            </>
          </Col>
        </Form.Group>

        {/* Penghasilan yang Diharapkan */}
        <Form.Group as={Row} className="mb-3" controlId="expected_salary">
          <Form.Label column sm="3">
            Penghasilan yang Diharapkan
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              name="expected_salary"
              value={formData.expected_salary}
              onChange={handleOnChange}
              className={`w-50 border border-dark rounded px-2`}
            />
          </Col>
        </Form.Group>

        {/* Tombol Aksi */}
        <Row className="mb-3">
          <Col sm={{ span: 9, offset: 3 }}>
            <Button type="submit" variant="success" className="me-2">
              Simpan
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailPelamar;
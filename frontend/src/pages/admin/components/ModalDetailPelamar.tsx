import { Button, Col, Modal, Row } from "react-bootstrap";
import { DataDiri } from "../../../types/biodata.type";
import moment from "moment";

const ModalDetailPelamar = ({ data, show, setShowModal }: { data: DataDiri | undefined | null, show: boolean, setShowModal: (show: boolean) => void }) => {
  return (
    <Modal 
      show={show} 
      onHide={() => setShowModal(false)}
      size="lg"
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detail Data Pelamar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-4 px-4">
          {/* Posisi yang Dilamar */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Posisi yang Dilamar</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.posisi_lamaran}
              </div>
            </Col>
          </Row>

          {/* Nama */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Nama</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.user?.nama}
              </div>
            </Col>
          </Row>

          {/* No KTP */}
          <Row className="mb-3">
            <Col sm="3">
              <label>No KTP</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.no_ktp}
              </div>
            </Col>
          </Row>

          {/* Tempat, Tanggal Lahir */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Tempat, Tanggal Lahir</label>
            </Col>
            <Col sm="2">
              <div className="border border-dark rounded px-2 py-1">
                {data?.tempat_lahir}
              </div>
            </Col>
            <Col sm="5">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {moment(data?.tanggal_lahir).format("DD/MM/YYYY")}
              </div>
            </Col>
          </Row>

          {/* Jenis Kelamin */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Jenis Kelamin</label>
            </Col>
            <Col sm="9">
              <div>
                <span className={data?.jenis_kelamin === "Laki-laki" ? "fw-bold" : ""}>Laki-laki</span> / 
                <span className={data?.jenis_kelamin === "Perempuan" ? "fw-bold" : ""}> Perempuan</span>
              </div>
            </Col>
          </Row>

          {/* Agama */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Agama</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.agama}
              </div>
            </Col>
          </Row>

          {/* Golongan Darah */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Golongan Darah</label>
            </Col>
            <Col sm="9">
              <div>
                <span className={data?.gol_darah === "A" ? "fw-bold" : ""}>A</span> / 
                <span className={data?.gol_darah === "B" ? "fw-bold" : ""}>B</span> / 
                <span className={data?.gol_darah === "AB" ? "fw-bold" : ""}>AB</span> / 
                <span className={data?.gol_darah === "O" ? "fw-bold" : ""}>O</span>
              </div>
            </Col>
          </Row>

          {/* Status */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Status</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.status_perkawinan}
              </div>
            </Col>
          </Row>

          {/* Alamat KTP */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Alamat KTP</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.alamat_ktp}
              </div>
            </Col>
          </Row>

          {/* Alamat Tinggal */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Alamat Tinggal</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.alamat_sekarang}
              </div>
            </Col>
          </Row>

          {/* Email */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Email</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.user?.email}
              </div>
            </Col>
          </Row>

          {/* No Telp */}
          <Row className="mb-3">
            <Col sm="3">
              <label>No Telp</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.no_telp}
              </div>
            </Col>
          </Row>

          {/* Orang Terdekat yang Dapat Dihubungi */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Orang Terdekat yang Dapat Dihubungi</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.orang_terdekat}
              </div>
            </Col>
          </Row>

          {/* Pendidikan Terakhir */}
          <Row className="mb-4">
            <Row sm="3" className="mb-2">
              <label>Pendidikan Terakhir</label>
            </Row>
            <Row sm="9">
              <div className="w-100">
                <table className="table table-bordered border-black">
                  <thead>
                    <tr>
                      <th>Jenjang Pendidikan</th>
                      <th>Jurusan</th>
                      <th>Tahun Lulus</th>
                      <th>IPK</th>
                      <th>Instansi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.riwayat_pendidikan?.map((pendidikan, index) => (
                      <tr key={index}>
                        <td>{pendidikan.jenjang_pendidikan}</td>
                        <td>{pendidikan.jurusan}</td>
                        <td>{pendidikan.tahun_lulus}</td>
                        <td>{pendidikan.ipk}</td>
                        <td>{pendidikan.instansi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Row>
          </Row>

          {/* Riwayat Pelatihan */}
          <Row className="mb-4">
            <Row sm="3" className="mb-2">
              <label>Riwayat Pelatihan</label>
            </Row>
            <Row sm="9">
              <div className="w-100">
                <table className="table table-bordered border-black">
                  <thead>
                    <tr>
                      <th>Jenis Pelatihan</th>
                      <th>Sertifikat</th>
                      <th>Tahun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.riwayat_pelatihan?.map((pelatihan, index) => (
                      <tr key={index}>
                        <td>{pelatihan.jenis_pelatihan}</td>
                        <td>{pelatihan.sertifikat}</td>
                        <td>{pelatihan.tahun}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Row>
          </Row>

          {/* Riwayat Pekerjaan */}
          <Row className="mb-4">
            <Row sm="3" className="mb-2">
              <label>Riwayat Pekerjaan</label>
            </Row>
            <Row sm="9">
              <div className="w-100">
                <table className="table table-bordered border-black">
                  <thead>
                    <tr>
                      <th>Nama Perusahaan</th>
                      <th>Jabatan</th>
                      <th>Tahun</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.riwayat_pekerjaan?.map((pekerjaan, index) => (
                      <tr key={index}>
                        <td>{pekerjaan.nama_perusahaan}</td>
                        <td>{pekerjaan.jabatan}</td>
                        <td>{pekerjaan.tahun}</td>
                        <td>{pekerjaan.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Row>
          </Row>

          {/* Skill */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Skill</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.skill}
              </div>
            </Col>
          </Row>

          {/* Bersedia Ditempatkan di Seluruh Kantor Perusahaan */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Bersedia Ditempatkan di Seluruh Kantor Perusahaan</label>
            </Col>
            <Col sm="9">
              <div>
                <span className={data?.ketersediaan_penempatan === "YA" ? "fw-bold" : ""}>YA</span> / 
                <span className={data?.ketersediaan_penempatan === "TIDAK" ? "fw-bold" : ""}>TIDAK</span>
              </div>
            </Col>
          </Row>

          {/* Penghasilan yang Diharapkan */}
          <Row className="mb-3">
            <Col sm="3">
              <label>Penghasilan yang Diharapkan</label>
            </Col>
            <Col sm="9">
              <div className="w-50 border border-dark rounded px-2 py-1">
                {data?.expected_salary}
              </div>
            </Col>
          </Row>

          {/* Tombol Aksi */}
          <Row className="mb-3">
            <Col sm={{ span: 9, offset: 3 }}>
              <Button onClick={() => setShowModal(false)} variant="success" className="me-2">
                Tutup
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailPelamar;
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { DataDiri } from "../../types/biodata.type";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const [dataDiri, setDataDiri] = useState<DataDiri | null>(null)

  useEffect(() => {
    getDataDiri()
  }, []);
  
  const getDataDiri = async () => {
    try {
      const response = await fetch(`http://localhost:4000/biodata/user/${user?.id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json()

      if(!data.status) {
        Swal.fire({
          icon: 'info',
          text: 'Biodata anda masih kosong, silahkan isi biodata terlebih dahulu untuk melanjutkan!'            
        }).then(result => {
          if(result.isConfirmed) {
            console.log('dataaa', data.data);
            
            navigate(`/detail/pelamar/${user?.id}`, { state: data.data })
          }
        })
      } else {
        setDataDiri(data.data)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <h2>Data Diri</h2>
      <hr />

      <Button size="sm" onClick={() => navigate(`/detail/pelamar/${user?.id}`, { state: dataDiri })}>Ubah Data</Button>

      <Card className="mt-4">
        <Card.Header as="h5">Detail</Card.Header>
        <Card.Body>
          <div className="d-flex">
            <div className="w-50">
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Nama</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.user?.nama}</p>
              </div>
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Jenis Kelamin</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.jenis_kelamin}</p>
              </div>
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Tampat & Tanggal Lahir</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.tempat_lahir}, {dataDiri?.tanggal_lahir}</p>
              </div>
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Agama</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.agama}</p>
              </div>
            </div>

            <div className="flex-fill">
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Alamat KTP</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.alamat_ktp}</p>
              </div>
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Alamat Sekarang</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.alamat_ktp}</p>
              </div>
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Nomor Telepon</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.no_ktp}</p>
              </div>
              <div className="d-flex flex-fill justify-content-between">
                <p className="w-25">Posisi Yang Dilamar</p>
                <span className="px-2 flex-fill text-end">:</span>
                <p className="w-75">{dataDiri?.posisi_lamaran}</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header as="h5">Riwayat Pendidikan</Card.Header>
        <Card.Body>
          <div className="d-flex">
            <div className="w-50">

              {
                dataDiri?.riwayat_pendidikan &&
                dataDiri?.riwayat_pendidikan?.map((item, index) => (
                  <Card key={index} className="my-2">
                    <Card.Body>
                      <Card.Title>{item.jenjang_pendidikan} {item.jurusan}</Card.Title>
                      <Card.Text>Universitas Pamulang</Card.Text>
                      <Card.Text>Selesai {item.tahun_lulus}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header as="h5">Riwayat Pekerjaan</Card.Header>
        <Card.Body>
          <div className="d-flex">
            <div className="w-50">
              {
                dataDiri?.riwayat_pekerjaan &&
                dataDiri?.riwayat_pekerjaan?.map((item, index) => (
                  <Card key={index} className="my-2">
                    <Card.Body>
                      <Card.Title>{item.jabatan}</Card.Title>
                      <Card.Text>{item.nama_perusahaan}</Card.Text>
                      <Card.Text>Tahun {item.tahun}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header as="h5">Riwayat Pelatihan</Card.Header>
        <Card.Body>
          <div className="d-flex">
            <div className="w-50">
              {
                dataDiri?.riwayat_pelatihan &&
                dataDiri?.riwayat_pelatihan?.map((item, index) => (
                  <Card key={index} className="my-2">
                    <Card.Body>
                      <Card.Title>{item.jenis_pelatihan}</Card.Title>
                      <Card.Text>Tahun {item.tahun}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Home
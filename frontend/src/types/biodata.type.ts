export interface RiwayatPendidikan {
  id: string
  id_biodata: string
  ipk: string
  instansi: string
  jenjang_pendidikan: string
  jurusan: string
  tahun_lulus: string
}

export interface RiwayatPekerjaan {
  id: string
  id_biodata: string
  jabatan: string
  nama_perusahaan: string
  salary: string
  tahun: string
}

export interface RiwayatPelatihan {
  id: string
  id_biodata: string
  jenis_pelatihan: string
  sertifikat: string
  tahun: string
}

export interface DataDiri {
  id: string;
  id_user: string;
  agama: string;
  alamat_ktp: string;
  alamat_sekarang: string;
  expected_salary: number;
  gol_darah: string;
  jenis_kelamin: string;
  ketersediaan_penempatan: string;
  no_ktp: string;
  no_telp: string;
  orang_terdekat: string;
  posisi_lamaran: string;
  riwayat_pekerjaan: RiwayatPekerjaan[] | null
  riwayat_pelatihan: RiwayatPelatihan[] | null
  riwayat_pendidikan: RiwayatPendidikan[] | null
  skill: string;
  status_perkawinan: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  user: {
    nama: string;
    email: string;
  }
}

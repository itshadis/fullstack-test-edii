import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.models";
import RiwayatPendidikan from "./riwayat_pendidikan.model";
import RiwayatPelatihan from "./riwayat_pelatihan.model";
import RiwayatPekerjaan from "./riwayat_pekerjaan.model";

class Biodata extends Model {}

Biodata.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    no_ktp: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    posisi_lamaran: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tempat_lahir: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
      allowNull: true,
    },
    agama: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gol_darah: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    status_perkawinan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    alamat_ktp: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    alamat_sekarang: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    no_telp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    orang_terdekat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skill: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ketersediaan_penempatan: {
      type: DataTypes.ENUM("YA", "TIDAK"),
      allowNull: true,
    },
    expected_salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "biodata",
    timestamps: false,
  }
);

Biodata.belongsTo(User, { foreignKey:"id_user", as: "user" })
Biodata.hasMany(RiwayatPendidikan, { foreignKey: "id_biodata", as: "riwayat_pendidikan" })
Biodata.hasMany(RiwayatPelatihan, { foreignKey: "id_biodata", as: "riwayat_pelatihan" })
Biodata.hasMany(RiwayatPekerjaan, { foreignKey: "id_biodata", as: "riwayat_pekerjaan" })

export default Biodata;

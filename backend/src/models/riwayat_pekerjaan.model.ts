import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class RiwayatPekerjaan extends Model {}

RiwayatPekerjaan.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    id_biodata: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "biodata",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    nama_perusahaan: {
      type: DataTypes.STRING(225),
      allowNull: false,
      unique: true,
    },
    jabatan: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "riwayat_pekerjaan",
    timestamps: false,
  }
);

export default RiwayatPekerjaan ;

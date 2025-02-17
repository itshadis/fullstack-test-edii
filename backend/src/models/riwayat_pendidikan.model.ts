import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class RiwayatPendidikan  extends Model {}

RiwayatPendidikan.init(
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
    jenjang_pendidikan: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    jurusan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tahun_lulus: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ipk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "riwayat_pendidikan",
    timestamps: false,
  }
);

export default RiwayatPendidikan ;

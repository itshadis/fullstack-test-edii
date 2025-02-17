import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class RiwayatPelatihan  extends Model {}

RiwayatPelatihan.init(
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
    jenis_pelatihan: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    sertifikat: {
      type: DataTypes.ENUM("ada", "tidak"),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "riwayat_pelatihan",
    timestamps: false,
  }
);

export default RiwayatPelatihan ;

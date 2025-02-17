import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Biodata from "./biodata.model";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public nama?: string; // Bisa kosong
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: true, // Bisa kosong
    },
    role: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false
  }
);

export default User;

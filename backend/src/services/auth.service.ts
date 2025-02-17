import Biodata from "../models/biodata.model";
import User from "../models/user.models";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    
    return user;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Gagal mengambil data user");
  }
};



type UserInput = {
  id: string
  email: string;
  password: string;
  nama?: string;
  role?: string;
};

export const createUser = async ({ id, email, password, nama, role = "user" }: UserInput) => {
  try {
    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    // Buat user baru
    const newUser = await User.create({
      id,
      email,
      password, // Harus di-hash sebelum disimpan (gunakan bcrypt)
      nama,
      role,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Gagal membuat user");
  }
};

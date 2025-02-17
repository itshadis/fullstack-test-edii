import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import RiwayatPekerjaan from "../models/riwayat_pekerjaan.model";

export const createRiwayatPekerjaan = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const newRiwayatPekerjaan = await RiwayatPekerjaan.create({
      id: uuidv4(), 
      ...payload
    })
    return res.status(201).json({ status: 201, success: true, message: 'Riwayat Pekerjaan berhasil disimpan', data: newRiwayatPekerjaan })
  } catch (error) {
    console.error("Error upserting riwayat Pekerjaan:", error);
    throw new Error("Failed to upsert riwayat Pekerjaan");
  }
}

export const updateRiwayatPekerjaan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    delete payload.id;

    const [affectedRows] = await RiwayatPekerjaan.update(payload, { where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ status: 404, success: false, message: "Riwayat pekerjaan tidak ditemukan" });
    }

    const updatedRiwayatPekerjaan = await RiwayatPekerjaan.findOne({ where: { id } });

    return res.status(200).json({ status: 200, success: true, message: 'Update riwayat pekerjaan berhasil', data: updatedRiwayatPekerjaan });
  } catch (error) {
    console.error("Error updating riwayat pekerjaan:", error);
    return res.status(500).json({ status: 500, success: false, message: "Gagal mengupdate riwayat pekerjaan" });
  }
};

export const deleteRiwayatPekerjaan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ID riwayat Pekerjaan tidak valid",
      });
    }

    // Cari dan hapus riwayat Pekerjaan
    const deleted = await RiwayatPekerjaan.destroy({ where: { id } });

    // Jika tidak ada data yang dihapus
    if (deleted === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Riwayat Pekerjaan tidak ditemukan",
      });
    }

    // Jika berhasil dihapus
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Riwayat Pekerjaan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error menghapus riwayat Pekerjaan:", error);

    // Tangani error dan kirim respons
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan saat menghapus riwayat Pekerjaan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

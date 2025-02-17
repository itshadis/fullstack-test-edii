import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import RiwayatPelatihan from "../models/riwayat_pelatihan.model";

export const createRiwayatPelatihan = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const newRiwayatPelatihan = await RiwayatPelatihan.create({
      id: uuidv4(), 
      ...payload
    })
    return res.status(201).json({ status: 201, success: true, message: 'Riwayat Pelatihan berhasil disimpan', data: newRiwayatPelatihan })
  } catch (error) {
    console.error("Error upserting riwayat Pelatihan:", error);
    throw new Error("Failed to upsert riwayat Pelatihan");
  }
}

export const updateRiwayatPelatihan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    delete payload.id;

    const [affectedRows] = await RiwayatPelatihan.update(payload, { where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ status: 404, success: false, message: "Riwayat pelatihan tidak ditemukan" });
    }

    const updatedRiwayatPelatihan = await RiwayatPelatihan.findOne({ where: { id } });

    return res.status(200).json({ status: 200, success: true, message: 'Update riwayat pelatihan berhasil', data: updatedRiwayatPelatihan });
  } catch (error) {
    console.error("Error updating riwayat pelatihan:", error);
    return res.status(500).json({ status: 500, success: false, message: "Gagal mengupdate riwayat pelatihan" });
  }
};

export const deleteRiwayatPelatihan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ID riwayat Pelatihan tidak valid",
      });
    }

    // Cari dan hapus riwayat Pelatihan
    const deleted = await RiwayatPelatihan.destroy({ where: { id } });

    // Jika tidak ada data yang dihapus
    if (deleted === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Riwayat Pelatihan tidak ditemukan",
      });
    }

    // Jika berhasil dihapus
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Riwayat Pelatihan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error menghapus riwayat Pelatihan:", error);

    // Tangani error dan kirim respons
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan saat menghapus riwayat Pelatihan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

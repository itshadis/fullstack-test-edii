import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import RiwayatPendidikan from "../models/riwayat_pendidikan.model";

export const createRiwayatPendidikan = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const newRiwayatPendidikan = await RiwayatPendidikan.create({
      id: uuidv4(), 
      ...payload
    })
    return res.status(201).json({ status: 201, success: true, message: 'Riwayat Pendidikan berhasil disimpan', data: newRiwayatPendidikan })
  } catch (error) {
    console.error("Error upserting riwayat pendidikan:", error);
    throw new Error("Failed to upsert riwayat pendidikan");
  }
}

export const updateRiwayatPendidikan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const payload = req.body
    delete payload.id

    await RiwayatPendidikan.update(payload, { where: { id } })
    const updatedRiwayatPendidikan = await RiwayatPendidikan.findOne({ where: { id } })
    return res.status(200).json({ status: 200, success: true, message: 'Update riwayat pendidikan berhasil', data: updatedRiwayatPendidikan })
  } catch (error) {
    console.error("Error updating riwayat pendidikan:", error);
    throw new Error("Failed to update riwayat pendidikan");
  }
}

export const deleteRiwayatPendidikan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ID riwayat pendidikan tidak valid",
      });
    }

    // Cari dan hapus riwayat pendidikan
    const deleted = await RiwayatPendidikan.destroy({ where: { id } });

    // Jika tidak ada data yang dihapus
    if (deleted === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Riwayat pendidikan tidak ditemukan",
      });
    }

    // Jika berhasil dihapus
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Riwayat pendidikan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error menghapus riwayat pendidikan:", error);

    // Tangani error dan kirim respons
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan saat menghapus riwayat pendidikan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

import { Request, Response } from "express";
import { createNewBiodata, getAllBiodata, getOneBiodata } from "../services/biodata.service";
import { v4 as uuidv4 } from 'uuid'
import Biodata from "../models/biodata.model";
import User from "../models/user.models";
import { formatDate } from "../utils/formateDate";

export const getBiodataList = async (req: Request, res: Response) => {
  try {
    const filters = req.query;

    const biodata = await getAllBiodata(filters);
    res.status(200).json(biodata);
  } catch (error) {
    console.log('Err', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
};

export const getBiodataByIdUser = async (req: Request, res: Response) => {
  try {
    const { id_user } = req.params;
    
    // Cari biodata berdasarkan ID
    const biodata = await getOneBiodata(id_user);
    
    if (!biodata) {
      const id = uuidv4()
      const data = await createNewBiodata(id, id_user)
      const biodata = await getOneBiodata(id_user)
      
      return res.status(200).json({ status: false, message: 'Pelamar baru, belum ada biodata', data: biodata });
    } else {
      res.status(200).json({ status: true, message: 'success', data: biodata });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch biodata" });
  }
};

export const upsertBiodata = async (req: Request, res: Response) => {
  try {
    const { id_user } = req.params
    const { nama, email, ...payload } = req.body;

    const formateTanggal = formatDate(payload.tanggal_lahir)
    payload.tanggal_lahir = formateTanggal
    console.log('payloadddd', payload);

    // Update Nama & Email di Tabel Users
    await User.update(
      { nama, email },
      { where: { id: id_user } }
    );

    delete payload.riwayat_pendidikan
    delete payload.riwayat_pelatihan
    delete payload.riwayat_pekerjaan
    
    const existingBiodata = await Biodata.findOne({ where: { id_user }});

    if (existingBiodata) {
      await Biodata.update(payload, { where: { id_user } });
      res.status(200).json({ status: 200, success: true, message: 'Biodata berhasil diupdate' })
    } else {
      const newBiodata = await Biodata.create({
        id: uuidv4(),
        id_user,
        ...payload,
      });
      return res.status(201).json({ status: 201, success: true, message: 'Biodata berhasil disimpan', data: newBiodata })
    }
  } catch (error) {
    console.error("Error upserting biodata:", error);
    throw new Error("Failed to upsert biodata");
  }
};


export const deleteBiodata = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ID User tidak valid",
      });
    }

    // Cari dan hapus riwayat Pelatihan
    const deleted = await Biodata.destroy({ where: { id } });

    // Jika tidak ada data yang dihapus
    if (deleted === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Biodata tidak ditemukan",
      });
    }

    // Jika berhasil dihapus
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Biodata berhasil dihapus",
    });
  } catch (error) {
    console.error("Error menghapus Biodata:", error);

    // Tangani error dan kirim respons
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan saat menghapus Biodata",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

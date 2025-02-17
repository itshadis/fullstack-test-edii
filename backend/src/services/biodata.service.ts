import User from "../models/user.models";
import Biodata from "../models/biodata.model";
import RiwayatPendidikan from "../models/riwayat_pendidikan.model";
import RiwayatPelatihan from "../models/riwayat_pelatihan.model";
import RiwayatPekerjaan from "../models/riwayat_pekerjaan.model";
import { Op } from "sequelize";

export const getAllBiodata = async (filter: any) => {
  try {
    const { nama, posisi, pendidikan } = filter
    const biodata = await Biodata.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nama"],
          where: nama ? { nama: { [Op.like]: `%${nama}%` } } : {},
        },
        {
          model: RiwayatPendidikan,
          as: "riwayat_pendidikan",
          where: pendidikan
            ? { jenjang_pendidikan: { [Op.like]: `%${pendidikan}%` } }
            : {},
        },
        {
          model: RiwayatPelatihan,
          as: "riwayat_pelatihan",
        },
        {
          model: RiwayatPekerjaan,
          as: "riwayat_pekerjaan",
        },
      ],
      where: posisi ? { posisi_lamaran: { [Op.like]: `%${posisi}%` } } : {},
    });

    return biodata
    
    return biodata;
  } catch (error) {
    console.error("Error fetching biodata:", error);
    throw new Error("Failed to fetch biodata");
  }
};

export const getOneBiodata = async (id_user: string) => {
  try {
    const biodata = await Biodata.findOne({ 
      where: { id_user }, 
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['nama', 'email']
        },
        {
          model: RiwayatPendidikan,
          as: 'riwayat_pendidikan',
        }, 
        {
          model: RiwayatPelatihan,
          as: 'riwayat_pelatihan',
        }, 
        {
          model: RiwayatPekerjaan,
          as: 'riwayat_pekerjaan',
        }, 
      ]
    })
    
    return biodata;
  } catch (error) {
    console.error("Error fetching biodata:", error);
    throw new Error("Failed to fetch biodata");
  }
}

export const createNewBiodata = async (id: string, id_user: string) => {
  try {
    const biodata = await Biodata.create({ id, id_user })

    return biodata
  } catch (error) {
    console.error("Error fetching biodata:", error);
    throw new Error("Failed to fetch biodata");
  }
}
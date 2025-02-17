import { Router } from 'express'
import { createRiwayatPelatihan, updateRiwayatPelatihan, deleteRiwayatPelatihan } from '../controllers/riwayat_pelatihan.controller'

const PelatihanRoute: Router = Router()

PelatihanRoute.post('/create', createRiwayatPelatihan)
PelatihanRoute.put('/update/:id', updateRiwayatPelatihan)
PelatihanRoute.delete('/delete/:id', deleteRiwayatPelatihan)

export default PelatihanRoute
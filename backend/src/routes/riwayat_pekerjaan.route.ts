import { Router } from 'express'
import { createRiwayatPekerjaan, updateRiwayatPekerjaan, deleteRiwayatPekerjaan } from '../controllers/riwayat_pekerjaan.controller'

const PekerjaanRoute: Router = Router()

PekerjaanRoute.post('/create', createRiwayatPekerjaan)
PekerjaanRoute.put('/update/:id', updateRiwayatPekerjaan)
PekerjaanRoute.delete('/delete/:id', deleteRiwayatPekerjaan)

export default PekerjaanRoute
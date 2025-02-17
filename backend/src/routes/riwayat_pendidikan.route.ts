import { Router } from 'express'
import { createRiwayatPendidikan, updateRiwayatPendidikan, deleteRiwayatPendidikan } from '../controllers/riwayat_pendidikan.controller'

const PendidikanRoute: Router = Router()

PendidikanRoute.post('/create', createRiwayatPendidikan)
PendidikanRoute.put('/update/:id', updateRiwayatPendidikan)
PendidikanRoute.delete('/delete/:id', deleteRiwayatPendidikan)

export default PendidikanRoute
import { Router } from 'express'
import { getBiodataByIdUser, getBiodataList, upsertBiodata, deleteBiodata  } from '../controllers/biodata.controller'
import { isAdmin } from '../middlewares/auth.midleware'

const BiodataRouter: Router = Router()

BiodataRouter.get('/all', isAdmin, getBiodataList)
BiodataRouter.get('/user/:id_user', getBiodataByIdUser)
BiodataRouter.post('/upsert/:id_user', upsertBiodata)
BiodataRouter.delete('/delete/:id', isAdmin, deleteBiodata)

export default BiodataRouter
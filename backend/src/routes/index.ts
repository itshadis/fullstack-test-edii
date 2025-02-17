import { Application, Router } from 'express'
import BiodataRouter from './biodata.route'
import AuthRouter from './auth.route'
import PendidikanRoute from './riwayat_pendidikan.route'
import PekerjaanRoute from './riwayat_pekerjaan.route'
import PelatihanRoute from './riwayat_pelatihan.route'

const _routes: Array<[string, Router]> = [
  ['/auth', AuthRouter],
  ['/biodata', BiodataRouter],
  ['/riwayat-pendidikan', PendidikanRoute],
  ['/riwayat-pekerjaan', PekerjaanRoute],
  ['/riwayat-pelatihan', PelatihanRoute],
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

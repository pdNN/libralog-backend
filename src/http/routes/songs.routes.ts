import { Router } from 'express'
import { registerSong } from '../controllers/register-song'
import { listSongs } from '../controllers/list-songs'
import { updateSong } from '../controllers/update-song'
import { deleteSong } from '../controllers/delete-song'

export const songsRoutes = Router()

songsRoutes.get('/', (req, res, next) => {
	listSongs(req, res).catch((error) => {
		next(error)
	})
})
songsRoutes.post('/', (req, res, next) => {
	registerSong(req, res).catch((error) => {
		next(error)
	})
})
songsRoutes.put('/:id', (req, res, next) => {
	updateSong(req, res).catch((error) => {
		next(error)
	})
})
songsRoutes.delete('/:id', (req, res, next) => {
	deleteSong(req, res).catch((error) => {
		next(error)
	})
})

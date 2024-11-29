import { Router } from "express"
import { createTask, updateTask, deleteTask, getAllTasks, getAllTasksBystatus } from "./task.controller.js"

const router = Router()

router.get('/health', ((_req, res) => {
  res.status(200).send('OK')
}))

router.post('/', createTask)
router.get('/', getAllTasks)
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)
router.get('/status/:status', getAllTasksBystatus)

export default router

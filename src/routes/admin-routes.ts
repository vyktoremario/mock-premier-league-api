import { Router } from 'express';
import {
    getATeamController,
    getAllTeamController,
    addTeamController,
    updateTeamController,
    removeTeamController,
    addFixtureController,
    getAllFixtureController,
    getAllPendingFixtureController,
    getAllCompletedFixtureController,
    getAllCancelledFixtureController,
    getAFixtureController,
    updateFixtureController,
    removeFixtureController,
    loginUserController,
    registerUserController,
} from '../controllers';
import verifyAdminToken from '../middlewares/admin-middleware';

const router = Router();

router.get('/teams', verifyAdminToken, getAllTeamController);
router.get('/teams/:id', getATeamController);
router.post('/teams', addTeamController);
router.put('/teams/:id', updateTeamController);
router.delete('/teams/:id', removeTeamController);

router.get('/fixtures', getAllFixtureController);
router.get('/fixtures/:id', getAFixtureController);
router.post('/fixtures', addFixtureController);
router.put('/fixtures/:id', updateFixtureController);
router.delete('/fixtures/:id', removeFixtureController);
router.get('/fixtures/pending', getAllPendingFixtureController);
router.get('/fixtures/completed', getAllCompletedFixtureController);
router.get('/fixtures/cancelled', getAllCancelledFixtureController);

router.post('/auth/login', loginUserController);
router.post('/auth/register', registerUserController);

export default router;
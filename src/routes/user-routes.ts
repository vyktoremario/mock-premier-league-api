import { Router } from 'express';
import {
    getATeamController,
    getAllTeamController,
    getAllPendingFixtureController,
    getAllCompletedFixtureController,
    loginUserController,
    registerUserController,
} from '../controllers';

const router = Router();

router.get('/teams', getAllTeamController);
router.get('/teams/:id', getATeamController);

router.get('/fixtures/pending', getAllPendingFixtureController);
router.get('/fixtures/completed', getAllCompletedFixtureController);

router.post('/auth/login', loginUserController);
router.post('/auth/register', registerUserController);

export default router;
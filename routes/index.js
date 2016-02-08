
import {Router} from 'express';
const router = Router();

import splash from './splash'
import create from './create'
import repo from './repo'
import img from './img'

router.get('/', splash);
router.get('/create', create);
router.get('/repo/:user/:repo', repo);
router.get('/img/:customText', img);

export default router;

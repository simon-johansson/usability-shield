
import {Router} from 'express';
const router = Router();

// router.get('/', function(req, res, next) {
//   res.redirect('https://img.shields.io/badge/usability_measures-taken-FF41A2.svg');
// });

router.get('/:custom', (req, res, next) => {
  const {custom} = req.params;
  res.redirect(`https://img.shields.io/badge/${custom}-FF41A2.svg`);
});

export default router;

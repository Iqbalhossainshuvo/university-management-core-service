import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterZValidation } from './academicSemester.ZodValidation';
import { academicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterZValidation.academicSemesterZodValidator),
  academicSemesterControllers.createSemester
);
router.get('/',academicSemesterControllers.getAllData);
router.get('/:id',academicSemesterControllers.findDataById);
router.patch('/:id',academicSemesterControllers.updateSemester);
router.delete('/:id',academicSemesterControllers.deleteSemester)

export const AcademicSemester = router;

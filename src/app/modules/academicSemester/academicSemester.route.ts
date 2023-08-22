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

export const AcademicSemester = router;

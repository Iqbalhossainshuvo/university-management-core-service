import express from 'express';
import { AcademicSemester } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    routes: AcademicSemester
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

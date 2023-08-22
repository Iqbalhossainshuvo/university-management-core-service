import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const resutl = await academicSemesterService.createSemester(req.body);
  res.send({
    success: true,
    message: 'semester created successfully',
    data: resutl,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.getAllData();

  sendResponse(res, {
  statusCode:httpStatus.OK,
  success:true,
  message:"Academic Semester all data successfully retrieved",
  meta:result.data,
  data:result.data
  });
});

export const academicSemesterControllers = {
  createSemester,
  getAllData,
};

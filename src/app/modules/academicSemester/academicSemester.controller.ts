/* eslint-disable no-undef */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterAbleFileds } from './academicSemester.constant';
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
  const filter = pick(req.query,AcademicSemesterFilterAbleFileds);
  // const filter = pick(req.query,['searchTerm', 'code', 'startMonth', 'endMonth']);
  const options = pick(req.query,['limit','page','sortBy','sortOrder']);
  const result = await academicSemesterService.getAllData(filter,options);

  sendResponse(res, {
  statusCode:httpStatus.OK,
  success:true,
  message:"Academic Semester all data successfully retrieved",
  meta:result.meta,
  data:result.data
  });
});




const findDataById = catchAsync(async (req: Request, res: Response) => {

  const result = await academicSemesterService.findDataById(req.params.id);
  res.send({
    success: true,
    message: 'get Single data successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const data = req.body;
  const result = await academicSemesterService.updateSemester(id, data);
  res.send({
    success: true,
    message: 'Update data successfully',
    data: result,
  });
});


const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await academicSemesterService.deleteSemester(id);
  res.send({
    success: true,
    message: 'Delete data successfully',
    data: result,
  });
});



export const academicSemesterControllers = {
  createSemester,
  getAllData,
  findDataById,
  updateSemester,
  deleteSemester
};

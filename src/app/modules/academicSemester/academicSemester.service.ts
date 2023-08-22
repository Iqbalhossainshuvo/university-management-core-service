import { AcademicSemester, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";


const prisma = new PrismaClient();

const createSemester =async (data:AcademicSemester):Promise<AcademicSemester>=>{
    const result = await prisma.academicSemester.create({
        data: data
    })
    return result
}

const getAllData = async():Promise<IGenericResponse<AcademicSemester[]>>=>{
    const result = await prisma.academicSemester.findMany();

    const total = await prisma.academicSemester.count();


    return {
        meta:{
            total,
            page:1,
            limit:10
        },
        data:result
    }
}







export const academicSemesterService = {
    createSemester,
    getAllData

}


import { AcademicSemester, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { AcademicSemesterSearchAbleFields } from "./academicSemester.constant";
import { IAcademicFilterRequest } from "./academicSemester.interface";


const prisma = new PrismaClient();

const createSemester =async (data:AcademicSemester):Promise<AcademicSemester>=>{
    const result = await prisma.academicSemester.create({
        data: data
    })
    return result
}

const getAllData = async(
    filter:IAcademicFilterRequest,
    options:IPaginationOptions
):Promise<IGenericResponse<AcademicSemester[]>>=>{
    const {page,limit,skip} = paginationHelpers.calculatePagination(options);
    console.log(filter);
    const {searchTerm,...filterData} = filter;

    const andConditons = [];

    if (searchTerm) {
        andConditons.push({
            OR: AcademicSemesterSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    /**
     * person = { name: 'fahim' }
     * name = person[name]
     * 
     */

    const whereConditons: Prisma.AcademicSemesterWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};
    // const andCondition =[];
    // if(searchTerm){
    //     andCondition.push({
    //         OR:['title','code','startMonth','endMonth'].map((filld)=>({
    //             [filld]:{
    //                 contains:searchTerm,
    //                 mode:'insensitive'
    //             }
    //         }))
    //     })
    // };
    // if (Object.keys(filterData).length > 0) {
    //     const filterConditions = Object.keys(filterData).map((key) => ({
    //         [key]: {
    //             equals: (filterData as any)[key]
    //         }
    //     }));
    //     andCondition.push({
    //         AND: filterConditions
    //     });
    // }

    // const whereCondition:Prisma.AcademicSemesterWhereInput = andCondition.length >0 ? {AND:andCondition}:{};

    const result = await prisma.academicSemester.findMany({
        where:whereConditons,
        skip,
        take: limit
    });

    const total = await prisma.academicSemester.count();


    return {
        meta:{
            total,
            page,
            limit
        },
        data:result
    }
}


const findDataById=async(id:string):Promise<AcademicSemester | null>=>{
    const result = await prisma.academicSemester.findUnique({
        where:{
            id
        }
    })
    return result
}


const updateSemester = async(id:string,data:Partial<AcademicSemester>)=>{
    const result = await prisma.academicSemester.update({
        where:{
            id
        },
        data:data
    });
    return result
}

const deleteSemester = async(id:string)=>{
    const result = await prisma.academicSemester.delete({
        where:{
            id
        }
    });
    return result
}

export const academicSemesterService = {
    createSemester,
    getAllData,
    findDataById,
    updateSemester,
    deleteSemester

}



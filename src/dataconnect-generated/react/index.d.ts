import { CreateStudentDataData, UpdateStudentDataData, UpdateStudentDataVariables, DeleteStudentDataData, DeleteStudentDataVariables, GetStudentData, GetStudentVariables, ListStudentsData, CreateTeacherDataData, UpdateTeacherDataData, UpdateTeacherDataVariables, DeleteTeacherDataData, DeleteTeacherDataVariables, GetTeacherData, GetTeacherVariables, ListTeachersData, CreateCourseDataData, CreateCourseDataVariables, UpdateCourseDataData, UpdateCourseDataVariables, DeleteCourseDataData, DeleteCourseDataVariables, GetCourseData, GetCourseVariables, ListCoursesData, EnrollStudentData, EnrollStudentVariables, UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables, DropCourseData, DropCourseVariables, GetEnrollmentData, GetEnrollmentVariables, ListEnrollmentsData, RecordAttendanceData, RecordAttendanceVariables, UpdateAttendanceData, UpdateAttendanceVariables, DeleteAttendanceRecordData, DeleteAttendanceRecordVariables, GetAttendanceData, GetAttendanceVariables, ListAttendanceData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateStudentData(options?: useDataConnectMutationOptions<CreateStudentDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateStudentDataData, undefined>;
export function useCreateStudentData(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStudentDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateStudentDataData, undefined>;

export function useUpdateStudentData(options?: useDataConnectMutationOptions<UpdateStudentDataData, FirebaseError, UpdateStudentDataVariables>): UseDataConnectMutationResult<UpdateStudentDataData, UpdateStudentDataVariables>;
export function useUpdateStudentData(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStudentDataData, FirebaseError, UpdateStudentDataVariables>): UseDataConnectMutationResult<UpdateStudentDataData, UpdateStudentDataVariables>;

export function useDeleteStudentData(options?: useDataConnectMutationOptions<DeleteStudentDataData, FirebaseError, DeleteStudentDataVariables>): UseDataConnectMutationResult<DeleteStudentDataData, DeleteStudentDataVariables>;
export function useDeleteStudentData(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteStudentDataData, FirebaseError, DeleteStudentDataVariables>): UseDataConnectMutationResult<DeleteStudentDataData, DeleteStudentDataVariables>;

export function useGetStudent(vars: GetStudentVariables, options?: useDataConnectQueryOptions<GetStudentData>): UseDataConnectQueryResult<GetStudentData, GetStudentVariables>;
export function useGetStudent(dc: DataConnect, vars: GetStudentVariables, options?: useDataConnectQueryOptions<GetStudentData>): UseDataConnectQueryResult<GetStudentData, GetStudentVariables>;

export function useListStudents(options?: useDataConnectQueryOptions<ListStudentsData>): UseDataConnectQueryResult<ListStudentsData, undefined>;
export function useListStudents(dc: DataConnect, options?: useDataConnectQueryOptions<ListStudentsData>): UseDataConnectQueryResult<ListStudentsData, undefined>;

export function useCreateTeacherData(options?: useDataConnectMutationOptions<CreateTeacherDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateTeacherDataData, undefined>;
export function useCreateTeacherData(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTeacherDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateTeacherDataData, undefined>;

export function useUpdateTeacherData(options?: useDataConnectMutationOptions<UpdateTeacherDataData, FirebaseError, UpdateTeacherDataVariables>): UseDataConnectMutationResult<UpdateTeacherDataData, UpdateTeacherDataVariables>;
export function useUpdateTeacherData(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeacherDataData, FirebaseError, UpdateTeacherDataVariables>): UseDataConnectMutationResult<UpdateTeacherDataData, UpdateTeacherDataVariables>;

export function useDeleteTeacherData(options?: useDataConnectMutationOptions<DeleteTeacherDataData, FirebaseError, DeleteTeacherDataVariables>): UseDataConnectMutationResult<DeleteTeacherDataData, DeleteTeacherDataVariables>;
export function useDeleteTeacherData(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTeacherDataData, FirebaseError, DeleteTeacherDataVariables>): UseDataConnectMutationResult<DeleteTeacherDataData, DeleteTeacherDataVariables>;

export function useGetTeacher(vars: GetTeacherVariables, options?: useDataConnectQueryOptions<GetTeacherData>): UseDataConnectQueryResult<GetTeacherData, GetTeacherVariables>;
export function useGetTeacher(dc: DataConnect, vars: GetTeacherVariables, options?: useDataConnectQueryOptions<GetTeacherData>): UseDataConnectQueryResult<GetTeacherData, GetTeacherVariables>;

export function useListTeachers(options?: useDataConnectQueryOptions<ListTeachersData>): UseDataConnectQueryResult<ListTeachersData, undefined>;
export function useListTeachers(dc: DataConnect, options?: useDataConnectQueryOptions<ListTeachersData>): UseDataConnectQueryResult<ListTeachersData, undefined>;

export function useCreateCourseData(options?: useDataConnectMutationOptions<CreateCourseDataData, FirebaseError, CreateCourseDataVariables>): UseDataConnectMutationResult<CreateCourseDataData, CreateCourseDataVariables>;
export function useCreateCourseData(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCourseDataData, FirebaseError, CreateCourseDataVariables>): UseDataConnectMutationResult<CreateCourseDataData, CreateCourseDataVariables>;

export function useUpdateCourseData(options?: useDataConnectMutationOptions<UpdateCourseDataData, FirebaseError, UpdateCourseDataVariables>): UseDataConnectMutationResult<UpdateCourseDataData, UpdateCourseDataVariables>;
export function useUpdateCourseData(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCourseDataData, FirebaseError, UpdateCourseDataVariables>): UseDataConnectMutationResult<UpdateCourseDataData, UpdateCourseDataVariables>;

export function useDeleteCourseData(options?: useDataConnectMutationOptions<DeleteCourseDataData, FirebaseError, DeleteCourseDataVariables>): UseDataConnectMutationResult<DeleteCourseDataData, DeleteCourseDataVariables>;
export function useDeleteCourseData(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCourseDataData, FirebaseError, DeleteCourseDataVariables>): UseDataConnectMutationResult<DeleteCourseDataData, DeleteCourseDataVariables>;

export function useGetCourse(vars: GetCourseVariables, options?: useDataConnectQueryOptions<GetCourseData>): UseDataConnectQueryResult<GetCourseData, GetCourseVariables>;
export function useGetCourse(dc: DataConnect, vars: GetCourseVariables, options?: useDataConnectQueryOptions<GetCourseData>): UseDataConnectQueryResult<GetCourseData, GetCourseVariables>;

export function useListCourses(options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, undefined>;
export function useListCourses(dc: DataConnect, options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, undefined>;

export function useEnrollStudent(options?: useDataConnectMutationOptions<EnrollStudentData, FirebaseError, EnrollStudentVariables>): UseDataConnectMutationResult<EnrollStudentData, EnrollStudentVariables>;
export function useEnrollStudent(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollStudentData, FirebaseError, EnrollStudentVariables>): UseDataConnectMutationResult<EnrollStudentData, EnrollStudentVariables>;

export function useUpdateEnrollmentGrade(options?: useDataConnectMutationOptions<UpdateEnrollmentGradeData, FirebaseError, UpdateEnrollmentGradeVariables>): UseDataConnectMutationResult<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;
export function useUpdateEnrollmentGrade(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEnrollmentGradeData, FirebaseError, UpdateEnrollmentGradeVariables>): UseDataConnectMutationResult<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;

export function useDropCourse(options?: useDataConnectMutationOptions<DropCourseData, FirebaseError, DropCourseVariables>): UseDataConnectMutationResult<DropCourseData, DropCourseVariables>;
export function useDropCourse(dc: DataConnect, options?: useDataConnectMutationOptions<DropCourseData, FirebaseError, DropCourseVariables>): UseDataConnectMutationResult<DropCourseData, DropCourseVariables>;

export function useGetEnrollment(vars: GetEnrollmentVariables, options?: useDataConnectQueryOptions<GetEnrollmentData>): UseDataConnectQueryResult<GetEnrollmentData, GetEnrollmentVariables>;
export function useGetEnrollment(dc: DataConnect, vars: GetEnrollmentVariables, options?: useDataConnectQueryOptions<GetEnrollmentData>): UseDataConnectQueryResult<GetEnrollmentData, GetEnrollmentVariables>;

export function useListEnrollments(options?: useDataConnectQueryOptions<ListEnrollmentsData>): UseDataConnectQueryResult<ListEnrollmentsData, undefined>;
export function useListEnrollments(dc: DataConnect, options?: useDataConnectQueryOptions<ListEnrollmentsData>): UseDataConnectQueryResult<ListEnrollmentsData, undefined>;

export function useRecordAttendance(options?: useDataConnectMutationOptions<RecordAttendanceData, FirebaseError, RecordAttendanceVariables>): UseDataConnectMutationResult<RecordAttendanceData, RecordAttendanceVariables>;
export function useRecordAttendance(dc: DataConnect, options?: useDataConnectMutationOptions<RecordAttendanceData, FirebaseError, RecordAttendanceVariables>): UseDataConnectMutationResult<RecordAttendanceData, RecordAttendanceVariables>;

export function useUpdateAttendance(options?: useDataConnectMutationOptions<UpdateAttendanceData, FirebaseError, UpdateAttendanceVariables>): UseDataConnectMutationResult<UpdateAttendanceData, UpdateAttendanceVariables>;
export function useUpdateAttendance(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAttendanceData, FirebaseError, UpdateAttendanceVariables>): UseDataConnectMutationResult<UpdateAttendanceData, UpdateAttendanceVariables>;

export function useDeleteAttendanceRecord(options?: useDataConnectMutationOptions<DeleteAttendanceRecordData, FirebaseError, DeleteAttendanceRecordVariables>): UseDataConnectMutationResult<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;
export function useDeleteAttendanceRecord(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAttendanceRecordData, FirebaseError, DeleteAttendanceRecordVariables>): UseDataConnectMutationResult<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;

export function useGetAttendance(vars: GetAttendanceVariables, options?: useDataConnectQueryOptions<GetAttendanceData>): UseDataConnectQueryResult<GetAttendanceData, GetAttendanceVariables>;
export function useGetAttendance(dc: DataConnect, vars: GetAttendanceVariables, options?: useDataConnectQueryOptions<GetAttendanceData>): UseDataConnectQueryResult<GetAttendanceData, GetAttendanceVariables>;

export function useListAttendance(options?: useDataConnectQueryOptions<ListAttendanceData>): UseDataConnectQueryResult<ListAttendanceData, undefined>;
export function useListAttendance(dc: DataConnect, options?: useDataConnectQueryOptions<ListAttendanceData>): UseDataConnectQueryResult<ListAttendanceData, undefined>;

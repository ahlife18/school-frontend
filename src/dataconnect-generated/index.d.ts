import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Attendance_Key {
  id: UUIDString;
  __typename?: 'Attendance_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface CreateCourseDataData {
  course_insert: Course_Key;
}

export interface CreateCourseDataVariables {
  teacherId: UUIDString;
}

export interface CreateStudentDataData {
  student_insert: Student_Key;
}

export interface CreateTeacherDataData {
  teacher_insert: Teacher_Key;
}

export interface DeleteAttendanceRecordData {
  attendance_delete?: Attendance_Key | null;
}

export interface DeleteAttendanceRecordVariables {
  id: UUIDString;
}

export interface DeleteCourseDataData {
  course_delete?: Course_Key | null;
}

export interface DeleteCourseDataVariables {
  id: UUIDString;
}

export interface DeleteStudentDataData {
  student_delete?: Student_Key | null;
}

export interface DeleteStudentDataVariables {
  id: UUIDString;
}

export interface DeleteTeacherDataData {
  teacher_delete?: Teacher_Key | null;
}

export interface DeleteTeacherDataVariables {
  id: UUIDString;
}

export interface DropCourseData {
  enrollment_delete?: Enrollment_Key | null;
}

export interface DropCourseVariables {
  id: UUIDString;
}

export interface EnrollStudentData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollStudentVariables {
  studentId: UUIDString;
  courseId: UUIDString;
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface GetAttendanceData {
  attendance?: {
    date: DateString;
    status: string;
  };
}

export interface GetAttendanceVariables {
  id: UUIDString;
}

export interface GetCourseData {
  course?: {
    title: string;
    teacher: {
      name: string;
    };
  };
}

export interface GetCourseVariables {
  id: UUIDString;
}

export interface GetEnrollmentData {
  enrollment?: {
    grade?: number | null;
    status?: string | null;
    course: {
      title: string;
    };
  };
}

export interface GetEnrollmentVariables {
  id: UUIDString;
}

export interface GetStudentData {
  student?: {
    name: string;
    email: string;
    gradeLevel: number;
  };
}

export interface GetStudentVariables {
  id: UUIDString;
}

export interface GetTeacherData {
  teacher?: {
    name: string;
    department: string;
  };
}

export interface GetTeacherVariables {
  id: UUIDString;
}

export interface ListAttendanceData {
  attendances: ({
    date: DateString;
    status: string;
  })[];
}

export interface ListCoursesData {
  courses: ({
    title: string;
    description: string;
  })[];
}

export interface ListEnrollmentsData {
  enrollments: ({
    grade?: number | null;
    status?: string | null;
  })[];
}

export interface ListStudentsData {
  students: ({
    name: string;
    email: string;
  })[];
}

export interface ListTeachersData {
  teachers: ({
    name: string;
    department: string;
  })[];
}

export interface RecordAttendanceData {
  attendance_insert: Attendance_Key;
}

export interface RecordAttendanceVariables {
  studentId: UUIDString;
  courseId: UUIDString;
  date: DateString;
}

export interface Student_Key {
  id: UUIDString;
  __typename?: 'Student_Key';
}

export interface Teacher_Key {
  id: UUIDString;
  __typename?: 'Teacher_Key';
}

export interface UpdateAttendanceData {
  attendance_update?: Attendance_Key | null;
}

export interface UpdateAttendanceVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateCourseDataData {
  course_update?: Course_Key | null;
}

export interface UpdateCourseDataVariables {
  id: UUIDString;
  desc: string;
}

export interface UpdateEnrollmentGradeData {
  enrollment_update?: Enrollment_Key | null;
}

export interface UpdateEnrollmentGradeVariables {
  id: UUIDString;
  grade: number;
}

export interface UpdateStudentDataData {
  student_update?: Student_Key | null;
}

export interface UpdateStudentDataVariables {
  id: UUIDString;
  grade: number;
}

export interface UpdateTeacherDataData {
  teacher_update?: Teacher_Key | null;
}

export interface UpdateTeacherDataVariables {
  id: UUIDString;
  dept: string;
}

interface CreateStudentDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateStudentDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateStudentDataData, undefined>;
  operationName: string;
}
export const createStudentDataRef: CreateStudentDataRef;

export function createStudentData(): MutationPromise<CreateStudentDataData, undefined>;
export function createStudentData(dc: DataConnect): MutationPromise<CreateStudentDataData, undefined>;

interface UpdateStudentDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentDataVariables): MutationRef<UpdateStudentDataData, UpdateStudentDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentDataVariables): MutationRef<UpdateStudentDataData, UpdateStudentDataVariables>;
  operationName: string;
}
export const updateStudentDataRef: UpdateStudentDataRef;

export function updateStudentData(vars: UpdateStudentDataVariables): MutationPromise<UpdateStudentDataData, UpdateStudentDataVariables>;
export function updateStudentData(dc: DataConnect, vars: UpdateStudentDataVariables): MutationPromise<UpdateStudentDataData, UpdateStudentDataVariables>;

interface DeleteStudentDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStudentDataVariables): MutationRef<DeleteStudentDataData, DeleteStudentDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteStudentDataVariables): MutationRef<DeleteStudentDataData, DeleteStudentDataVariables>;
  operationName: string;
}
export const deleteStudentDataRef: DeleteStudentDataRef;

export function deleteStudentData(vars: DeleteStudentDataVariables): MutationPromise<DeleteStudentDataData, DeleteStudentDataVariables>;
export function deleteStudentData(dc: DataConnect, vars: DeleteStudentDataVariables): MutationPromise<DeleteStudentDataData, DeleteStudentDataVariables>;

interface GetStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentVariables): QueryRef<GetStudentData, GetStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudentVariables): QueryRef<GetStudentData, GetStudentVariables>;
  operationName: string;
}
export const getStudentRef: GetStudentRef;

export function getStudent(vars: GetStudentVariables, options?: ExecuteQueryOptions): QueryPromise<GetStudentData, GetStudentVariables>;
export function getStudent(dc: DataConnect, vars: GetStudentVariables, options?: ExecuteQueryOptions): QueryPromise<GetStudentData, GetStudentVariables>;

interface ListStudentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStudentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStudentsData, undefined>;
  operationName: string;
}
export const listStudentsRef: ListStudentsRef;

export function listStudents(options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;
export function listStudents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;

interface CreateTeacherDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTeacherDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateTeacherDataData, undefined>;
  operationName: string;
}
export const createTeacherDataRef: CreateTeacherDataRef;

export function createTeacherData(): MutationPromise<CreateTeacherDataData, undefined>;
export function createTeacherData(dc: DataConnect): MutationPromise<CreateTeacherDataData, undefined>;

interface UpdateTeacherDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeacherDataVariables): MutationRef<UpdateTeacherDataData, UpdateTeacherDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeacherDataVariables): MutationRef<UpdateTeacherDataData, UpdateTeacherDataVariables>;
  operationName: string;
}
export const updateTeacherDataRef: UpdateTeacherDataRef;

export function updateTeacherData(vars: UpdateTeacherDataVariables): MutationPromise<UpdateTeacherDataData, UpdateTeacherDataVariables>;
export function updateTeacherData(dc: DataConnect, vars: UpdateTeacherDataVariables): MutationPromise<UpdateTeacherDataData, UpdateTeacherDataVariables>;

interface DeleteTeacherDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeacherDataVariables): MutationRef<DeleteTeacherDataData, DeleteTeacherDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTeacherDataVariables): MutationRef<DeleteTeacherDataData, DeleteTeacherDataVariables>;
  operationName: string;
}
export const deleteTeacherDataRef: DeleteTeacherDataRef;

export function deleteTeacherData(vars: DeleteTeacherDataVariables): MutationPromise<DeleteTeacherDataData, DeleteTeacherDataVariables>;
export function deleteTeacherData(dc: DataConnect, vars: DeleteTeacherDataVariables): MutationPromise<DeleteTeacherDataData, DeleteTeacherDataVariables>;

interface GetTeacherRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeacherVariables): QueryRef<GetTeacherData, GetTeacherVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeacherVariables): QueryRef<GetTeacherData, GetTeacherVariables>;
  operationName: string;
}
export const getTeacherRef: GetTeacherRef;

export function getTeacher(vars: GetTeacherVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherData, GetTeacherVariables>;
export function getTeacher(dc: DataConnect, vars: GetTeacherVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherData, GetTeacherVariables>;

interface ListTeachersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTeachersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTeachersData, undefined>;
  operationName: string;
}
export const listTeachersRef: ListTeachersRef;

export function listTeachers(options?: ExecuteQueryOptions): QueryPromise<ListTeachersData, undefined>;
export function listTeachers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTeachersData, undefined>;

interface CreateCourseDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseDataVariables): MutationRef<CreateCourseDataData, CreateCourseDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCourseDataVariables): MutationRef<CreateCourseDataData, CreateCourseDataVariables>;
  operationName: string;
}
export const createCourseDataRef: CreateCourseDataRef;

export function createCourseData(vars: CreateCourseDataVariables): MutationPromise<CreateCourseDataData, CreateCourseDataVariables>;
export function createCourseData(dc: DataConnect, vars: CreateCourseDataVariables): MutationPromise<CreateCourseDataData, CreateCourseDataVariables>;

interface UpdateCourseDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseDataVariables): MutationRef<UpdateCourseDataData, UpdateCourseDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCourseDataVariables): MutationRef<UpdateCourseDataData, UpdateCourseDataVariables>;
  operationName: string;
}
export const updateCourseDataRef: UpdateCourseDataRef;

export function updateCourseData(vars: UpdateCourseDataVariables): MutationPromise<UpdateCourseDataData, UpdateCourseDataVariables>;
export function updateCourseData(dc: DataConnect, vars: UpdateCourseDataVariables): MutationPromise<UpdateCourseDataData, UpdateCourseDataVariables>;

interface DeleteCourseDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCourseDataVariables): MutationRef<DeleteCourseDataData, DeleteCourseDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCourseDataVariables): MutationRef<DeleteCourseDataData, DeleteCourseDataVariables>;
  operationName: string;
}
export const deleteCourseDataRef: DeleteCourseDataRef;

export function deleteCourseData(vars: DeleteCourseDataVariables): MutationPromise<DeleteCourseDataData, DeleteCourseDataVariables>;
export function deleteCourseData(dc: DataConnect, vars: DeleteCourseDataVariables): MutationPromise<DeleteCourseDataData, DeleteCourseDataVariables>;

interface GetCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
  operationName: string;
}
export const getCourseRef: GetCourseRef;

export function getCourse(vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;
export function getCourse(dc: DataConnect, vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;

interface ListCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCoursesData, undefined>;
  operationName: string;
}
export const listCoursesRef: ListCoursesRef;

export function listCourses(options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;
export function listCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;

interface EnrollStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollStudentVariables): MutationRef<EnrollStudentData, EnrollStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnrollStudentVariables): MutationRef<EnrollStudentData, EnrollStudentVariables>;
  operationName: string;
}
export const enrollStudentRef: EnrollStudentRef;

export function enrollStudent(vars: EnrollStudentVariables): MutationPromise<EnrollStudentData, EnrollStudentVariables>;
export function enrollStudent(dc: DataConnect, vars: EnrollStudentVariables): MutationPromise<EnrollStudentData, EnrollStudentVariables>;

interface UpdateEnrollmentGradeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEnrollmentGradeVariables): MutationRef<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEnrollmentGradeVariables): MutationRef<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;
  operationName: string;
}
export const updateEnrollmentGradeRef: UpdateEnrollmentGradeRef;

export function updateEnrollmentGrade(vars: UpdateEnrollmentGradeVariables): MutationPromise<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;
export function updateEnrollmentGrade(dc: DataConnect, vars: UpdateEnrollmentGradeVariables): MutationPromise<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;

interface DropCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
  operationName: string;
}
export const dropCourseRef: DropCourseRef;

export function dropCourse(vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;
export function dropCourse(dc: DataConnect, vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;

interface GetEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
  operationName: string;
}
export const getEnrollmentRef: GetEnrollmentRef;

export function getEnrollment(vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;
export function getEnrollment(dc: DataConnect, vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;

interface ListEnrollmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEnrollmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListEnrollmentsData, undefined>;
  operationName: string;
}
export const listEnrollmentsRef: ListEnrollmentsRef;

export function listEnrollments(options?: ExecuteQueryOptions): QueryPromise<ListEnrollmentsData, undefined>;
export function listEnrollments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListEnrollmentsData, undefined>;

interface RecordAttendanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordAttendanceVariables): MutationRef<RecordAttendanceData, RecordAttendanceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordAttendanceVariables): MutationRef<RecordAttendanceData, RecordAttendanceVariables>;
  operationName: string;
}
export const recordAttendanceRef: RecordAttendanceRef;

export function recordAttendance(vars: RecordAttendanceVariables): MutationPromise<RecordAttendanceData, RecordAttendanceVariables>;
export function recordAttendance(dc: DataConnect, vars: RecordAttendanceVariables): MutationPromise<RecordAttendanceData, RecordAttendanceVariables>;

interface UpdateAttendanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAttendanceVariables): MutationRef<UpdateAttendanceData, UpdateAttendanceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAttendanceVariables): MutationRef<UpdateAttendanceData, UpdateAttendanceVariables>;
  operationName: string;
}
export const updateAttendanceRef: UpdateAttendanceRef;

export function updateAttendance(vars: UpdateAttendanceVariables): MutationPromise<UpdateAttendanceData, UpdateAttendanceVariables>;
export function updateAttendance(dc: DataConnect, vars: UpdateAttendanceVariables): MutationPromise<UpdateAttendanceData, UpdateAttendanceVariables>;

interface DeleteAttendanceRecordRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAttendanceRecordVariables): MutationRef<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAttendanceRecordVariables): MutationRef<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;
  operationName: string;
}
export const deleteAttendanceRecordRef: DeleteAttendanceRecordRef;

export function deleteAttendanceRecord(vars: DeleteAttendanceRecordVariables): MutationPromise<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;
export function deleteAttendanceRecord(dc: DataConnect, vars: DeleteAttendanceRecordVariables): MutationPromise<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;

interface GetAttendanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAttendanceVariables): QueryRef<GetAttendanceData, GetAttendanceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAttendanceVariables): QueryRef<GetAttendanceData, GetAttendanceVariables>;
  operationName: string;
}
export const getAttendanceRef: GetAttendanceRef;

export function getAttendance(vars: GetAttendanceVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttendanceData, GetAttendanceVariables>;
export function getAttendance(dc: DataConnect, vars: GetAttendanceVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttendanceData, GetAttendanceVariables>;

interface ListAttendanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAttendanceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAttendanceData, undefined>;
  operationName: string;
}
export const listAttendanceRef: ListAttendanceRef;

export function listAttendance(options?: ExecuteQueryOptions): QueryPromise<ListAttendanceData, undefined>;
export function listAttendance(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAttendanceData, undefined>;


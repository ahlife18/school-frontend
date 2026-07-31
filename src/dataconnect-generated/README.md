# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetStudent*](#getstudent)
  - [*ListStudents*](#liststudents)
  - [*GetTeacher*](#getteacher)
  - [*ListTeachers*](#listteachers)
  - [*GetCourse*](#getcourse)
  - [*ListCourses*](#listcourses)
  - [*GetEnrollment*](#getenrollment)
  - [*ListEnrollments*](#listenrollments)
  - [*GetAttendance*](#getattendance)
  - [*ListAttendance*](#listattendance)
- [**Mutations**](#mutations)
  - [*CreateStudentData*](#createstudentdata)
  - [*UpdateStudentData*](#updatestudentdata)
  - [*DeleteStudentData*](#deletestudentdata)
  - [*CreateTeacherData*](#createteacherdata)
  - [*UpdateTeacherData*](#updateteacherdata)
  - [*DeleteTeacherData*](#deleteteacherdata)
  - [*CreateCourseData*](#createcoursedata)
  - [*UpdateCourseData*](#updatecoursedata)
  - [*DeleteCourseData*](#deletecoursedata)
  - [*EnrollStudent*](#enrollstudent)
  - [*UpdateEnrollmentGrade*](#updateenrollmentgrade)
  - [*DropCourse*](#dropcourse)
  - [*RecordAttendance*](#recordattendance)
  - [*UpdateAttendance*](#updateattendance)
  - [*DeleteAttendanceRecord*](#deleteattendancerecord)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetStudent
You can execute the `GetStudent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudent(vars: GetStudentVariables, options?: ExecuteQueryOptions): QueryPromise<GetStudentData, GetStudentVariables>;

interface GetStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudentVariables): QueryRef<GetStudentData, GetStudentVariables>;
}
export const getStudentRef: GetStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudent(dc: DataConnect, vars: GetStudentVariables, options?: ExecuteQueryOptions): QueryPromise<GetStudentData, GetStudentVariables>;

interface GetStudentRef {
  ...
  (dc: DataConnect, vars: GetStudentVariables): QueryRef<GetStudentData, GetStudentVariables>;
}
export const getStudentRef: GetStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudentRef:
```typescript
const name = getStudentRef.operationName;
console.log(name);
```

### Variables
The `GetStudent` query requires an argument of type `GetStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudentData {
  student?: {
    name: string;
    email: string;
    gradeLevel: number;
  };
}
```
### Using `GetStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudent, GetStudentVariables } from '@dataconnect/generated';

// The `GetStudent` query requires an argument of type `GetStudentVariables`:
const getStudentVars: GetStudentVariables = {
  id: ..., 
};

// Call the `getStudent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudent(getStudentVars);
// Variables can be defined inline as well.
const { data } = await getStudent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudent(dataConnect, getStudentVars);

console.log(data.student);

// Or, you can use the `Promise` API.
getStudent(getStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student);
});
```

### Using `GetStudent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudentRef, GetStudentVariables } from '@dataconnect/generated';

// The `GetStudent` query requires an argument of type `GetStudentVariables`:
const getStudentVars: GetStudentVariables = {
  id: ..., 
};

// Call the `getStudentRef()` function to get a reference to the query.
const ref = getStudentRef(getStudentVars);
// Variables can be defined inline as well.
const ref = getStudentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudentRef(dataConnect, getStudentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.student);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.student);
});
```

## ListStudents
You can execute the `ListStudents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStudents(options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;

interface ListStudentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStudentsData, undefined>;
}
export const listStudentsRef: ListStudentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStudents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStudentsData, undefined>;

interface ListStudentsRef {
  ...
  (dc: DataConnect): QueryRef<ListStudentsData, undefined>;
}
export const listStudentsRef: ListStudentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStudentsRef:
```typescript
const name = listStudentsRef.operationName;
console.log(name);
```

### Variables
The `ListStudents` query has no variables.
### Return Type
Recall that executing the `ListStudents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStudentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStudentsData {
  students: ({
    name: string;
    email: string;
  })[];
}
```
### Using `ListStudents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStudents } from '@dataconnect/generated';


// Call the `listStudents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStudents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStudents(dataConnect);

console.log(data.students);

// Or, you can use the `Promise` API.
listStudents().then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `ListStudents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStudentsRef } from '@dataconnect/generated';


// Call the `listStudentsRef()` function to get a reference to the query.
const ref = listStudentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStudentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## GetTeacher
You can execute the `GetTeacher` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTeacher(vars: GetTeacherVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherData, GetTeacherVariables>;

interface GetTeacherRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeacherVariables): QueryRef<GetTeacherData, GetTeacherVariables>;
}
export const getTeacherRef: GetTeacherRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeacher(dc: DataConnect, vars: GetTeacherVariables, options?: ExecuteQueryOptions): QueryPromise<GetTeacherData, GetTeacherVariables>;

interface GetTeacherRef {
  ...
  (dc: DataConnect, vars: GetTeacherVariables): QueryRef<GetTeacherData, GetTeacherVariables>;
}
export const getTeacherRef: GetTeacherRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeacherRef:
```typescript
const name = getTeacherRef.operationName;
console.log(name);
```

### Variables
The `GetTeacher` query requires an argument of type `GetTeacherVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeacherVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTeacher` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeacherData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTeacherData {
  teacher?: {
    name: string;
    department: string;
  };
}
```
### Using `GetTeacher`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeacher, GetTeacherVariables } from '@dataconnect/generated';

// The `GetTeacher` query requires an argument of type `GetTeacherVariables`:
const getTeacherVars: GetTeacherVariables = {
  id: ..., 
};

// Call the `getTeacher()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeacher(getTeacherVars);
// Variables can be defined inline as well.
const { data } = await getTeacher({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeacher(dataConnect, getTeacherVars);

console.log(data.teacher);

// Or, you can use the `Promise` API.
getTeacher(getTeacherVars).then((response) => {
  const data = response.data;
  console.log(data.teacher);
});
```

### Using `GetTeacher`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeacherRef, GetTeacherVariables } from '@dataconnect/generated';

// The `GetTeacher` query requires an argument of type `GetTeacherVariables`:
const getTeacherVars: GetTeacherVariables = {
  id: ..., 
};

// Call the `getTeacherRef()` function to get a reference to the query.
const ref = getTeacherRef(getTeacherVars);
// Variables can be defined inline as well.
const ref = getTeacherRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeacherRef(dataConnect, getTeacherVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teacher);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher);
});
```

## ListTeachers
You can execute the `ListTeachers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTeachers(options?: ExecuteQueryOptions): QueryPromise<ListTeachersData, undefined>;

interface ListTeachersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTeachersData, undefined>;
}
export const listTeachersRef: ListTeachersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTeachers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTeachersData, undefined>;

interface ListTeachersRef {
  ...
  (dc: DataConnect): QueryRef<ListTeachersData, undefined>;
}
export const listTeachersRef: ListTeachersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTeachersRef:
```typescript
const name = listTeachersRef.operationName;
console.log(name);
```

### Variables
The `ListTeachers` query has no variables.
### Return Type
Recall that executing the `ListTeachers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTeachersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTeachersData {
  teachers: ({
    name: string;
    department: string;
  })[];
}
```
### Using `ListTeachers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTeachers } from '@dataconnect/generated';


// Call the `listTeachers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTeachers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTeachers(dataConnect);

console.log(data.teachers);

// Or, you can use the `Promise` API.
listTeachers().then((response) => {
  const data = response.data;
  console.log(data.teachers);
});
```

### Using `ListTeachers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTeachersRef } from '@dataconnect/generated';


// Call the `listTeachersRef()` function to get a reference to the query.
const ref = listTeachersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTeachersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teachers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teachers);
});
```

## GetCourse
You can execute the `GetCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourse(vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
}
export const getCourseRef: GetCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourse(dc: DataConnect, vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCourseRef {
  ...
  (dc: DataConnect, vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
}
export const getCourseRef: GetCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseRef:
```typescript
const name = getCourseRef.operationName;
console.log(name);
```

### Variables
The `GetCourse` query requires an argument of type `GetCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseData {
  course?: {
    title: string;
    teacher: {
      name: string;
    };
  };
}
```
### Using `GetCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourse, GetCourseVariables } from '@dataconnect/generated';

// The `GetCourse` query requires an argument of type `GetCourseVariables`:
const getCourseVars: GetCourseVariables = {
  id: ..., 
};

// Call the `getCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourse(getCourseVars);
// Variables can be defined inline as well.
const { data } = await getCourse({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourse(dataConnect, getCourseVars);

console.log(data.course);

// Or, you can use the `Promise` API.
getCourse(getCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

### Using `GetCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseRef, GetCourseVariables } from '@dataconnect/generated';

// The `GetCourse` query requires an argument of type `GetCourseVariables`:
const getCourseVars: GetCourseVariables = {
  id: ..., 
};

// Call the `getCourseRef()` function to get a reference to the query.
const ref = getCourseRef(getCourseVars);
// Variables can be defined inline as well.
const ref = getCourseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseRef(dataConnect, getCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.course);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

## ListCourses
You can execute the `ListCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCourses(options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;

interface ListCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCoursesData, undefined>;
}
export const listCoursesRef: ListCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;

interface ListCoursesRef {
  ...
  (dc: DataConnect): QueryRef<ListCoursesData, undefined>;
}
export const listCoursesRef: ListCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCoursesRef:
```typescript
const name = listCoursesRef.operationName;
console.log(name);
```

### Variables
The `ListCourses` query has no variables.
### Return Type
Recall that executing the `ListCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCoursesData {
  courses: ({
    title: string;
    description: string;
  })[];
}
```
### Using `ListCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCourses } from '@dataconnect/generated';


// Call the `listCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
listCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `ListCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCoursesRef } from '@dataconnect/generated';


// Call the `listCoursesRef()` function to get a reference to the query.
const ref = listCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCoursesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetEnrollment
You can execute the `GetEnrollment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEnrollment(vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;

interface GetEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
}
export const getEnrollmentRef: GetEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEnrollment(dc: DataConnect, vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;

interface GetEnrollmentRef {
  ...
  (dc: DataConnect, vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
}
export const getEnrollmentRef: GetEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEnrollmentRef:
```typescript
const name = getEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `GetEnrollment` query requires an argument of type `GetEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEnrollmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetEnrollment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEnrollmentData {
  enrollment?: {
    grade?: number | null;
    status?: string | null;
    course: {
      title: string;
    };
  };
}
```
### Using `GetEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEnrollment, GetEnrollmentVariables } from '@dataconnect/generated';

// The `GetEnrollment` query requires an argument of type `GetEnrollmentVariables`:
const getEnrollmentVars: GetEnrollmentVariables = {
  id: ..., 
};

// Call the `getEnrollment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEnrollment(getEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await getEnrollment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEnrollment(dataConnect, getEnrollmentVars);

console.log(data.enrollment);

// Or, you can use the `Promise` API.
getEnrollment(getEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment);
});
```

### Using `GetEnrollment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEnrollmentRef, GetEnrollmentVariables } from '@dataconnect/generated';

// The `GetEnrollment` query requires an argument of type `GetEnrollmentVariables`:
const getEnrollmentVars: GetEnrollmentVariables = {
  id: ..., 
};

// Call the `getEnrollmentRef()` function to get a reference to the query.
const ref = getEnrollmentRef(getEnrollmentVars);
// Variables can be defined inline as well.
const ref = getEnrollmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEnrollmentRef(dataConnect, getEnrollmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment);
});
```

## ListEnrollments
You can execute the `ListEnrollments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEnrollments(options?: ExecuteQueryOptions): QueryPromise<ListEnrollmentsData, undefined>;

interface ListEnrollmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEnrollmentsData, undefined>;
}
export const listEnrollmentsRef: ListEnrollmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEnrollments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListEnrollmentsData, undefined>;

interface ListEnrollmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListEnrollmentsData, undefined>;
}
export const listEnrollmentsRef: ListEnrollmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEnrollmentsRef:
```typescript
const name = listEnrollmentsRef.operationName;
console.log(name);
```

### Variables
The `ListEnrollments` query has no variables.
### Return Type
Recall that executing the `ListEnrollments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEnrollmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEnrollmentsData {
  enrollments: ({
    grade?: number | null;
    status?: string | null;
  })[];
}
```
### Using `ListEnrollments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEnrollments } from '@dataconnect/generated';


// Call the `listEnrollments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEnrollments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEnrollments(dataConnect);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
listEnrollments().then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `ListEnrollments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEnrollmentsRef } from '@dataconnect/generated';


// Call the `listEnrollmentsRef()` function to get a reference to the query.
const ref = listEnrollmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEnrollmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetAttendance
You can execute the `GetAttendance` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAttendance(vars: GetAttendanceVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttendanceData, GetAttendanceVariables>;

interface GetAttendanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAttendanceVariables): QueryRef<GetAttendanceData, GetAttendanceVariables>;
}
export const getAttendanceRef: GetAttendanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAttendance(dc: DataConnect, vars: GetAttendanceVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttendanceData, GetAttendanceVariables>;

interface GetAttendanceRef {
  ...
  (dc: DataConnect, vars: GetAttendanceVariables): QueryRef<GetAttendanceData, GetAttendanceVariables>;
}
export const getAttendanceRef: GetAttendanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAttendanceRef:
```typescript
const name = getAttendanceRef.operationName;
console.log(name);
```

### Variables
The `GetAttendance` query requires an argument of type `GetAttendanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAttendanceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAttendance` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAttendanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAttendanceData {
  attendance?: {
    date: DateString;
    status: string;
  };
}
```
### Using `GetAttendance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAttendance, GetAttendanceVariables } from '@dataconnect/generated';

// The `GetAttendance` query requires an argument of type `GetAttendanceVariables`:
const getAttendanceVars: GetAttendanceVariables = {
  id: ..., 
};

// Call the `getAttendance()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAttendance(getAttendanceVars);
// Variables can be defined inline as well.
const { data } = await getAttendance({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAttendance(dataConnect, getAttendanceVars);

console.log(data.attendance);

// Or, you can use the `Promise` API.
getAttendance(getAttendanceVars).then((response) => {
  const data = response.data;
  console.log(data.attendance);
});
```

### Using `GetAttendance`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAttendanceRef, GetAttendanceVariables } from '@dataconnect/generated';

// The `GetAttendance` query requires an argument of type `GetAttendanceVariables`:
const getAttendanceVars: GetAttendanceVariables = {
  id: ..., 
};

// Call the `getAttendanceRef()` function to get a reference to the query.
const ref = getAttendanceRef(getAttendanceVars);
// Variables can be defined inline as well.
const ref = getAttendanceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAttendanceRef(dataConnect, getAttendanceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.attendance);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.attendance);
});
```

## ListAttendance
You can execute the `ListAttendance` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAttendance(options?: ExecuteQueryOptions): QueryPromise<ListAttendanceData, undefined>;

interface ListAttendanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAttendanceData, undefined>;
}
export const listAttendanceRef: ListAttendanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAttendance(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAttendanceData, undefined>;

interface ListAttendanceRef {
  ...
  (dc: DataConnect): QueryRef<ListAttendanceData, undefined>;
}
export const listAttendanceRef: ListAttendanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAttendanceRef:
```typescript
const name = listAttendanceRef.operationName;
console.log(name);
```

### Variables
The `ListAttendance` query has no variables.
### Return Type
Recall that executing the `ListAttendance` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAttendanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAttendanceData {
  attendances: ({
    date: DateString;
    status: string;
  })[];
}
```
### Using `ListAttendance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAttendance } from '@dataconnect/generated';


// Call the `listAttendance()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAttendance();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAttendance(dataConnect);

console.log(data.attendances);

// Or, you can use the `Promise` API.
listAttendance().then((response) => {
  const data = response.data;
  console.log(data.attendances);
});
```

### Using `ListAttendance`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAttendanceRef } from '@dataconnect/generated';


// Call the `listAttendanceRef()` function to get a reference to the query.
const ref = listAttendanceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAttendanceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.attendances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.attendances);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateStudentData
You can execute the `CreateStudentData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStudentData(): MutationPromise<CreateStudentDataData, undefined>;

interface CreateStudentDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateStudentDataData, undefined>;
}
export const createStudentDataRef: CreateStudentDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStudentData(dc: DataConnect): MutationPromise<CreateStudentDataData, undefined>;

interface CreateStudentDataRef {
  ...
  (dc: DataConnect): MutationRef<CreateStudentDataData, undefined>;
}
export const createStudentDataRef: CreateStudentDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStudentDataRef:
```typescript
const name = createStudentDataRef.operationName;
console.log(name);
```

### Variables
The `CreateStudentData` mutation has no variables.
### Return Type
Recall that executing the `CreateStudentData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStudentDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStudentDataData {
  student_insert: Student_Key;
}
```
### Using `CreateStudentData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStudentData } from '@dataconnect/generated';


// Call the `createStudentData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudentData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStudentData(dataConnect);

console.log(data.student_insert);

// Or, you can use the `Promise` API.
createStudentData().then((response) => {
  const data = response.data;
  console.log(data.student_insert);
});
```

### Using `CreateStudentData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStudentDataRef } from '@dataconnect/generated';


// Call the `createStudentDataRef()` function to get a reference to the mutation.
const ref = createStudentDataRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStudentDataRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_insert);
});
```

## UpdateStudentData
You can execute the `UpdateStudentData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStudentData(vars: UpdateStudentDataVariables): MutationPromise<UpdateStudentDataData, UpdateStudentDataVariables>;

interface UpdateStudentDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentDataVariables): MutationRef<UpdateStudentDataData, UpdateStudentDataVariables>;
}
export const updateStudentDataRef: UpdateStudentDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudentData(dc: DataConnect, vars: UpdateStudentDataVariables): MutationPromise<UpdateStudentDataData, UpdateStudentDataVariables>;

interface UpdateStudentDataRef {
  ...
  (dc: DataConnect, vars: UpdateStudentDataVariables): MutationRef<UpdateStudentDataData, UpdateStudentDataVariables>;
}
export const updateStudentDataRef: UpdateStudentDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentDataRef:
```typescript
const name = updateStudentDataRef.operationName;
console.log(name);
```

### Variables
The `UpdateStudentData` mutation requires an argument of type `UpdateStudentDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStudentDataVariables {
  id: UUIDString;
  grade: number;
}
```
### Return Type
Recall that executing the `UpdateStudentData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentDataData {
  student_update?: Student_Key | null;
}
```
### Using `UpdateStudentData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudentData, UpdateStudentDataVariables } from '@dataconnect/generated';

// The `UpdateStudentData` mutation requires an argument of type `UpdateStudentDataVariables`:
const updateStudentDataVars: UpdateStudentDataVariables = {
  id: ..., 
  grade: ..., 
};

// Call the `updateStudentData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudentData(updateStudentDataVars);
// Variables can be defined inline as well.
const { data } = await updateStudentData({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudentData(dataConnect, updateStudentDataVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
updateStudentData(updateStudentDataVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `UpdateStudentData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentDataRef, UpdateStudentDataVariables } from '@dataconnect/generated';

// The `UpdateStudentData` mutation requires an argument of type `UpdateStudentDataVariables`:
const updateStudentDataVars: UpdateStudentDataVariables = {
  id: ..., 
  grade: ..., 
};

// Call the `updateStudentDataRef()` function to get a reference to the mutation.
const ref = updateStudentDataRef(updateStudentDataVars);
// Variables can be defined inline as well.
const ref = updateStudentDataRef({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentDataRef(dataConnect, updateStudentDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## DeleteStudentData
You can execute the `DeleteStudentData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteStudentData(vars: DeleteStudentDataVariables): MutationPromise<DeleteStudentDataData, DeleteStudentDataVariables>;

interface DeleteStudentDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStudentDataVariables): MutationRef<DeleteStudentDataData, DeleteStudentDataVariables>;
}
export const deleteStudentDataRef: DeleteStudentDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteStudentData(dc: DataConnect, vars: DeleteStudentDataVariables): MutationPromise<DeleteStudentDataData, DeleteStudentDataVariables>;

interface DeleteStudentDataRef {
  ...
  (dc: DataConnect, vars: DeleteStudentDataVariables): MutationRef<DeleteStudentDataData, DeleteStudentDataVariables>;
}
export const deleteStudentDataRef: DeleteStudentDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteStudentDataRef:
```typescript
const name = deleteStudentDataRef.operationName;
console.log(name);
```

### Variables
The `DeleteStudentData` mutation requires an argument of type `DeleteStudentDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteStudentDataVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteStudentData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteStudentDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteStudentDataData {
  student_delete?: Student_Key | null;
}
```
### Using `DeleteStudentData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteStudentData, DeleteStudentDataVariables } from '@dataconnect/generated';

// The `DeleteStudentData` mutation requires an argument of type `DeleteStudentDataVariables`:
const deleteStudentDataVars: DeleteStudentDataVariables = {
  id: ..., 
};

// Call the `deleteStudentData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteStudentData(deleteStudentDataVars);
// Variables can be defined inline as well.
const { data } = await deleteStudentData({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteStudentData(dataConnect, deleteStudentDataVars);

console.log(data.student_delete);

// Or, you can use the `Promise` API.
deleteStudentData(deleteStudentDataVars).then((response) => {
  const data = response.data;
  console.log(data.student_delete);
});
```

### Using `DeleteStudentData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteStudentDataRef, DeleteStudentDataVariables } from '@dataconnect/generated';

// The `DeleteStudentData` mutation requires an argument of type `DeleteStudentDataVariables`:
const deleteStudentDataVars: DeleteStudentDataVariables = {
  id: ..., 
};

// Call the `deleteStudentDataRef()` function to get a reference to the mutation.
const ref = deleteStudentDataRef(deleteStudentDataVars);
// Variables can be defined inline as well.
const ref = deleteStudentDataRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteStudentDataRef(dataConnect, deleteStudentDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_delete);
});
```

## CreateTeacherData
You can execute the `CreateTeacherData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTeacherData(): MutationPromise<CreateTeacherDataData, undefined>;

interface CreateTeacherDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTeacherDataData, undefined>;
}
export const createTeacherDataRef: CreateTeacherDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTeacherData(dc: DataConnect): MutationPromise<CreateTeacherDataData, undefined>;

interface CreateTeacherDataRef {
  ...
  (dc: DataConnect): MutationRef<CreateTeacherDataData, undefined>;
}
export const createTeacherDataRef: CreateTeacherDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTeacherDataRef:
```typescript
const name = createTeacherDataRef.operationName;
console.log(name);
```

### Variables
The `CreateTeacherData` mutation has no variables.
### Return Type
Recall that executing the `CreateTeacherData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTeacherDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTeacherDataData {
  teacher_insert: Teacher_Key;
}
```
### Using `CreateTeacherData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTeacherData } from '@dataconnect/generated';


// Call the `createTeacherData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTeacherData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTeacherData(dataConnect);

console.log(data.teacher_insert);

// Or, you can use the `Promise` API.
createTeacherData().then((response) => {
  const data = response.data;
  console.log(data.teacher_insert);
});
```

### Using `CreateTeacherData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTeacherDataRef } from '@dataconnect/generated';


// Call the `createTeacherDataRef()` function to get a reference to the mutation.
const ref = createTeacherDataRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTeacherDataRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacher_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher_insert);
});
```

## UpdateTeacherData
You can execute the `UpdateTeacherData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTeacherData(vars: UpdateTeacherDataVariables): MutationPromise<UpdateTeacherDataData, UpdateTeacherDataVariables>;

interface UpdateTeacherDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeacherDataVariables): MutationRef<UpdateTeacherDataData, UpdateTeacherDataVariables>;
}
export const updateTeacherDataRef: UpdateTeacherDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTeacherData(dc: DataConnect, vars: UpdateTeacherDataVariables): MutationPromise<UpdateTeacherDataData, UpdateTeacherDataVariables>;

interface UpdateTeacherDataRef {
  ...
  (dc: DataConnect, vars: UpdateTeacherDataVariables): MutationRef<UpdateTeacherDataData, UpdateTeacherDataVariables>;
}
export const updateTeacherDataRef: UpdateTeacherDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTeacherDataRef:
```typescript
const name = updateTeacherDataRef.operationName;
console.log(name);
```

### Variables
The `UpdateTeacherData` mutation requires an argument of type `UpdateTeacherDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTeacherDataVariables {
  id: UUIDString;
  dept: string;
}
```
### Return Type
Recall that executing the `UpdateTeacherData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTeacherDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTeacherDataData {
  teacher_update?: Teacher_Key | null;
}
```
### Using `UpdateTeacherData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTeacherData, UpdateTeacherDataVariables } from '@dataconnect/generated';

// The `UpdateTeacherData` mutation requires an argument of type `UpdateTeacherDataVariables`:
const updateTeacherDataVars: UpdateTeacherDataVariables = {
  id: ..., 
  dept: ..., 
};

// Call the `updateTeacherData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTeacherData(updateTeacherDataVars);
// Variables can be defined inline as well.
const { data } = await updateTeacherData({ id: ..., dept: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTeacherData(dataConnect, updateTeacherDataVars);

console.log(data.teacher_update);

// Or, you can use the `Promise` API.
updateTeacherData(updateTeacherDataVars).then((response) => {
  const data = response.data;
  console.log(data.teacher_update);
});
```

### Using `UpdateTeacherData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTeacherDataRef, UpdateTeacherDataVariables } from '@dataconnect/generated';

// The `UpdateTeacherData` mutation requires an argument of type `UpdateTeacherDataVariables`:
const updateTeacherDataVars: UpdateTeacherDataVariables = {
  id: ..., 
  dept: ..., 
};

// Call the `updateTeacherDataRef()` function to get a reference to the mutation.
const ref = updateTeacherDataRef(updateTeacherDataVars);
// Variables can be defined inline as well.
const ref = updateTeacherDataRef({ id: ..., dept: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTeacherDataRef(dataConnect, updateTeacherDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacher_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher_update);
});
```

## DeleteTeacherData
You can execute the `DeleteTeacherData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTeacherData(vars: DeleteTeacherDataVariables): MutationPromise<DeleteTeacherDataData, DeleteTeacherDataVariables>;

interface DeleteTeacherDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeacherDataVariables): MutationRef<DeleteTeacherDataData, DeleteTeacherDataVariables>;
}
export const deleteTeacherDataRef: DeleteTeacherDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTeacherData(dc: DataConnect, vars: DeleteTeacherDataVariables): MutationPromise<DeleteTeacherDataData, DeleteTeacherDataVariables>;

interface DeleteTeacherDataRef {
  ...
  (dc: DataConnect, vars: DeleteTeacherDataVariables): MutationRef<DeleteTeacherDataData, DeleteTeacherDataVariables>;
}
export const deleteTeacherDataRef: DeleteTeacherDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTeacherDataRef:
```typescript
const name = deleteTeacherDataRef.operationName;
console.log(name);
```

### Variables
The `DeleteTeacherData` mutation requires an argument of type `DeleteTeacherDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTeacherDataVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTeacherData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTeacherDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTeacherDataData {
  teacher_delete?: Teacher_Key | null;
}
```
### Using `DeleteTeacherData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTeacherData, DeleteTeacherDataVariables } from '@dataconnect/generated';

// The `DeleteTeacherData` mutation requires an argument of type `DeleteTeacherDataVariables`:
const deleteTeacherDataVars: DeleteTeacherDataVariables = {
  id: ..., 
};

// Call the `deleteTeacherData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTeacherData(deleteTeacherDataVars);
// Variables can be defined inline as well.
const { data } = await deleteTeacherData({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTeacherData(dataConnect, deleteTeacherDataVars);

console.log(data.teacher_delete);

// Or, you can use the `Promise` API.
deleteTeacherData(deleteTeacherDataVars).then((response) => {
  const data = response.data;
  console.log(data.teacher_delete);
});
```

### Using `DeleteTeacherData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTeacherDataRef, DeleteTeacherDataVariables } from '@dataconnect/generated';

// The `DeleteTeacherData` mutation requires an argument of type `DeleteTeacherDataVariables`:
const deleteTeacherDataVars: DeleteTeacherDataVariables = {
  id: ..., 
};

// Call the `deleteTeacherDataRef()` function to get a reference to the mutation.
const ref = deleteTeacherDataRef(deleteTeacherDataVars);
// Variables can be defined inline as well.
const ref = deleteTeacherDataRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTeacherDataRef(dataConnect, deleteTeacherDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacher_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher_delete);
});
```

## CreateCourseData
You can execute the `CreateCourseData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCourseData(vars: CreateCourseDataVariables): MutationPromise<CreateCourseDataData, CreateCourseDataVariables>;

interface CreateCourseDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseDataVariables): MutationRef<CreateCourseDataData, CreateCourseDataVariables>;
}
export const createCourseDataRef: CreateCourseDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCourseData(dc: DataConnect, vars: CreateCourseDataVariables): MutationPromise<CreateCourseDataData, CreateCourseDataVariables>;

interface CreateCourseDataRef {
  ...
  (dc: DataConnect, vars: CreateCourseDataVariables): MutationRef<CreateCourseDataData, CreateCourseDataVariables>;
}
export const createCourseDataRef: CreateCourseDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCourseDataRef:
```typescript
const name = createCourseDataRef.operationName;
console.log(name);
```

### Variables
The `CreateCourseData` mutation requires an argument of type `CreateCourseDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCourseDataVariables {
  teacherId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateCourseData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCourseDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCourseDataData {
  course_insert: Course_Key;
}
```
### Using `CreateCourseData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCourseData, CreateCourseDataVariables } from '@dataconnect/generated';

// The `CreateCourseData` mutation requires an argument of type `CreateCourseDataVariables`:
const createCourseDataVars: CreateCourseDataVariables = {
  teacherId: ..., 
};

// Call the `createCourseData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCourseData(createCourseDataVars);
// Variables can be defined inline as well.
const { data } = await createCourseData({ teacherId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCourseData(dataConnect, createCourseDataVars);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
createCourseData(createCourseDataVars).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

### Using `CreateCourseData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCourseDataRef, CreateCourseDataVariables } from '@dataconnect/generated';

// The `CreateCourseData` mutation requires an argument of type `CreateCourseDataVariables`:
const createCourseDataVars: CreateCourseDataVariables = {
  teacherId: ..., 
};

// Call the `createCourseDataRef()` function to get a reference to the mutation.
const ref = createCourseDataRef(createCourseDataVars);
// Variables can be defined inline as well.
const ref = createCourseDataRef({ teacherId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCourseDataRef(dataConnect, createCourseDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

## UpdateCourseData
You can execute the `UpdateCourseData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCourseData(vars: UpdateCourseDataVariables): MutationPromise<UpdateCourseDataData, UpdateCourseDataVariables>;

interface UpdateCourseDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseDataVariables): MutationRef<UpdateCourseDataData, UpdateCourseDataVariables>;
}
export const updateCourseDataRef: UpdateCourseDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCourseData(dc: DataConnect, vars: UpdateCourseDataVariables): MutationPromise<UpdateCourseDataData, UpdateCourseDataVariables>;

interface UpdateCourseDataRef {
  ...
  (dc: DataConnect, vars: UpdateCourseDataVariables): MutationRef<UpdateCourseDataData, UpdateCourseDataVariables>;
}
export const updateCourseDataRef: UpdateCourseDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCourseDataRef:
```typescript
const name = updateCourseDataRef.operationName;
console.log(name);
```

### Variables
The `UpdateCourseData` mutation requires an argument of type `UpdateCourseDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCourseDataVariables {
  id: UUIDString;
  desc: string;
}
```
### Return Type
Recall that executing the `UpdateCourseData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCourseDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCourseDataData {
  course_update?: Course_Key | null;
}
```
### Using `UpdateCourseData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCourseData, UpdateCourseDataVariables } from '@dataconnect/generated';

// The `UpdateCourseData` mutation requires an argument of type `UpdateCourseDataVariables`:
const updateCourseDataVars: UpdateCourseDataVariables = {
  id: ..., 
  desc: ..., 
};

// Call the `updateCourseData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCourseData(updateCourseDataVars);
// Variables can be defined inline as well.
const { data } = await updateCourseData({ id: ..., desc: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCourseData(dataConnect, updateCourseDataVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
updateCourseData(updateCourseDataVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `UpdateCourseData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCourseDataRef, UpdateCourseDataVariables } from '@dataconnect/generated';

// The `UpdateCourseData` mutation requires an argument of type `UpdateCourseDataVariables`:
const updateCourseDataVars: UpdateCourseDataVariables = {
  id: ..., 
  desc: ..., 
};

// Call the `updateCourseDataRef()` function to get a reference to the mutation.
const ref = updateCourseDataRef(updateCourseDataVars);
// Variables can be defined inline as well.
const ref = updateCourseDataRef({ id: ..., desc: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCourseDataRef(dataConnect, updateCourseDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## DeleteCourseData
You can execute the `DeleteCourseData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCourseData(vars: DeleteCourseDataVariables): MutationPromise<DeleteCourseDataData, DeleteCourseDataVariables>;

interface DeleteCourseDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCourseDataVariables): MutationRef<DeleteCourseDataData, DeleteCourseDataVariables>;
}
export const deleteCourseDataRef: DeleteCourseDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCourseData(dc: DataConnect, vars: DeleteCourseDataVariables): MutationPromise<DeleteCourseDataData, DeleteCourseDataVariables>;

interface DeleteCourseDataRef {
  ...
  (dc: DataConnect, vars: DeleteCourseDataVariables): MutationRef<DeleteCourseDataData, DeleteCourseDataVariables>;
}
export const deleteCourseDataRef: DeleteCourseDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCourseDataRef:
```typescript
const name = deleteCourseDataRef.operationName;
console.log(name);
```

### Variables
The `DeleteCourseData` mutation requires an argument of type `DeleteCourseDataVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCourseDataVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCourseData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCourseDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCourseDataData {
  course_delete?: Course_Key | null;
}
```
### Using `DeleteCourseData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCourseData, DeleteCourseDataVariables } from '@dataconnect/generated';

// The `DeleteCourseData` mutation requires an argument of type `DeleteCourseDataVariables`:
const deleteCourseDataVars: DeleteCourseDataVariables = {
  id: ..., 
};

// Call the `deleteCourseData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCourseData(deleteCourseDataVars);
// Variables can be defined inline as well.
const { data } = await deleteCourseData({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCourseData(dataConnect, deleteCourseDataVars);

console.log(data.course_delete);

// Or, you can use the `Promise` API.
deleteCourseData(deleteCourseDataVars).then((response) => {
  const data = response.data;
  console.log(data.course_delete);
});
```

### Using `DeleteCourseData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCourseDataRef, DeleteCourseDataVariables } from '@dataconnect/generated';

// The `DeleteCourseData` mutation requires an argument of type `DeleteCourseDataVariables`:
const deleteCourseDataVars: DeleteCourseDataVariables = {
  id: ..., 
};

// Call the `deleteCourseDataRef()` function to get a reference to the mutation.
const ref = deleteCourseDataRef(deleteCourseDataVars);
// Variables can be defined inline as well.
const ref = deleteCourseDataRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCourseDataRef(dataConnect, deleteCourseDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_delete);
});
```

## EnrollStudent
You can execute the `EnrollStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
enrollStudent(vars: EnrollStudentVariables): MutationPromise<EnrollStudentData, EnrollStudentVariables>;

interface EnrollStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollStudentVariables): MutationRef<EnrollStudentData, EnrollStudentVariables>;
}
export const enrollStudentRef: EnrollStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
enrollStudent(dc: DataConnect, vars: EnrollStudentVariables): MutationPromise<EnrollStudentData, EnrollStudentVariables>;

interface EnrollStudentRef {
  ...
  (dc: DataConnect, vars: EnrollStudentVariables): MutationRef<EnrollStudentData, EnrollStudentVariables>;
}
export const enrollStudentRef: EnrollStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the enrollStudentRef:
```typescript
const name = enrollStudentRef.operationName;
console.log(name);
```

### Variables
The `EnrollStudent` mutation requires an argument of type `EnrollStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnrollStudentVariables {
  studentId: UUIDString;
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `EnrollStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnrollStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnrollStudentData {
  enrollment_insert: Enrollment_Key;
}
```
### Using `EnrollStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, enrollStudent, EnrollStudentVariables } from '@dataconnect/generated';

// The `EnrollStudent` mutation requires an argument of type `EnrollStudentVariables`:
const enrollStudentVars: EnrollStudentVariables = {
  studentId: ..., 
  courseId: ..., 
};

// Call the `enrollStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await enrollStudent(enrollStudentVars);
// Variables can be defined inline as well.
const { data } = await enrollStudent({ studentId: ..., courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await enrollStudent(dataConnect, enrollStudentVars);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
enrollStudent(enrollStudentVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

### Using `EnrollStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, enrollStudentRef, EnrollStudentVariables } from '@dataconnect/generated';

// The `EnrollStudent` mutation requires an argument of type `EnrollStudentVariables`:
const enrollStudentVars: EnrollStudentVariables = {
  studentId: ..., 
  courseId: ..., 
};

// Call the `enrollStudentRef()` function to get a reference to the mutation.
const ref = enrollStudentRef(enrollStudentVars);
// Variables can be defined inline as well.
const ref = enrollStudentRef({ studentId: ..., courseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = enrollStudentRef(dataConnect, enrollStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

## UpdateEnrollmentGrade
You can execute the `UpdateEnrollmentGrade` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEnrollmentGrade(vars: UpdateEnrollmentGradeVariables): MutationPromise<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;

interface UpdateEnrollmentGradeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEnrollmentGradeVariables): MutationRef<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;
}
export const updateEnrollmentGradeRef: UpdateEnrollmentGradeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEnrollmentGrade(dc: DataConnect, vars: UpdateEnrollmentGradeVariables): MutationPromise<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;

interface UpdateEnrollmentGradeRef {
  ...
  (dc: DataConnect, vars: UpdateEnrollmentGradeVariables): MutationRef<UpdateEnrollmentGradeData, UpdateEnrollmentGradeVariables>;
}
export const updateEnrollmentGradeRef: UpdateEnrollmentGradeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEnrollmentGradeRef:
```typescript
const name = updateEnrollmentGradeRef.operationName;
console.log(name);
```

### Variables
The `UpdateEnrollmentGrade` mutation requires an argument of type `UpdateEnrollmentGradeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEnrollmentGradeVariables {
  id: UUIDString;
  grade: number;
}
```
### Return Type
Recall that executing the `UpdateEnrollmentGrade` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEnrollmentGradeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEnrollmentGradeData {
  enrollment_update?: Enrollment_Key | null;
}
```
### Using `UpdateEnrollmentGrade`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEnrollmentGrade, UpdateEnrollmentGradeVariables } from '@dataconnect/generated';

// The `UpdateEnrollmentGrade` mutation requires an argument of type `UpdateEnrollmentGradeVariables`:
const updateEnrollmentGradeVars: UpdateEnrollmentGradeVariables = {
  id: ..., 
  grade: ..., 
};

// Call the `updateEnrollmentGrade()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEnrollmentGrade(updateEnrollmentGradeVars);
// Variables can be defined inline as well.
const { data } = await updateEnrollmentGrade({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEnrollmentGrade(dataConnect, updateEnrollmentGradeVars);

console.log(data.enrollment_update);

// Or, you can use the `Promise` API.
updateEnrollmentGrade(updateEnrollmentGradeVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_update);
});
```

### Using `UpdateEnrollmentGrade`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEnrollmentGradeRef, UpdateEnrollmentGradeVariables } from '@dataconnect/generated';

// The `UpdateEnrollmentGrade` mutation requires an argument of type `UpdateEnrollmentGradeVariables`:
const updateEnrollmentGradeVars: UpdateEnrollmentGradeVariables = {
  id: ..., 
  grade: ..., 
};

// Call the `updateEnrollmentGradeRef()` function to get a reference to the mutation.
const ref = updateEnrollmentGradeRef(updateEnrollmentGradeVars);
// Variables can be defined inline as well.
const ref = updateEnrollmentGradeRef({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEnrollmentGradeRef(dataConnect, updateEnrollmentGradeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_update);
});
```

## DropCourse
You can execute the `DropCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
dropCourse(vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;

interface DropCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
}
export const dropCourseRef: DropCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
dropCourse(dc: DataConnect, vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;

interface DropCourseRef {
  ...
  (dc: DataConnect, vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
}
export const dropCourseRef: DropCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the dropCourseRef:
```typescript
const name = dropCourseRef.operationName;
console.log(name);
```

### Variables
The `DropCourse` mutation requires an argument of type `DropCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DropCourseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DropCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DropCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DropCourseData {
  enrollment_delete?: Enrollment_Key | null;
}
```
### Using `DropCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, dropCourse, DropCourseVariables } from '@dataconnect/generated';

// The `DropCourse` mutation requires an argument of type `DropCourseVariables`:
const dropCourseVars: DropCourseVariables = {
  id: ..., 
};

// Call the `dropCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await dropCourse(dropCourseVars);
// Variables can be defined inline as well.
const { data } = await dropCourse({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await dropCourse(dataConnect, dropCourseVars);

console.log(data.enrollment_delete);

// Or, you can use the `Promise` API.
dropCourse(dropCourseVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_delete);
});
```

### Using `DropCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, dropCourseRef, DropCourseVariables } from '@dataconnect/generated';

// The `DropCourse` mutation requires an argument of type `DropCourseVariables`:
const dropCourseVars: DropCourseVariables = {
  id: ..., 
};

// Call the `dropCourseRef()` function to get a reference to the mutation.
const ref = dropCourseRef(dropCourseVars);
// Variables can be defined inline as well.
const ref = dropCourseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = dropCourseRef(dataConnect, dropCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_delete);
});
```

## RecordAttendance
You can execute the `RecordAttendance` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordAttendance(vars: RecordAttendanceVariables): MutationPromise<RecordAttendanceData, RecordAttendanceVariables>;

interface RecordAttendanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordAttendanceVariables): MutationRef<RecordAttendanceData, RecordAttendanceVariables>;
}
export const recordAttendanceRef: RecordAttendanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordAttendance(dc: DataConnect, vars: RecordAttendanceVariables): MutationPromise<RecordAttendanceData, RecordAttendanceVariables>;

interface RecordAttendanceRef {
  ...
  (dc: DataConnect, vars: RecordAttendanceVariables): MutationRef<RecordAttendanceData, RecordAttendanceVariables>;
}
export const recordAttendanceRef: RecordAttendanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordAttendanceRef:
```typescript
const name = recordAttendanceRef.operationName;
console.log(name);
```

### Variables
The `RecordAttendance` mutation requires an argument of type `RecordAttendanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordAttendanceVariables {
  studentId: UUIDString;
  courseId: UUIDString;
  date: DateString;
}
```
### Return Type
Recall that executing the `RecordAttendance` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordAttendanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordAttendanceData {
  attendance_insert: Attendance_Key;
}
```
### Using `RecordAttendance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordAttendance, RecordAttendanceVariables } from '@dataconnect/generated';

// The `RecordAttendance` mutation requires an argument of type `RecordAttendanceVariables`:
const recordAttendanceVars: RecordAttendanceVariables = {
  studentId: ..., 
  courseId: ..., 
  date: ..., 
};

// Call the `recordAttendance()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordAttendance(recordAttendanceVars);
// Variables can be defined inline as well.
const { data } = await recordAttendance({ studentId: ..., courseId: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordAttendance(dataConnect, recordAttendanceVars);

console.log(data.attendance_insert);

// Or, you can use the `Promise` API.
recordAttendance(recordAttendanceVars).then((response) => {
  const data = response.data;
  console.log(data.attendance_insert);
});
```

### Using `RecordAttendance`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordAttendanceRef, RecordAttendanceVariables } from '@dataconnect/generated';

// The `RecordAttendance` mutation requires an argument of type `RecordAttendanceVariables`:
const recordAttendanceVars: RecordAttendanceVariables = {
  studentId: ..., 
  courseId: ..., 
  date: ..., 
};

// Call the `recordAttendanceRef()` function to get a reference to the mutation.
const ref = recordAttendanceRef(recordAttendanceVars);
// Variables can be defined inline as well.
const ref = recordAttendanceRef({ studentId: ..., courseId: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordAttendanceRef(dataConnect, recordAttendanceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attendance_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attendance_insert);
});
```

## UpdateAttendance
You can execute the `UpdateAttendance` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAttendance(vars: UpdateAttendanceVariables): MutationPromise<UpdateAttendanceData, UpdateAttendanceVariables>;

interface UpdateAttendanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAttendanceVariables): MutationRef<UpdateAttendanceData, UpdateAttendanceVariables>;
}
export const updateAttendanceRef: UpdateAttendanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAttendance(dc: DataConnect, vars: UpdateAttendanceVariables): MutationPromise<UpdateAttendanceData, UpdateAttendanceVariables>;

interface UpdateAttendanceRef {
  ...
  (dc: DataConnect, vars: UpdateAttendanceVariables): MutationRef<UpdateAttendanceData, UpdateAttendanceVariables>;
}
export const updateAttendanceRef: UpdateAttendanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAttendanceRef:
```typescript
const name = updateAttendanceRef.operationName;
console.log(name);
```

### Variables
The `UpdateAttendance` mutation requires an argument of type `UpdateAttendanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAttendanceVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateAttendance` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAttendanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAttendanceData {
  attendance_update?: Attendance_Key | null;
}
```
### Using `UpdateAttendance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAttendance, UpdateAttendanceVariables } from '@dataconnect/generated';

// The `UpdateAttendance` mutation requires an argument of type `UpdateAttendanceVariables`:
const updateAttendanceVars: UpdateAttendanceVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAttendance()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAttendance(updateAttendanceVars);
// Variables can be defined inline as well.
const { data } = await updateAttendance({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAttendance(dataConnect, updateAttendanceVars);

console.log(data.attendance_update);

// Or, you can use the `Promise` API.
updateAttendance(updateAttendanceVars).then((response) => {
  const data = response.data;
  console.log(data.attendance_update);
});
```

### Using `UpdateAttendance`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAttendanceRef, UpdateAttendanceVariables } from '@dataconnect/generated';

// The `UpdateAttendance` mutation requires an argument of type `UpdateAttendanceVariables`:
const updateAttendanceVars: UpdateAttendanceVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAttendanceRef()` function to get a reference to the mutation.
const ref = updateAttendanceRef(updateAttendanceVars);
// Variables can be defined inline as well.
const ref = updateAttendanceRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAttendanceRef(dataConnect, updateAttendanceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attendance_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attendance_update);
});
```

## DeleteAttendanceRecord
You can execute the `DeleteAttendanceRecord` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAttendanceRecord(vars: DeleteAttendanceRecordVariables): MutationPromise<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;

interface DeleteAttendanceRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAttendanceRecordVariables): MutationRef<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;
}
export const deleteAttendanceRecordRef: DeleteAttendanceRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAttendanceRecord(dc: DataConnect, vars: DeleteAttendanceRecordVariables): MutationPromise<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;

interface DeleteAttendanceRecordRef {
  ...
  (dc: DataConnect, vars: DeleteAttendanceRecordVariables): MutationRef<DeleteAttendanceRecordData, DeleteAttendanceRecordVariables>;
}
export const deleteAttendanceRecordRef: DeleteAttendanceRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAttendanceRecordRef:
```typescript
const name = deleteAttendanceRecordRef.operationName;
console.log(name);
```

### Variables
The `DeleteAttendanceRecord` mutation requires an argument of type `DeleteAttendanceRecordVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAttendanceRecordVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAttendanceRecord` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAttendanceRecordData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAttendanceRecordData {
  attendance_delete?: Attendance_Key | null;
}
```
### Using `DeleteAttendanceRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAttendanceRecord, DeleteAttendanceRecordVariables } from '@dataconnect/generated';

// The `DeleteAttendanceRecord` mutation requires an argument of type `DeleteAttendanceRecordVariables`:
const deleteAttendanceRecordVars: DeleteAttendanceRecordVariables = {
  id: ..., 
};

// Call the `deleteAttendanceRecord()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAttendanceRecord(deleteAttendanceRecordVars);
// Variables can be defined inline as well.
const { data } = await deleteAttendanceRecord({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAttendanceRecord(dataConnect, deleteAttendanceRecordVars);

console.log(data.attendance_delete);

// Or, you can use the `Promise` API.
deleteAttendanceRecord(deleteAttendanceRecordVars).then((response) => {
  const data = response.data;
  console.log(data.attendance_delete);
});
```

### Using `DeleteAttendanceRecord`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAttendanceRecordRef, DeleteAttendanceRecordVariables } from '@dataconnect/generated';

// The `DeleteAttendanceRecord` mutation requires an argument of type `DeleteAttendanceRecordVariables`:
const deleteAttendanceRecordVars: DeleteAttendanceRecordVariables = {
  id: ..., 
};

// Call the `deleteAttendanceRecordRef()` function to get a reference to the mutation.
const ref = deleteAttendanceRecordRef(deleteAttendanceRecordVars);
// Variables can be defined inline as well.
const ref = deleteAttendanceRecordRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAttendanceRecordRef(dataConnect, deleteAttendanceRecordVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attendance_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attendance_delete);
});
```


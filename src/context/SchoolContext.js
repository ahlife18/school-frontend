import { createContext, useContext, useState } from 'react';

const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  const [schoolId, setSchoolId] = useState('');

  return (
    <SchoolContext.Provider value={{ schoolId, setSchoolId }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  return useContext(SchoolContext);
}
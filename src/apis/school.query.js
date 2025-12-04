import { createQuery } from "../lib/createQuery";

export const useSchoolList = () => createQuery("schools", "/api/school");

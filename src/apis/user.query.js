import { createQuery } from "../lib/createQuery";

export const useUser = (forUser = "user") => {
  const url =
    forUser === "subAdmin"
      ? "/api/subadmin/profile"
      : forUser === "superAdmin"
      ? "/api/root/profile"
      : "/api/alumni/profile";

  return createQuery(["user", forUser], url);
};

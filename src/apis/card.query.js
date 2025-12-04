import { createQuery } from "../lib/createQuery";

export const useCard = () => createQuery("card", "/api/alumni/profile/card");

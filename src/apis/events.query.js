import { createQuery } from "../lib/createQuery";

export const useEvents = () => createQuery("events", "/api/events");

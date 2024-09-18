import { atom } from "jotai";

export const sorttypeAtom = atom({ label: "Due Date", value: 1 });
export const showtypeAtom = atom({ label: "Not started", value: 1 });
export const openAddTodoPanelAtom = atom(false);
export const loginstatusAtom = atom(false);
export const refreshDataAtom = atom(false);
export const todolistDataAtom = atom([]);
export const newIdAtom = atom("");
export const newTitleAtom = atom("");
export const newDescAtom = atom("");
export const newDueAtom = atom([]);
export const newPrioAtom = atom("");
export const newStatusAtom = atom("");
export const newOwnersAtom = atom("");
export const usernameAtom = atom("");
export const passwordAtom = atom("");
export const addedittypeAtom = atom("add");

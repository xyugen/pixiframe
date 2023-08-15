import { writable, type Writable } from "svelte/store";

export const droppedFiles: Writable<File[]> = writable([]);
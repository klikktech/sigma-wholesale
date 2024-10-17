export interface INavbarMenuItem {
    label: string
    path: string
} 
export type Message =
  | { success: string }
  | { error: string }
  | { message: string };
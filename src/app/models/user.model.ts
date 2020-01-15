import { Employee } from "./employee.model";

export interface User {
  token: string;
  user: Employee;
}

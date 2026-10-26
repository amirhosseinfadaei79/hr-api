import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "./entities/department-entity.js";
import { DepartmentsManagerController } from "./controllers/departments-manager.controller.js";
import { DepartmentsManagerService } from "./services/departments-manager.service.js";
import { DepartmentsEmployeeController } from "./controllers/departments-employee.controller.js";
import { DepartmentsEmployeeService } from "./services/departments-employee.service.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Department])
    ],
    controllers: [DepartmentsManagerController, DepartmentsEmployeeController],
    providers: [DepartmentsManagerService, DepartmentsEmployeeService]
})


export class DepartmentModule { }
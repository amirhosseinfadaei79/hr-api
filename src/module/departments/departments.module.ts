import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "./entities/department-entity.js";
import { DepartmentsManagerController } from "./controllers/departments-manager.controller.js";
import { DepartmentsManagerService } from "./services/departments-manager.service.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Department])
    ],
    controllers: [DepartmentsManagerController],
    providers: [DepartmentsManagerService]
})


export class DepartmentModule { }
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { userInfo } from 'os';

@Injectable()
export class TasksService {
    /**
     *
     */
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
//     private tasks:Task[] = [];
async getTasks(filterDto:GetTaskFilterDto,
    user:User
    ):Promise<Task[]>{
return await this.taskRepository.getTasks(filterDto,user);
}

//     getAllTasks():Task[]{
//         return this.tasks;
//     }

//     getTaskWithFilters(filterDto : GetTaskFilterDto):Task[]{
// const {status, search} = filterDto;
// console.log(status);
// console.log(search);
// let tasks = this.getAllTasks();
// if(status){
//     tasks = tasks.filter(task=> task.status === status);
// }
// if(search){
//     tasks = tasks.filter(task=>
//         task.title.includes(search) ||
//         task.description.includes(search),
//     );
// }
//         return tasks;
//     }

async getTaskById(id:number,user:User) : Promise<Task>{
    const found = await this.taskRepository.findOne({where:{id, userId: user.id}});
    if(!found){
        throw new NotFoundException(`Task with ID "${id}" not found`);
            }
            return found;
}

//     getTaskById(id:string):Task{
//         const found = this.tasks.find(task=>task.id === id);
//     if(!found){
// throw new NotFoundException(`Task with ID "${id}" not found`);
//     }
//     return found;
//     }
async createTask(createTaskDto:CreateTaskDto,user:User) :Promise<Task> {
    return this.taskRepository.createTask(createTaskDto,user);
}

        async deleteTask(
            id:number,
            user:User
            ):Promise<void>{
            const result = await this.taskRepository.delete({id, userId: user.id});
            if(!result.affected){
                throw new NotFoundException(`Task with ID "${id}" not found`);
            }
        }

        async updateTaskStatus(
            id:number,
            status:TaskStatus,
            user:User
            ):Promise<Task>{
            const task = await this.getTaskById(id,user);
            task.status = status;
            task.save();
            return task;        
        }
//     createTask(createTaskDto: CreateTaskDto):Task{
//         const {title, description} = createTaskDto;
//         const task :Task= {
//             id: uuidv1(),
//             title,
//             description,
//             status:TaskStatus.OPEN
//         };
//         this.tasks.push(task);
//         return task;
//     }

//     deleteTask(id:string):void{
//         const found = this.getTaskById(id);
//         this.tasks = this.tasks.filter(task=>task.id != id);
//     }

//     updateTaskStatus(id:string, status: TaskStatus):Task{
//         this.tasks.map(task=>
//             {
//                 if(task.id === id){
//                     task.status = status;
//                 }
//             });
//             return this.tasks.find(task=>task.id === id);
//     }
}

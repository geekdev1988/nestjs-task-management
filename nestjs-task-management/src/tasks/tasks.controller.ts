import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    /**
     *
     */
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto):Promise<Task[]>{
        return this.taskService.getTasks(filterDto);
    }
    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number):Promise<Task>{
        return this.taskService.getTaskById(id);
    }

// //     @Post()
// //     createTask(@Body() body){
// // console.log(body);
// //     }
// // @Post()
// //     createTask(
// //     @Body('title') title:string, 
// //     @Body('description') description:string){
// // return this.taskService.createTask(title,description);
// //     }
@Post()
@UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task>{
return this.taskService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id:number):Promise<void>{
        return this.taskService.deleteTask(id);
    }
//     @Delete('/:id')
//     deleteTask(@Param('id') id:string):void{
//         this.taskService.deleteTask(id);
//     }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id:number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus):Promise<Task>{
        return this.taskService.updateTaskStatus(id,status);
    }
// }
}
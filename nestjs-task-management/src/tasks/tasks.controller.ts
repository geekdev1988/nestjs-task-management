import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    /**
     *
     */
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto):Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskWithFilters(filterDto);
        }else {
            return this.taskService.getAllTasks();
        }    
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string):Task{
        return this.taskService.getTaskById(id);
    }

//     @Post()
//     createTask(@Body() body){
// console.log(body);
//     }
// @Post()
//     createTask(
//     @Body('title') title:string, 
//     @Body('description') description:string){
// return this.taskService.createTask(title,description);
//     }
@Post()
@UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto):Task{
return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string):void{
        this.taskService.deleteTask(id);
    }

    @Patch('/:id')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus):Task{
        return this.taskService.updateTaskStatus(id,status);
    }
}

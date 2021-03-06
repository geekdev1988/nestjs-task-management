import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user-decorator';
import { userInfo } from 'os';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');
    /**
     *
     */
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user: User,
        ):Promise<Task[]>{
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto) }`);
        return this.taskService.getTasks(filterDto,user);
    }
    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number,
    @GetUser() user:User,
    ):Promise<Task>{
        return this.taskService.getTaskById(id,user);
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
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user:User
        ):Promise<Task>{
            this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(createTaskDto,user);
    }
    @Delete('/:id')
    deleteTask(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User
        ):Promise<void>{
        return this.taskService.deleteTask(id,user);
    }
//     @Delete('/:id')
//     deleteTask(@Param('id') id:string):void{
//         this.taskService.deleteTask(id);
//     }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id:number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user:User
        ):Promise<Task>{
        return this.taskService.updateTaskStatus(id,status,user);
    }
// }
}
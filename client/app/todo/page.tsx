"use client";

import CreateTaskForm from "./@form/create";
import TaskBoard from "./@board/board";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types/task";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const onCreated = (task: Task)=>{
        setTasks(prev => [...prev, task]);
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="md:col-span-1 col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Todo</CardTitle>
                        <CardDescription>
                            Type and save your task
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateTaskForm onSubmit={onCreated}/>
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-1 col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Todo List</CardTitle>
                        <CardDescription>Manage your tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TaskBoard tasks={tasks}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

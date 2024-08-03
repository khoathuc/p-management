import { Task } from "@/types/task";

export default function TaskBoard({tasks}:{tasks: Task[]}) {
    return (
        <div>
            {tasks.map((task) => {
                return <div className="flex mb-2 justify-between" key={task.id}>
                    <div>
                        <p>{task.name}</p>
                    </div>
                </div>;
            })}
        </div>
    );
}

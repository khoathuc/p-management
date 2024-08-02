import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/task";
import { useForm } from "react-hook-form";
import z from 'zod';

const formSchema = z.object({
    name: z.string()
})

export default function CreateTaskForm({
    onSubmit,
}: {
    onSubmit: (task: Task) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => {
                    const task = {
                        id: Math.random(),
                        name: values.name || "",
                    };
                    
                    onSubmit(task);
                })}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter task's name"
                                        {...field}
                                    ></Input>
                                </FormControl>
                            </FormItem>
                        );
                    }}
                />
                <Button size="sm" type="submit">
                    Add
                </Button>
            </form>
        </Form>
    );
}

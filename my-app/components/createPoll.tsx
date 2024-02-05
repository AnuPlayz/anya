"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    image: z.string(),
    title: z.string(),
    description: z.string(),
    startsAt: z.string(),
    endsAt: z.string(),
})

export default function CreatePoll() {
    const { contract } = useContract("0xa777a9517C0761203C835974c494FA3f169fe441");
    const { mutateAsync: createPoll, isLoading } = useContractWrite(contract, "createPoll");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: "",
            title: "",
            description: "",
            startsAt: "",
            endsAt: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const pollval = await createPoll({
            args: [
                values.image,
                values.title,
                values.description,
                values.startsAt,
                values.endsAt,
            ],
        });
        console.log(pollval);
        console.log(values);
    }

    return (
        <div className="flex flex-col justify-center items-center p-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="image url" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title of the poll" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="description of the poll" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startsAt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Starts At</FormLabel>
                                <FormControl>
                                    <Input placeholder="starting date of the poll" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endsAt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ends At</FormLabel>
                                <FormControl>
                                    <Input placeholder="ending date of the poll" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col items-center p-5">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

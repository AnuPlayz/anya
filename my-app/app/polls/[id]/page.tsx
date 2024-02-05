"use client"
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Component() {
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const id = 1;
    const { data, isLoading } = useContractRead(contract, "getPoll", [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <>
            <div className="grid md:grid-flow-col md:auto-cols-max auto-rows-auto gap-5 p-3">
                {data.map((poll: any) => (
                    <Card className="w-[350px]">
                        <CardHeader className="text-center">
                            <CardTitle>{poll.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <img src={poll.image} alt={poll.title} />
                            <CardDescription >{poll.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex flex-row justify-center items-center">
                            <p>Starts at: {poll.startsAt}</p>
                            <p>Ends at: {poll.endsAt}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}


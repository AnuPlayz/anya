"use client"
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function Component() {
    const { contract } = useContract("0xa777a9517C0761203C835974c494FA3f169fe441");
    const { data, isLoading } = useContractRead(contract, "getPolls", []);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <>
        
            <div className="grid grid-cols-3 gap-5 p-3">
                {data.map((poll: any) => (
                    <Card className="w-[350px]">
                        <CardHeader className="text-center">
                            <CardTitle>{poll.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <img src={poll.image} alt={poll.title} />
                            <CardDescription >{poll.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 text-center">
                            <p>Starts at: {poll.startsAt.toString()}</p>
                            <p>Ends at: {poll.endsAt.toString()}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}
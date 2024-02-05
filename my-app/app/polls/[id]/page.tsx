"use client"
import { useContract, useContractRead, Web3Button, useAddress } from "@thirdweb-dev/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import Contest from "@/components/contest";

export default function Component() {
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");

    const cid = useAddress();
    const id = useParams().id;
    const { data, isLoading } = useContractRead(contract, "getPoll", [id]);
    console.log(data);
    const { data: contestants } = useContractRead(contract, "getContestants", [id]);
    const { data: contestant } = useContractRead(contract, "getContestant", [id, cid]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start p-10">
                <Card className="w-[350px]">
                    <CardHeader className="text-center">
                        <CardTitle>{data.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <img src={data.image} alt={data.title} />
                        <CardDescription >{data.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center items-center">
                        <p>Starts at: {data.startsAt.toString()}</p>
                        <p>Ends at: {data.endsAt.toString()}</p>
                    </CardFooter>
                </Card>
                <div className="p-10">
                    <Contest />
                </div>
                <h2 className="mb-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Current Contestants :
                </h2>
                <div className="grid md:grid-flow-col md:auto-cols-max auto-rows-auto">
                    {contestants.map((contestant: any) => (
                        <Card key={contestant.cid} className="w-[350px]">
                            <CardHeader className="text-center">
                                <CardTitle>{contestant.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <img src={contestant.image} alt={contestant.name} />
                                <div className="m-3">
                                    <Web3Button
                                        contractAddress="0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984"
                                        action={(contract) => {
                                            contract.call("vote", [id, cid])
                                        }}
                                    >
                                        Vote
                                    </Web3Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}


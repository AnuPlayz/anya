"use client"
import { SkeletonCard } from "@/components/skeletonPolls";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "recharts";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


export default function Result() {
    const { id } = useParams();
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const { data, isLoading } = useContractRead(contract, "getContestants", [id]);
    console.log(data);

    if (isLoading) {
        return <SkeletonCard />;
    }
    return (
        <>
            <div className="flex flex-row justify-center items-center pt-10">
                <h2 className="mb-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                    Results
                </h2>
            </div>
            <div className="grid md:grid-flow-col md:auto-cols-max auto-rows-auto gap-10 p-3">
                {data.map((item: any, index: number) => (
                    <div key={index}>
                        <Card className="w-[550px]">
                            <CardHeader>
                                <div className="flex flex-row justify-center items-center">
                                    <CardTitle>Contestant #{parseInt(item.id._hex)}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-row justify-center items-center">
                                    <img src={item[1]} alt={item[2]} width={200} />
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="px-10">Username : {item[2]}</p>
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button variant="link" className="text-slate-600">@address</Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="flex justify-between space-x-4">
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-semibold">Address of the contestant</h4>
                                                        <p className="text-sm">
                                                            {item[3]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p className="text-purple-300">Number of Votes : {parseInt(item[4]._hex)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div >
        </>
    )
}
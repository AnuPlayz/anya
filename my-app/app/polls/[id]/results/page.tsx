"use client"
import { Overview } from "@/components/overview";
import { Card } from "@/components/ui/card";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";


export default function Votes() {
    const id = useParams().id;
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const { data, isLoading } = useContractRead(contract, "getContestants", [id]);
    console.log(data);
    return (
        <div>
            <Card>
                <Overview />
            </Card>
        </div>
    )
}
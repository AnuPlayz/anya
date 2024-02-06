"use client"
import { Overview } from "@/components/overview";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";


export default function Votes() {
    const id = useParams().id;
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const { data, isLoading } = useContractRead(contract, "getPoll", [id]);

    const contestantVotes = data[10].map((contestant: any) => {
        const cid = useAddress();
        const { data: votes } = useContractRead(contract, "getContestant", [id, cid]);
        console.log(votes);
    });

    return (
        <div>
            <Overview />
        </div>
    )
}
"use client"
import { useEffect, useState } from 'react';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from 'next/navigation';

export default function Component() {
const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
const id = useParams().id;
const { data: contestantsData, isLoading: contestantsLoading } = useContractRead(contract, "getContestants", [id]);
const [contestantVotes, setContestantVotes] = useState<any[]>([]); // Specify the type as any[]

useEffect(() => {
    if (!contestantsLoading && contestantsData) {
        contestantsData.forEach((contestant: any[]) => {
            const { data: contestantData, isLoading: contestantLoading } = useContractRead(contract, "getContestant", [id, contestant[3]]);
            if (!contestantLoading && contestantData) {
                setContestantVotes(prevVotes => [...prevVotes, contestantData]);
            }
        });
    }
}, [contestantsLoading, contestantsData]);

  // Now, `contestantVotes` should contain the vote data for each contestant
}
"use client"
import { SkeletonCard } from "@/components/skeletonPolls";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";

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
            <h1>Results</h1>
            <div>
                {data.map((item: any, index: number) => (
                    <div key={index}>
                        <img src={item[1]} alt={item[2]} />
                        <p>{item[2]}</p>
                        <p>{item[3]}</p>
                        <p>Number of Votes: {parseInt(item[4]._hex)}</p>
                    </div>
                ))}
            </div >
        </>
    )
}
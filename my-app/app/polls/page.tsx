"use client"
import { useContract, useContractRead } from "@thirdweb-dev/react";

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
        <div>
            {data.map((poll: any) => (
                <div key={poll.id}>
                    <img src={poll.image} alt={poll.title} />
                    <h2>{poll.title}</h2>
                    <p>{poll.description}</p>
                    <p>Starts at: {poll.startsAt.toString()}</p>
                    <p>Ends at: {poll.endsAt.toString()}</p>
                </div>
            ))}
        </div>
    );
}
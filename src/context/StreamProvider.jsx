import { Cluster, StreamClient } from "@streamflow/stream";
import React, { createContext, useContext } from "react";

const SOLANA_DEVNET_RPC = "https://api.devnet.solana.com";

const StreamContext = createContext();

export function useStreamClient() {
	return useContext(StreamContext);
}

const StreamProvider = ({ children }) => {
	const streamClient = new StreamClient(
		SOLANA_DEVNET_RPC,
		Cluster.Devnet,
		"confirmed"
	);

	return (
		<StreamContext.Provider value={streamClient}>
			{children}
		</StreamContext.Provider>
	);
};

export default StreamProvider;

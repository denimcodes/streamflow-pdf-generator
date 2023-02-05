import { PublicKey } from "@solana/web3.js";
import { StreamDirection, StreamType } from "@streamflow/stream";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStreamClient } from "../context/StreamProvider";

const StreamDetail = ({ wallet }) => {
	const [streams, setStreams] = useState();

	const streamClient = useStreamClient();
	const navigate = useNavigate();

	useEffect(() => {
		getStreamsByWallet()
			.then((streams) => {
				console.log(streams);
				setStreams(streams);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	function getStreamsByWallet() {
		return streamClient.get({
			wallet: new PublicKey(wallet),
			type: StreamType.All,
			direction: StreamDirection.All,
		});
	}

	function handleStreamClick(e, streamId) {
		console.log("Stream ID:", streamId);
		navigate(`/generate/stream/${streamId}`);
	}

	return (
		<div className="container mx-auto max-w-6xl">
			<h2 className="text-center font-semibold text-2xl">
				Select stream to generate PDF
			</h2>
			<div className="overflow-x-auto mt-8">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Stream Id</th>
							<th>Name</th>
							<th>Stream Type</th>
							<th>Stream Direction</th>
						</tr>
					</thead>
					<tbody>
						{streams &&
							streams.map((stream) => {
								const streamId = stream[0];
								const streamDetail = stream[1];

								return (
									<tr
										onClick={(e) => handleStreamClick(e, streamId)}
										className="hover"
										key={streamId}
									>
										<td>{`${streamId.slice(0, 6)}...${streamId.slice(-6)}`}</td>
										<td>{streamDetail.name}</td>
										<td>All</td>
										<td>All</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StreamDetail;

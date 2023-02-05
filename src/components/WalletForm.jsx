import { PublicKey } from "@solana/web3.js";
import { StreamDirection, StreamType } from "@streamflow/stream";
import { Button, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStreamClient } from "../context/StreamProvider";

const WalletForm = () => {
	const [wallet, setWallet] = useState("");

	const [loading, setLoading] = useState();

	const streamClient = useStreamClient();
	const navigate = useNavigate();

	function getStreamsByWallet() {
		return streamClient.get({
			wallet: new PublicKey(wallet),
			type: StreamType.All,
			direction: StreamDirection.All,
		});
	}

	async function handleSubmitForm(e) {
		e.preventDefault();

		setLoading(true);
		const streams = await getStreamsByWallet();
		if (streams) {
			navigate(`/wallet/${wallet}`);
		} else {
			// TODO: show error message
		}
		setLoading(false);
	}

	return (
		<div className="w-96">
			<form onSubmit={handleSubmitForm} className="form-control">
				<div>
					<TextInput
						type="text"
						name="wallet"
						id="wallet"
						placeholder="Enter wallet address"
						onChange={(e) => setWallet(e.target.value)}
						required={true}
					/>
				</div>
				<Button type="submit" className="mt-4">
					{loading && (
						<div className="mr-3">
							<Spinner size="sm" light={true} />
						</div>
					)}
					{loading ? "Loading..." : "Next"}
				</Button>
			</form>
		</div>
	);
};

export default WalletForm;

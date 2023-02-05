import React from "react";
import { useParams } from "react-router-dom";
import StreamDetail from "../components/StreamDetail";

const StreamPage = () => {
	const { address } = useParams();

	return (
		<div>
			<section className="grid place-content-center min-h-screen">
				<StreamDetail wallet={address} />
			</section>
		</div>
	);
};

export default StreamPage;

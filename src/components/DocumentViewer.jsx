import { Viewer } from "@pdfme/ui";
import React, { useEffect, useRef } from "react";
import { useStreamClient } from "../context/StreamProvider";
import { docTemplate } from "../template";

const DocumentViewer = ({ streamId, streamStatus, streamDirection }) => {
	const streamClient = useStreamClient();

	const docViewerRef = useRef();
	const viewerRef = useRef();

	useEffect(() => {
		let viewerRef;

		getStream()
			.then((stream) => {
				console.log(stream);

				const inputs = [
					{
						name: stream.name,
						"total amount": `${stream.depositedAmount}`,
						"release frequency": "Daily",
						"sender wallet": stream.sender,
						"recipient wallet": stream.recipient,
						"start date": `${stream.start}`,
						"end date": `${stream.end}`,
						"stream status": "Active",
						"stream direction": "Incoming",
						"automatic withdrawal": `${
							stream.automaticWithdrawal ? "Yes" : "No"
						}`,
					},
				];

				viewerRef = new Viewer({
					domContainer: docViewerRef.current,
					template: docTemplate,
					inputs,
				});
			})
			.catch(console.error);

		return () => {
			if (viewerRef && viewerRef.current) {
				viewerRef.current.destroy();
			}
		};
	}, [viewerRef]);

	function getStream() {
		return streamClient.getOne(streamId);
	}

	return <div ref={docViewerRef}></div>;
};

export default DocumentViewer;

import { generate } from "@pdfme/generator";
import React from "react";
import { useParams } from "react-router-dom";
import DocumentViewer from "../components/DocumentViewer";
import { useStreamClient } from "../context/StreamProvider";
import { docTemplate } from "../template";

const GenerateDocumentPage = () => {
	const { streamId } = useParams();
	const streamClient = useStreamClient();

	function getStream() {
		return streamClient.getOne(streamId);
	}

	function downloadDocument() {
		console.log("Downloading document...");

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

				generate({ template: docTemplate, inputs }).then((pdf) => {
					console.log(pdf);
					const blob = new Blob([pdf.buffer], { type: "application/pdf" });
					window.open(URL.createObjectURL(blob));
				});
			})
			.catch(console.error);
	}

	return (
		<div>
			<section className="grid place-items-center">
				<DocumentViewer streamId={streamId} />
			</section>
		</div>
	);
};

export default GenerateDocumentPage;

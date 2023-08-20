interface ErrorPageFormat {
	error: string;
}

function ErrorPage(errorCode: ErrorPageFormat) {
	return (
		<div className="error-page">
			<h1>Something went wrong...</h1>
			<h2 className="error-code">Error: {errorCode.error}</h2>
		</div>
	);
}

export default ErrorPage;
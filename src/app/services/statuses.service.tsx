export async function getStatuses() {
	const response = await fetch('http://localhost:3000');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const result = response.text();

	return result;
}

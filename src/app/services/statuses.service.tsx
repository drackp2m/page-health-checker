export async function getStatuses() {
	try {
		const response = await fetch('https://localhost:3300/stats');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = response.text();

		return result;
	} catch (e) {
		return null;
	}
}

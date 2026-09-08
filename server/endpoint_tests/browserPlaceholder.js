fetch("http://localhost:5000/api/v1/auth/sessions", {
	method: "GET",
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YThkZGVlMzRjNjhhYzc0NWZkZTk3ZGMiLCJlbWFpbCI6ImRlc2lnbnNvbHV0aW9uczE2MjlAZ21haWwuY29tIiwic2lkIjoiNmE5ZjlmZmEwNGM5NGExNDc3YmYyOWY3IiwiaWF0IjoxNzg4ODQ2MDc1LCJleHAiOjE3ODg5MzI0NzUsImF1ZCI6InRhc3NpYXFjYS1jbGllbnQiLCJpc3MiOiJ0YXNzaWFxY2EifQ.TFqR068VMXRV4UACf9XXYVPYM8HVQwwY_Yci5exY95Q",
		"Content-Type": "application/json",
	},
})
	.then((res) => {
		console.log("Status:", res.status);
		return res.json();
	})
	.then((data) => console.log("Response:", data))
	.catch((err) => console.error("Error:", err));

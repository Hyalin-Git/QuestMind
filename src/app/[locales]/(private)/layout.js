import "@/styles/globals.css";

export default function PrivateLayout({ children }) {
	return (
		<html lang="fr">
			<head>
				<meta name="robots" content="noindex, nofollow" />
			</head>
			<body>{children}</body>
		</html>
	);
}

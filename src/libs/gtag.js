// lib/gtag.js
export const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Remplacez par votre propre ID

// Enregistrement d'une page vue
export const pageview = (url) => {
	window.gtag("config", GA_TRACKING_ID, {
		page_path: url,
	});
};

// Enregistrement des événements personnalisés
export const event = ({ action, category, label, value }) => {
	window.gtag("event", action, {
		event_category: category,
		event_label: label,
		value,
	});
};

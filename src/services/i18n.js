/**
 * Converts a date string into the locale-specific date
 * @param {String} timestamp represented as a String
 */
export function date(timestamp) {
	return new Date(timestamp).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
}
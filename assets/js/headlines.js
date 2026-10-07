const HEADLINE_COUNT = 2;
const HEADLINE_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatHeadlineDate(iso) {
	const parts = iso.split("-");
	return parts[2] + " " + HEADLINE_MONTHS[parseInt(parts[1], 10) - 1] + " " + parts[0];
}

document.addEventListener("DOMContentLoaded", function() {
	if (typeof POSTS === "undefined" || !POSTS.length) {
		return;
	}
	const section = document.getElementById("newsHeadlines");
	const list = document.getElementById("newsHeadlinesList");

	POSTS.slice(0, HEADLINE_COUNT).forEach(function(post) {
		const item = document.createElement("li");
		const link = document.createElement("a");
		link.href = "news/index.html";
		link.className = "news-headline";

		const date = document.createElement("span");
		date.className = "news-headline-date";
		date.textContent = formatHeadlineDate(post.date);

		const title = document.createElement("span");
		title.className = "news-headline-title";
		title.textContent = post.title;

		link.appendChild(date);
		link.appendChild(title);
		item.appendChild(link);
		list.appendChild(item);
	});

	section.hidden = false;
});

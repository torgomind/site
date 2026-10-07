const POSTS_PER_PAGE = 5;
const MEDIA_DIR = "media/";
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatDate(iso) {
	const parts = iso.split("-");
	return parts[2] + " " + MONTHS[parseInt(parts[1], 10) - 1] + " " + parts[0];
}

function currentPage(totalPages) {
	const raw = parseInt(new URLSearchParams(window.location.search).get("page"), 10);
	if (isNaN(raw) || raw < 1) {
		return 1;
	}
	return Math.min(raw, totalPages);
}

function makeThumb(item) {
	const img = document.createElement("img");
	img.src = MEDIA_DIR + item.src;
	img.alt = item.alt || "";
	img.loading = "lazy";
	img.className = "news-thumb";
	img.addEventListener("click", function() {
		openOverlay(img.src, img.alt);
	});
	return img;
}

function makeVideo(item, isLoop) {
	const video = document.createElement("video");
	video.src = MEDIA_DIR + item.src;
	video.playsInline = true;
	video.setAttribute("playsinline", "");
	video.className = "news-video";
	if (isLoop) {
		video.muted = true;
		video.setAttribute("muted", "");
		video.autoplay = true;
		video.loop = true;
	} else {
		video.controls = true;
		video.preload = "metadata";
	}
	return video;
}

function makeYoutube(item) {
	const wrap = document.createElement("div");
	wrap.className = "video-container news-youtube";
	const frame = document.createElement("iframe");
	frame.src = "https://www.youtube.com/embed/" + encodeURIComponent(item.id);
	frame.title = "YouTube video";
	frame.loading = "lazy";
	frame.allowFullscreen = true;
	frame.referrerPolicy = "strict-origin-when-cross-origin";
	frame.setAttribute("allow", "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen");
	wrap.appendChild(frame);
	return wrap;
}

function renderMedia(list) {
	const container = document.createElement("div");
	container.className = "news-media";
	let thumbRow = null;
	list.forEach(function(item) {
		if (item.type === "img") {
			if (!thumbRow) {
				thumbRow = document.createElement("div");
				thumbRow.className = "news-thumbs";
				container.appendChild(thumbRow);
			}
			thumbRow.appendChild(makeThumb(item));
			return;
		}
		thumbRow = null;
		if (item.type === "loop") {
			container.appendChild(makeVideo(item, true));
		} else if (item.type === "video") {
			container.appendChild(makeVideo(item, false));
		} else if (item.type === "youtube") {
			container.appendChild(makeYoutube(item));
		}
	});
	return container;
}

function renderPost(post) {
	const article = document.createElement("article");
	article.className = "news-post";

	const date = document.createElement("div");
	date.className = "news-date";
	date.textContent = formatDate(post.date);

	const title = document.createElement("h2");
	title.className = "news-title";
	title.textContent = post.title;

	const body = document.createElement("div");
	body.className = "news-body";
	body.innerHTML = post.body;

	article.appendChild(date);
	article.appendChild(title);
	article.appendChild(body);

	if (post.media && post.media.length) {
		article.appendChild(renderMedia(post.media));
	}
	return article;
}

function makePageLink(page, label) {
	const link = document.createElement("a");
	link.href = page === 1 ? "index.html" : "index.html?page=" + page;
	link.className = "news-page-link";
	link.textContent = label;
	return link;
}

function renderPager(page, totalPages) {
	const pager = document.getElementById("newsPager");
	if (totalPages <= 1) {
		pager.remove();
		return;
	}
	if (page > 1) {
		pager.appendChild(makePageLink(page - 1, "« newer"));
	}
	for (let i = 1; i <= totalPages; i++) {
		if (i === page) {
			const current = document.createElement("span");
			current.className = "news-page-link news-page-current";
			current.textContent = i;
			pager.appendChild(current);
		} else {
			pager.appendChild(makePageLink(i, String(i)));
		}
	}
	if (page < totalPages) {
		pager.appendChild(makePageLink(page + 1, "older »"));
	}
}

function openOverlay(src, alt) {
	const overlay = document.getElementById("newsOverlay");
	const img = overlay.querySelector("img");
	img.src = src;
	img.alt = alt;
	overlay.classList.add("open");
	document.body.style.overflow = "hidden";
}

function closeOverlay() {
	const overlay = document.getElementById("newsOverlay");
	overlay.classList.remove("open");
	overlay.querySelector("img").removeAttribute("src");
	document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", function() {
	const list = document.getElementById("newsList");
	const totalPages = Math.max(1, Math.ceil(POSTS.length / POSTS_PER_PAGE));
	const page = currentPage(totalPages);
	const start = (page - 1) * POSTS_PER_PAGE;

	POSTS.slice(start, start + POSTS_PER_PAGE).forEach(function(post) {
		list.appendChild(renderPost(post));
	});

	if (!POSTS.length) {
		const empty = document.createElement("p");
		empty.className = "news-empty";
		empty.textContent = "no news yet.";
		list.appendChild(empty);
	}

	renderPager(page, totalPages);

	document.getElementById("newsOverlay").addEventListener("click", closeOverlay);
	document.addEventListener("keydown", function(event) {
		if (event.key === "Escape") {
			closeOverlay();
		}
	});
});

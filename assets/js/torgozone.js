(function() {
	const SITE_ROOT = new URL("../../", document.currentScript.src);
	const CHAT_URL = new URL("tools/chat/index.html", SITE_ROOT).href;
	const GIF_URL = new URL("tools/chat/slimegirl1.gif", SITE_ROOT).href;
	const CLOSED_KEY = "torgozone-closed";
	const SHOW_DELAY = 3000;
	const SMALL_SCREEN = 640;

	let teaser = null;
	let panel = null;

	function wasClosed() {
		try {
			return sessionStorage.getItem(CLOSED_KEY) === "1";
		} catch (e) {
			return false;
		}
	}

	function rememberClosed() {
		try {
			sessionStorage.setItem(CLOSED_KEY, "1");
		} catch (e) {
		}
	}

	function makeTitleBar(label, buttons) {
		const bar = document.createElement("div");
		bar.className = "tz-titlebar";
		const text = document.createElement("span");
		text.className = "tz-titlebar-text";
		text.textContent = label;
		bar.appendChild(text);
		const group = document.createElement("span");
		group.className = "tz-titlebar-buttons";
		buttons.forEach(function(button) {
			group.appendChild(button);
		});
		bar.appendChild(group);
		return bar;
	}

	function makeButton(label, title, onClick) {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "tz-button";
		button.textContent = label;
		button.title = title;
		button.setAttribute("aria-label", title);
		button.addEventListener("click", onClick);
		return button;
	}

	function buildTeaser() {
		teaser = document.createElement("div");
		teaser.className = "tz-window tz-teaser";
		teaser.setAttribute("role", "dialog");
		teaser.setAttribute("aria-label", "Enter the torgozone");

		const close = makeButton("×", "Close", function(event) {
			event.stopPropagation();
			rememberClosed();
			teaser.remove();
			teaser = null;
		});
		teaser.appendChild(makeTitleBar("torgozone.exe", [close]));

		const body = document.createElement("a");
		body.className = "tz-teaser-body";
		body.href = CHAT_URL;
		body.addEventListener("click", function(event) {
			if (window.innerWidth >= SMALL_SCREEN) {
				event.preventDefault();
				openPanel();
			}
		});

		const gif = document.createElement("img");
		gif.src = GIF_URL;
		gif.alt = "";
		gif.className = "tz-teaser-gif";
		body.appendChild(gif);

		const text = document.createElement("span");
		text.className = "tz-teaser-text";
		const headline = document.createElement("span");
		headline.className = "tz-teaser-headline";
		headline.textContent = "enter the torgozone";
		const sub = document.createElement("span");
		sub.className = "tz-teaser-sub";
		sub.textContent = "live chat now open";
		text.appendChild(headline);
		text.appendChild(sub);
		body.appendChild(text);

		teaser.appendChild(body);
		document.body.appendChild(teaser);
	}

	function openPanel() {
		if (teaser) {
			teaser.hidden = true;
		}
		if (panel) {
			panel.hidden = false;
			return;
		}
		panel = document.createElement("div");
		panel.className = "tz-window tz-panel";
		panel.setAttribute("role", "dialog");
		panel.setAttribute("aria-label", "Torgozone chat");

		const full = makeButton("□", "Open full page", function() {
			window.location.href = CHAT_URL;
		});
		const close = makeButton("×", "Close chat", function() {
			panel.remove();
			panel = null;
			if (teaser) {
				teaser.hidden = false;
			}
		});
		panel.appendChild(makeTitleBar("torgozone.exe", [full, close]));

		const frame = document.createElement("iframe");
		frame.className = "tz-frame";
		frame.src = CHAT_URL + "?embed";
		frame.title = "Torgozone chat";
		panel.appendChild(frame);

		document.body.appendChild(panel);
	}

	function start() {
		if (wasClosed()) {
			return;
		}
		window.setTimeout(buildTeaser, SHOW_DELAY);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", start);
	} else {
		start();
	}
})();

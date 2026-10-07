const SUPABASE_URL = "https://jkkygqzrbxprpnxgbjei.supabase.co";
const SUPABASE_KEY = "sb_publishable_v4NiUy89Z9MoHgyN9wUTQw_TaJRz5Mn";
const TABLE = "chat_messages";
const MAX_SHOWN = 30;
const NAME_COLOURS = [
	"#d98c8c",
	"#d6a07a",
	"#c9a27e",
	"#d4c38a",
	"#a8c48e",
	"#8ec4b0",
	"#9cc7c9",
	"#8eb4d4",
	"#a99ad6",
	"#c99ad1",
	"#e0a3b8",
	"#bba2a9"
];

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const log = document.getElementById("log");
const input = document.getElementById("input");
const sendButton = document.getElementById("send");
const statusLine = document.getElementById("status");

let myName = "";

function nameColour(name) {
	let hash = 2166136261;
	for (let i = 0; i < name.length; i++) {
		hash ^= name.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return NAME_COLOURS[(hash >>> 0) % NAME_COLOURS.length];
}

function makeNameSpan(name) {
	const span = document.createElement("span");
	span.className = "name";
	span.textContent = name;
	span.style.color = nameColour(String(name));
	return span;
}

function formatTime(stamp) {
	if (!stamp) {
		return "";
	}
	const date = new Date(stamp);
	if (isNaN(date.getTime())) {
		return "";
	}
	return String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
}

function setStatus(text, isError) {
	statusLine.textContent = text;
	statusLine.classList.toggle("error", Boolean(isError));
}

function showIdentity() {
	setStatus("you are ", false);
	statusLine.appendChild(makeNameSpan(myName));
}

function addMessage(row) {
	const div = document.createElement("div");
	div.className = "msg";
	if (myName && row.name === myName) {
		div.classList.add("mine");
	}
	const time = formatTime(row.created_at);
	if (time) {
		const timeSpan = document.createElement("span");
		timeSpan.className = "time";
		timeSpan.textContent = time;
		div.appendChild(timeSpan);
	}
	const bodySpan = document.createElement("span");
	bodySpan.className = "body";
	bodySpan.textContent = row.body;
	div.appendChild(makeNameSpan(row.name));
	div.appendChild(bodySpan);
	log.appendChild(div);
	while (log.children.length > MAX_SHOWN) {
		log.removeChild(log.firstChild);
	}
	log.scrollTop = log.scrollHeight;
}

async function loadRecent() {
	const { data, error } = await client
		.from(TABLE)
		.select("id, name, body, created_at")
		.order("created_at", { ascending: false })
		.limit(MAX_SHOWN);
	if (error) {
		setStatus("load failed: " + error.message, true);
		return;
	}
	data.reverse().forEach(addMessage);
}

async function send() {
	const body = input.value.trim();
	if (!body) {
		return;
	}
	sendButton.disabled = true;
	const { error } = await client.from(TABLE).insert({ body: body });
	sendButton.disabled = false;
	if (error) {
		setStatus(error.message, true);
		return;
	}
	input.value = "";
	showIdentity();
}

async function start() {
	const { data: sessionData } = await client.auth.getSession();
	if (!sessionData.session) {
		const { error } = await client.auth.signInAnonymously();
		if (error) {
			setStatus("sign-in failed: " + error.message, true);
			return;
		}
	}
	const { data: nameData, error: nameError } = await client.rpc("chat_my_name");
	if (nameError) {
		setStatus("name failed: " + nameError.message, true);
		return;
	}
	myName = nameData;
	showIdentity();
	await loadRecent();
	client
		.channel("chat")
		.on("postgres_changes", { event: "INSERT", schema: "public", table: TABLE }, (payload) => addMessage(payload.new))
		.subscribe();
	sendButton.addEventListener("click", send);
	input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			send();
		}
	});
}

start();

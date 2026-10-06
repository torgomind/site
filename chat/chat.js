const SUPABASE_URL = "https://jkkygqzrbxprpnxgbjei.supabase.co";
const SUPABASE_KEY = "sb_publishable_v4NiUy89Z9MoHgyN9wUTQw_TaJRz5Mn";
const TABLE = "chat_messages";
const MAX_SHOWN = 30;

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const log = document.getElementById("log");
const input = document.getElementById("input");
const sendButton = document.getElementById("send");
const statusLine = document.getElementById("status");

const adjectives = ["Quiet", "Damp", "Lost", "Sleepy", "Hollow", "Velvet", "Crooked", "Pale", "Lucky", "Tiny"];
const nouns = ["Moth", "Lantern", "Snail", "Raven", "Teapot", "Ghost", "Pebble", "Candle", "Fox", "Turnip"];

function getName() {
	let name = localStorage.getItem("chat_name");
	if (!name) {
		const a = adjectives[Math.floor(Math.random() * adjectives.length)];
		const n = nouns[Math.floor(Math.random() * nouns.length)];
		name = a + n + Math.floor(Math.random() * 100);
		localStorage.setItem("chat_name", name);
	}
	return name;
}

function addMessage(row) {
	const div = document.createElement("div");
	div.className = "msg";
	const nameSpan = document.createElement("span");
	nameSpan.className = "name";
	nameSpan.textContent = row.name + ": ";
	const bodySpan = document.createElement("span");
	bodySpan.textContent = row.body;
	div.appendChild(nameSpan);
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
		statusLine.textContent = "Load failed: " + error.message;
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
	const { error } = await client.from(TABLE).insert({ name: myName, body: body });
	sendButton.disabled = false;
	if (error) {
		statusLine.textContent = "Send failed: " + error.message;
		return;
	}
	input.value = "";
	statusLine.textContent = "You are " + myName;
}

const myName = getName();

async function start() {
	const { data: sessionData } = await client.auth.getSession();
	if (!sessionData.session) {
		const { error } = await client.auth.signInAnonymously();
		if (error) {
			statusLine.textContent = "Sign-in failed: " + error.message;
			return;
		}
	}
	statusLine.textContent = "You are " + myName;
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

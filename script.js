/** === CONFIG === **/
const WEBHOOK_URL = "https://hook.eu2.make.com/q67qvv8jx2ls73nb52n1q6bbrxli1my1"; // <- your Make webhook URL
const APP_VERSION = "v1";

/** === PROMPTS MAP === **/
const promptMap = {
  p1: "Describe a healthy daily routine using at least two signposting phrases.",
  p2: "Compare two inventions and explain which has had a greater impact.",
  p3: "Give advice to a friend who wants to save money and get fit."
};

const promptSel = document.getElementById("prompt");
const promptText = document.getElementById("promptText");
promptText.textContent = promptMap[promptSel.value];

promptSel.addEventListener("change", () => {
  promptText.textContent = promptMap[promptSel.value];
});

/** === RECORDER === **/
let mediaRecorder, chunks = [];
let startedAt = 0, timerId = null;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const submitBtn = document.getElementById("submitBtn");
const timer = document.getElementById("timer");
const player = document.getElementById("player");
const statusBox = document.getElementById("status");

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
}

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      player.src = URL.createObjectURL(blob);
      submitBtn.disabled = false; // enable submit once audio exists
    };

    mediaRecorder.start();
    startedAt = Date.now();
    timerId = setInterval(() => timer.textContent = fmt(Date.now() - startedAt), 200);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    submitBtn.disabled = true;

    statusBox.innerHTML = "<small class='ok'>Recording…</small>";

  } catch (err) {
    statusBox.innerHTML = "<small class='err'>Microphone blocked. Allow mic and reload.</small>";
    console.error(err);
  }
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  clearInterval(timerId);

  startBtn.disabled = false;
  stopBtn.disabled = true;

  statusBox.innerHTML = "<small>Stopped. You may listen before sending.</small>";
});

/** === SUBMIT METADATA TO MAKE === **/
async function submitToMake() {
  submitBtn.disabled = true;
  statusBox.innerHTML = "<small>Submitting…</small>";

  const durationMs = startedAt ? (Date.now() - startedAt) : 0;

  const payload = {
    timestamp: new Date().toISOString(),
    session_id: crypto.randomUUID(),
    name: document.getElementById("name").value.trim(),
    group: document.getElementById("group").value.trim(),
    device: navigator.userAgent,
    prompt_id: promptSel.value,
    prompt_text: promptMap[promptSel.value],
    scaffold_level: document.getElementById("scaffold").value,
    grammar_target: document.getElementById("grammar").value,
    vocab_set: document.getElementById("vocab").value,
    duration_ms: durationMs,
    self_rating: document.getElementById("rating").value,
    notes: document.getElementById("notes").value.trim(),
    app_version: APP_VERSION
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    statusBox.innerHTML = "<small class='ok'>Submitted ✅</small>";

  } catch (err) {
    statusBox.innerHTML = "<small class='err'>Submit failed. Try again.</small>";
    console.error(err);
  } finally {
    submitBtn.disabled = false;
  }
}

submitBtn.addEventListener("click", submitToMake);

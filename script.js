// Simple in-browser recorder (MediaRecorder)

const recordBtn = document.getElementById("record");
const stopBtn = document.getElementById("stop");
const statusEl = document.getElementById("status");
const player = document.getElementById("player");
const downloadLink = document.getElementById("download");

let mediaRecorder;
let chunks = [];

async function setupMic() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    statusEl.textContent = "This browser cannot record audio here.";
    recordBtn.disabled = true;
    stopBtn.disabled = true;
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      chunks = [];
      statusEl.textContent = "Recording…";
      recordBtn.disabled = true;
      stopBtn.disabled = false;
      downloadLink.style.display = "none";
    };

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      player.src = url;
      downloadLink.href = url;
      downloadLink.download = "recording.webm";
      downloadLink.style.display = "inline-block";
      statusEl.textContent = "Recorded. Play or download below.";
      recordBtn.disabled = false;
      stopBtn.disabled = true;
    };

    statusEl.textContent = "Mic ready. Tap Start Recording.";
    recordBtn.disabled = false;
    stopBtn.disabled = true;

    recordBtn.onclick = () => mediaRecorder.start();
    stopBtn.onclick = () => mediaRecorder.stop();
  } catch (err) {
    statusEl.textContent = "Mic error: " + err.message;
    recordBtn.disabled = true;
    stopBtn.disabled = true;
  }
}

setupMic();

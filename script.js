/***** PROMPT BANK — Units 1–8 (excluding 7), 3 prompts per level *****/
const PROMPTS = {
  "1": { title: "Animals",
    targets: ["comparatives","contrasting ideas","signposting"],
    keywords: ["habitat","wildlife","species","predator","adapt","endangered"],
    prompts: {
      easy: [
        { text: "Compare two animals you know. Use at least one comparative and one contrasting linker (e.g., however).",
          targets: ["comparatives","contrasting ideas"], minWords: 40 },
        { text: "Describe your favorite animal and give one example of how it survives.",
          targets: ["giving examples","signposting"], minWords: 40 },
        { text: "Explain one danger that wildlife faces and suggest one basic action to help.",
          targets: ["recommendations","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Explain how one animal is adapted to its environment. Use one signpost and one contrast.",
          targets: ["signposting","contrasting ideas"], minWords: 60 },
        { text: "Compare the habitats of two species and recommend one action to support each.",
          targets: ["comparatives","recommendations","signposting"], minWords: 60 },
        { text: "Discuss a local example of endangered species and give two examples of support strategies.",
          targets: ["giving examples","recommendations","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate two conservation strategies for an endangered species. Contrast them and make a recommendation.",
          targets: ["contrasting ideas","signposting","recommendations"], minWords: 80 },
        { text: "Argue which policy would most reduce habitat loss. Use cause & effect and at least two signposts.",
          targets: ["cause & effect","signposting"], minWords: 80 },
        { text: "Assess the trade-offs of wildlife tourism. Include pros/cons and a clear stance.",
          targets: ["advantages & disadvantages","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "2": { title: "The Environment",
    targets: ["cause & effect","giving examples","advantages & disadvantages"],
    keywords: ["pollution","recycling","renewable","emissions","waste","climate"],
    prompts: {
      easy: [
        { text: "Give one cause and one effect of air pollution in your city. Include 'because' or 'because of'.",
          targets: ["cause & effect"], minWords: 40 },
        { text: "Describe one simple way to reduce waste and give an example.",
          targets: ["giving examples","signposting"], minWords: 40 },
        { text: "Name one renewable energy source and explain a basic benefit.",
          targets: ["giving examples","advantages & disadvantages"], minWords: 40 }
      ],
      medium: [
        { text: "Explain why recycling matters and discuss one advantage and one disadvantage.",
          targets: ["advantages & disadvantages","giving examples"], minWords: 60 },
        { text: "Compare two energy sources and say which is better for your area, using cause & effect.",
          targets: ["cause & effect","comparatives","recommendations"], minWords: 60 },
        { text: "Describe a local environmental problem and give two example solutions.",
          targets: ["giving examples","signposting","recommendations"], minWords: 60 }
      ],
      hard: [
        { text: "Argue for a local policy to reduce emissions. Use at least two signposts and one contrast.",
          targets: ["signposting","contrasting ideas","cause & effect"], minWords: 80 },
        { text: "Evaluate the trade-offs of banning single-use plastics.",
          targets: ["advantages & disadvantages","contrasting ideas","signposting"], minWords: 80 },
        { text: "Make a case for green transport incentives with cause/effect and one counter-argument.",
          targets: ["cause & effect","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "3": { title: "Transport",
    targets: ["making suggestions","first conditional","comparatives","recommendations"],
    keywords: ["traffic","bus","metro","congestion","safety","cost"],
    prompts: {
      easy: [
        { text: "Make one suggestion to improve traffic near your school and explain why.",
          targets: ["making suggestions"], minWords: 40 },
        { text: "Compare two ways to travel to college and say which you prefer with a reason.",
          targets: ["comparatives","recommendations"], minWords: 40 },
        { text: "Describe one safety rule for riders and give a short example.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Use the first conditional to explain what will happen if your city adds more buses.",
          targets: ["first conditional","signposting"], minWords: 60 },
        { text: "Discuss safety vs. cost for public transport and make a recommendation.",
          targets: ["contrasting ideas","recommendations"], minWords: 60 },
        { text: "Compare cycling and buses for short trips and justify your choice.",
          targets: ["comparatives","recommendations","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate whether your city should build a metro. Use at least two signposts and one conditional.",
          targets: ["signposting","first conditional","advantages & disadvantages"], minWords: 80 },
        { text: "Argue which option reduces congestion fastest: more buses or cycling lanes. Contrast and recommend.",
          targets: ["contrasting ideas","recommendations","comparatives"], minWords: 80 },
        { text: "Propose a policy to improve road safety with cause/effect and one counterpoint.",
          targets: ["cause & effect","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "4": { title: "Customs & Traditions",
    targets: ["adverbs of frequency","dependent prepositions","signposting"],
    keywords: ["festival","family","tradition","celebrate","culture","meal"],
    prompts: {
      easy: [
        { text: "Describe a family custom. Use one adverb of frequency (e.g., usually, often).",
          targets: ["adverbs of frequency"], minWords: 40 },
        { text: "Explain why you are interested in a local festival. Include one dependent preposition (e.g., interested in).",
          targets: ["dependent prepositions"], minWords: 40 },
        { text: "Share a simple tradition and give a short example.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two holiday traditions and use one contrasting linker.",
          targets: ["contrasting ideas","adverbs of frequency"], minWords: 60 },
        { text: "Give one cause and effect related to a custom in your community.",
          targets: ["cause & effect","signposting"], minWords: 60 },
        { text: "Explain how a tradition has changed over time with one example.",
          targets: ["signposting","giving examples"], minWords: 60 }
      ],
      hard: [
        { text: "Discuss how traditions change over time. Use at least two signposts and one dependent preposition.",
          targets: ["signposting","dependent prepositions","contrasting ideas"], minWords: 80 },
        { text: "Evaluate whether a specific tradition should be kept or changed. Argue your view with contrasts.",
          targets: ["contrasting ideas","signposting"], minWords: 80 },
        { text: "Argue for protecting a cultural tradition while addressing one drawback.",
          targets: ["advantages & disadvantages","signposting","contrasting ideas"], minWords: 80 }
      ]
    }
  },
  "5": { title: "Health & Fitness",
    targets: ["modals (advice/obligation)","giving examples","signposting"],
    keywords: ["exercise","diet","sleep","stress","hydration","routine"],
    prompts: {
      easy: [
        { text: "Give one piece of advice for staying healthy and an example.",
          targets: ["modals (advice/obligation)","giving examples"], minWords: 40 },
        { text: "Compare two forms of exercise and say which is better for beginners.",
          targets: ["comparatives","recommendations"], minWords: 40 },
        { text: "Describe a morning routine and include one signpost (first/then).",
          targets: ["signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Explain how sleep affects fitness using cause & effect and one signpost word.",
          targets: ["cause & effect","signposting"], minWords: 60 },
        { text: "Recommend a weekly routine. Use at least two modals (should/must/have to).",
          targets: ["modals (advice/obligation)","signposting"], minWords: 60 },
        { text: "Discuss stress management with two examples.",
          targets: ["giving examples","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate two diet strategies and argue which is more sustainable. Include contrasts and examples.",
          targets: ["contrasting ideas","giving examples","signposting"], minWords: 80 },
        { text: "Propose a college wellness policy. Use modals for obligation and cause & effect.",
          targets: ["modals (advice/obligation)","cause & effect","signposting"], minWords: 80 },
        { text: "Argue for sleep and hydration targets with one counterargument.",
          targets: ["contrasting ideas","signposting","recommendations"], minWords: 80 }
      ]
    }
  },
  "6": { title: "Discovery & Invention",
    targets: ["signposting","giving examples","recommendations"],
    keywords: ["innovation","prototype","research","efficiency","technology","design"],
    prompts: {
      easy: [
        { text: "Describe a simple invention you like and give one example of how it helps people.",
          targets: ["giving examples"], minWords: 40 },
        { text: "Explain one problem a new app could solve and recommend one feature.",
          targets: ["recommendations","signposting"], minWords: 40 },
        { text: "Name a useful classroom tool and give one example of use.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two technologies that solve the same problem and use one contrasting linker.",
          targets: ["contrasting ideas","comparatives"], minWords: 60 },
        { text: "Explain the cause and effect of adopting a new tool in class. Use signposting.",
          targets: ["cause & effect","signposting"], minWords: 60 },
        { text: "Recommend an innovation for study skills with two examples.",
          targets: ["recommendations","giving examples","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Argue which invention had the bigger impact in the last decade. Use two signposts and one example.",
          targets: ["signposting","giving examples","contrasting ideas"], minWords: 80 },
        { text: "Propose a research plan to test a prototype. Make recommendations and include one contrast.",
          targets: ["recommendations","contrasting ideas","signposting"], minWords: 80 },
        { text: "Assess the trade-offs of automation in your field with pros/cons.",
          targets: ["advantages & disadvantages","signposting","contrasting ideas"], minWords: 80 }
      ]
    }
  },
  "8": { title: "Economics",
    targets: ["advantages & disadvantages","signposting","cause & effect"],
    keywords: ["cost","benefit","market","policy","inflation","employment"],
    prompts: {
      easy: [
        { text: "Give one advantage and one disadvantage of part-time work for students.",
          targets: ["advantages & disadvantages"], minWords: 40 },
        { text: "Explain one cause and one effect of rising prices in your area.",
          targets: ["cause & effect"], minWords: 40 },
        { text: "Give a simple tip for saving money and one example.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two ways to save money for college students and recommend one.",
          targets: ["comparatives","recommendations"], minWords: 60 },
        { text: "Discuss a local policy idea and signpost your main points clearly.",
          targets: ["signposting","advantages & disadvantages"], minWords: 60 },
        { text: "Explain how part-time work can affect study time using cause & effect.",
          targets: ["cause & effect","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate whether a minimum wage increase would help students. Use contrasts and cause & effect.",
          targets: ["contrasting ideas","cause & effect","signposting"], minWords: 80 },
        { text: "Argue for or against subsidized transport for learners. Provide pros/cons and a recommendation.",
          targets: ["advantages & disadvantages","recommendations","signposting"], minWords: 80 },
        { text: "Make a case for a student stipend with one counter-argument.",
          targets: ["contrasting ideas","cause & effect","signposting"], minWords: 80 }
      ]
    }
  }
};

/***** UI ELEMENTS *****/
const unitSelect = document.getElementById('unitSelect');
const levelSelect = document.getElementById('levelSelect');
const loadPromptBtn = document.getElementById('loadPromptBtn');
const promptTitle = document.getElementById('promptTitle');
const promptText  = document.getElementById('promptText');
const targetsBox  = document.getElementById('targetsBox');

const recBtn   = document.getElementById('recBtn');
const stopBtn  = document.getElementById('stopBtn');
const playBtn  = document.getElementById('playBtn');
const recStatus= document.getElementById('recStatus');
const meterFill= document.getElementById('meterFill');
const player   = document.getElementById('player');
const sttWarn  = document.getElementById('sttWarn');

const transcript = document.getElementById('transcript');
const feedbackBtn= document.getElementById('feedbackBtn');
const clearBtn   = document.getElementById('clearBtn');
const feedback   = document.getElementById('feedback');
const feedbackBody = document.getElementById('feedbackBody');
const scoreRow   = document.getElementById('scoreRow');

let current = null;
let mediaStream = null;
let mediaRecorder = null;
let audioChunks = [];
let audioBlob = null;
let analyser, audioCtx, rafId;
let recognition = null;
let recognizing = false;

/***** INIT *****/
(function init(){
  // populate unit select
  Object.keys(PROMPTS).forEach(u=>{
    const opt=document.createElement('option');
    opt.value=u; opt.textContent=`Unit ${u} — ${PROMPTS[u].title}`;
    unitSelect.appendChild(opt);
  });
  unitSelect.value="1";
  levelSelect.value="medium";
})();

loadPromptBtn.addEventListener('click', () => {
  const u = unitSelect.value;
  const lvl = levelSelect.value;
  const set = PROMPTS[u];
  const list = set.prompts[lvl];
  const key = `U${u}-${lvl}-idx`;
  const last = Number(localStorage.getItem(key) || -1);
  const idx = (last + 1) % list.length;
  localStorage.setItem(key, String(idx));
  current = list[idx];

  promptTitle.textContent = `${set.title} • ${cap(lvl)}`;
  promptText.textContent = current.text;

  targetsBox.innerHTML="";
  const badges = new Set([...(set.targets||[]), ...(current.targets||[]), ...(set.keywords||[]).slice(0,6)]);
  badges.forEach(b=>{
    const s=document.createElement('span'); s.className='badge'; s.textContent=b; targetsBox.appendChild(s);
  });

  feedback.classList.add('hidden');
  transcript.value="";
  audioBlob=null; player.src=""; playBtn.disabled=true;
});

/***** RECORDING + STT *****/
recBtn.addEventListener('click', async () => {
  try{
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio:true });
  }catch(e){
    recStatus.textContent="Mic: permission denied — allow microphone in your browser settings.";
    return;
  }
  // audio meter
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaStreamSource(mediaStream);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 512;
  source.connect(analyser);
  meter();

  // recorder
  audioChunks=[];
  mediaRecorder = new MediaRecorder(mediaStream);
  mediaRecorder.ondataavailable = e => { if(e.data.size>0) audioChunks.push(e.data); };
  mediaRecorder.onstop = () => {
    audioBlob = new Blob(audioChunks, { type:'audio/webm' });
    player.src = URL.createObjectURL(audioBlob);
    player.classList.remove('hidden');
    playBtn.disabled = false;
    stopMeter();
  };
  mediaRecorder.start();

  // STT: Web Speech API
  startRecognition();

  recBtn.disabled = true;
  stopBtn.disabled = false;
  recStatus.textContent = "Recording… speak clearly near the mic.";
});

stopBtn.addEventListener('click', () => stopAll());
playBtn.addEventListener('click', () => player.play());

function stopAll(){
  // stop recorder
  if(mediaRecorder && mediaRecorder.state !== "inactive"){
    mediaRecorder.stop();
  }
  // stop stream
  if(mediaStream){
    mediaStream.getTracks().forEach(t=>t.stop());
    mediaStream=null;
  }
  // stop stt
  stopRecognition();
  // ui
  recBtn.disabled=false;
  stopBtn.disabled=true;
  recStatus.textContent="Mic: stopped";
}

/***** Audio Meter *****/
function meter(){
  const data = new Uint8Array(analyser.frequencyBinCount);
  const loop = () => {
    analyser.getByteTimeDomainData(data);
    // rough amplitude
    let peak=0;
    for(let i=0;i<data.length;i++){
      const v = Math.abs(data[i]-128)/128;
      if(v>peak) peak=v;
    }
    meterFill.style.width = Math.min(100, Math.round(peak*140)) + "%";
    rafId = requestAnimationFrame(loop);
  };
  loop();
}
function stopMeter(){ if(rafId) cancelAnimationFrame(rafId); meterFill.style.width="0%"; }

/***** STT helpers (Web Speech API) *****/
function startRecognition(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){
    sttWarn.textContent = "Speech-to-text not supported on this browser. Try Chrome/Edge on desktop or Android.";
    return;
  }
  sttWarn.textContent = "";
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = (e) => {
    let final = "";
    for(let i=e.resultIndex; i<e.results.length; i++){
      const r = e.results[i];
      if(r.isFinal) final += r[0].transcript + " ";
    }
    if(final) transcript.value = (transcript.value + " " + final).trim();
  };
  recognition.onerror = (e) => {
    sttWarn.textContent = "STT error: " + e.error;
  };
  recognition.onend = () => { recognizing=false; };
  recognition.start();
  recognizing=true;
}

function stopRecognition(){
  try{ if(recognition && recognizing) recognition.stop(); }catch(_){}
  recognizing=false;

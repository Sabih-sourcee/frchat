/**
 * Factor AI Chat Widget — embeddable loader
 *
 * The API key lives ONLY on the Factor server. Sites that embed this widget
 * never see or handle the key — they only need this script tag.
 *
 * Usage on any website:
 *   <script>
 *     window.FactorChatConfig = {
 *       botName: "Factor Assistant",
 *       primaryColor: "#00BFA5",
 *       systemPrompt: "You are a helpful assistant for ..." // optional
 *     };
 *   </script>
 *   <script src="https://frchat.lovable.app/embed.js" defer></script>
 */
(function () {
  var BACKEND_URL = "https://frchat.lovable.app";
  var ENDPOINT = BACKEND_URL + "/api/public/chat";

  var cfg = window.FactorChatConfig || {};
  var botName = cfg.botName || "AI Assistant";
  var primaryColor = cfg.primaryColor || "#00BFA5";
  var systemPrompt = cfg.systemPrompt || "You are a helpful assistant.";

  // ---------- Inject styles ----------
  var css = `
    .fc-root, .fc-root * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .fc-root { position: fixed; bottom: 16px; right: 16px; z-index: 2147483647; }
    @media (min-width: 640px) { .fc-root { bottom: 24px; right: 24px; } }
    .fc-btn { width: 56px; height: 56px; border-radius: 9999px; border: 0; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,.15); cursor: pointer; display:flex; align-items:center; justify-content:center; position: relative; }
    .fc-btn .fc-ping { position:absolute; inset:0; border-radius:9999px; opacity:.5; animation: fc-ping 1.6s ease-out infinite; }
    @keyframes fc-ping { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.5);opacity:0} }
    .fc-win { position: fixed; left: 8px; right: 8px; bottom: 80px; width: auto; max-width: 420px; margin: 0 auto; height: calc(100dvh - 6rem); max-height: 520px; background:#fff; border-radius:16px; box-shadow:0 20px 50px rgba(0,0,0,.2); border:1px solid #e5e7eb; display:flex; flex-direction:column; overflow:hidden; transform-origin: bottom right; }
    @media (min-width: 640px) { .fc-win { position:absolute; left:auto; right:0; bottom:76px; width:380px; max-width:none; height:520px; margin:0; } }
    .fc-head { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; color:#fff; }
    .fc-head .fc-title { display:flex; align-items:center; gap:8px; font-weight:600; }
    .fc-x { background:transparent; border:0; color:#fff; cursor:pointer; padding:4px; border-radius:6px; }
    .fc-msgs { flex:1; overflow-y:auto; padding:12px 16px; background:#fff; }
    .fc-empty { text-align:center; color:#9ca3af; font-size:13px; margin-top:32px; }
    .fc-row { display:flex; margin:6px 0; }
    .fc-row.fc-u { justify-content:flex-end; }
    .fc-bubble { max-width:80%; padding:8px 14px; border-radius:16px; font-size:14px; line-height:1.5; white-space:pre-wrap; }
    .fc-bubble.fc-u { color:#fff; }
    .fc-bubble.fc-a { background:#F5F5F5; color:#1f2937; }
    .fc-input { border-top:1px solid #e5e7eb; padding:12px; display:flex; gap:8px; align-items:flex-end; background:#fff; }
    .fc-ta { flex:1; resize:none; border:1px solid #e5e7eb; border-radius:12px; padding:8px 12px; font-size:14px; outline:none; max-height:96px; font-family:inherit; }
    .fc-ta:focus { border-color: var(--fc-color); box-shadow: 0 0 0 2px rgba(0,191,165,.2); }
    .fc-send { border:0; color:#fff; border-radius:12px; padding:10px; cursor:pointer; }
    .fc-send[disabled] { opacity:.4; cursor:not-allowed; }
    .fc-dots { background:#F5F5F5; border-radius:16px; padding:10px 14px; display:inline-flex; gap:4px; }
    .fc-dot { width:8px; height:8px; border-radius:9999px; animation: fc-bounce .8s ease-in-out infinite; }
    .fc-dot:nth-child(2){ animation-delay:.15s } .fc-dot:nth-child(3){ animation-delay:.3s }
    @keyframes fc-bounce { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-6px) } }
    .fc-hidden { display:none !important; }
  `;
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- Build DOM ----------
  var root = document.createElement("div");
  root.className = "fc-root";
  root.style.setProperty("--fc-color", primaryColor);
  root.innerHTML = `
    <div class="fc-win fc-hidden" id="fc-win">
      <div class="fc-head" style="background:${primaryColor}">
        <div class="fc-title"><span style="font-size:22px">🤖</span><span>${escapeHtml(botName)}</span></div>
        <button class="fc-x" id="fc-close" aria-label="Close">✕</button>
      </div>
      <div class="fc-msgs" id="fc-msgs">
        <div class="fc-empty">Hi! How can I help you today?</div>
      </div>
      <div class="fc-input">
        <textarea class="fc-ta" id="fc-ta" rows="1" placeholder="Type a message..."></textarea>
        <button class="fc-send" id="fc-send" style="background:${primaryColor}" aria-label="Send">➤</button>
      </div>
    </div>
    <button class="fc-btn" id="fc-toggle" style="background:${primaryColor}" aria-label="Open chat">
      <span class="fc-ping" style="background:${primaryColor}"></span>
      <span style="position:relative;font-size:22px">💬</span>
    </button>
  `;
  document.body.appendChild(root);

  var win = root.querySelector("#fc-win");
  var msgs = root.querySelector("#fc-msgs");
  var ta = root.querySelector("#fc-ta");
  var sendBtn = root.querySelector("#fc-send");
  var toggle = root.querySelector("#fc-toggle");
  var closeBtn = root.querySelector("#fc-close");

  var history = [];
  var loading = false;

  function open() { win.classList.remove("fc-hidden"); ta.focus(); }
  function close() { win.classList.add("fc-hidden"); }
  toggle.addEventListener("click", function () { win.classList.contains("fc-hidden") ? open() : close(); });
  closeBtn.addEventListener("click", close);

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function(c){ return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]; }); }

  function render() {
    msgs.innerHTML = "";
    if (history.length === 0 && !loading) {
      var e = document.createElement("div"); e.className = "fc-empty"; e.textContent = "Hi! How can I help you today?"; msgs.appendChild(e); return;
    }
    history.forEach(function (m) {
      var row = document.createElement("div"); row.className = "fc-row " + (m.role === "user" ? "fc-u" : "fc-a");
      var b = document.createElement("div"); b.className = "fc-bubble " + (m.role === "user" ? "fc-u" : "fc-a");
      if (m.role === "user") b.style.background = primaryColor;
      var parts = String(m.content).split(/(https?:\/\/[^\s)]+)/g);
      parts.forEach(function (part) {
        if (/^https?:\/\//.test(part)) {
          var a = document.createElement("a");
          a.href = part; a.target = "_blank"; a.rel = "noopener noreferrer";
          a.textContent = part;
          a.style.textDecoration = "underline"; a.style.wordBreak = "break-all";
          if (m.role !== "user") a.style.color = primaryColor;
          else a.style.color = "#fff";
          b.appendChild(a);
        } else if (part) {
          b.appendChild(document.createTextNode(part));
        }
      });
      row.appendChild(b); msgs.appendChild(row);
    });
    if (loading) {
      var row = document.createElement("div"); row.className = "fc-row fc-a";
      var d = document.createElement("div"); d.className = "fc-dots";
      for (var i=0;i<3;i++){ var dot=document.createElement("span"); dot.className="fc-dot"; dot.style.background=primaryColor; d.appendChild(dot); }
      row.appendChild(d); msgs.appendChild(row);
    }
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function send() {
    var text = ta.value.trim();
    if (!text || loading) return;
    history.push({ role: "user", content: text });
    ta.value = "";
    loading = true; sendBtn.disabled = true; render();
    try {
      var r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, systemPrompt: systemPrompt }),
      });
      var data = await r.json();
      var reply = data.reply || data.error || "Sorry, I couldn't generate a response.";
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      history.push({ role: "assistant", content: "Error: " + (err && err.message ? err.message : "request failed") });
    } finally {
      loading = false; sendBtn.disabled = false; render(); ta.focus();
    }
  }

  sendBtn.addEventListener("click", send);
  ta.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
})();

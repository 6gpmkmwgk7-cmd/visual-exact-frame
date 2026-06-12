/* ============================================================
   ELEVATE SOCIAL — AI CHAT WIDGET (Remix-compatible version)
   ------------------------------------------------------------
   1. Save this file in your repo as:  public/elevate-chat.js
   2. Edit ONE line below: WEBHOOK_URL
   3. Load it from src/root.tsx with:
      <script src="/elevate-chat.js" defer></script>
      placed just before </body> (instructions in chat).
   This script creates its own container — no HTML edits needed.
============================================================ */
(function () {
  // ====== EDIT THIS ONE LINE ======
  var WEBHOOK_URL = "https://elevatedsocial111.app.n8n.cloud/webhook/elevate-social-frontend-agent";
  // ================================

  if (window.__esChatLoaded) return; // prevent double-injection on client navigation
  window.__esChatLoaded = true;

  var BRAND = "Elevate Social";
  var GREETING = "Hi! 👋 I'm the Elevate Social assistant. Ask me about AI content systems, automation, websites, or our Free AI Growth Audit.";

  var sessionId = "web_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
  var visitorId = sessionId;

  function init() {
    var css = document.createElement("style");
    css.textContent = "\
#es-chat-btn{position:fixed;bottom:24px;right:24px;z-index:99998;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;font-size:26px;box-shadow:0 8px 24px rgba(37,99,235,.45);transition:transform .2s}\
#es-chat-btn:hover{transform:scale(1.08)}\
#es-chat-panel{position:fixed;bottom:96px;right:24px;z-index:99999;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 130px);display:none;flex-direction:column;background:#0f172a;border:1px solid #1e293b;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}\
#es-chat-panel.open{display:flex}\
.es-head{padding:14px 16px;background:linear-gradient(135deg,#1d4ed8,#6d28d9);color:#fff}\
.es-head b{font-size:15px;display:block}\
.es-head span{font-size:12px;opacity:.85}\
.es-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}\
.es-m{max-width:85%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}\
.es-bot{background:#1e293b;color:#e2e8f0;border-bottom-left-radius:4px;align-self:flex-start}\
.es-user{background:#2563eb;color:#fff;border-bottom-right-radius:4px;align-self:flex-end}\
.es-typing{align-self:flex-start;color:#94a3b8;font-size:13px;padding:6px 13px}\
.es-inrow{display:flex;gap:8px;padding:12px;border-top:1px solid #1e293b;background:#0b1222}\
.es-inrow input{flex:1;background:#1e293b;border:1px solid #334155;color:#e2e8f0;border-radius:10px;padding:10px 12px;font-size:14px;outline:none}\
.es-inrow input:focus{border-color:#2563eb}\
.es-inrow button{background:#2563eb;border:none;color:#fff;border-radius:10px;padding:0 16px;font-size:15px;cursor:pointer}\
.es-inrow button:disabled{opacity:.5;cursor:default}\
.es-note{font-size:10px;color:#475569;text-align:center;padding:0 0 8px;background:#0b1222}";
    document.head.appendChild(css);

    var root = document.createElement("div");
    root.id = "es-chat-root";
    root.innerHTML = '\
<button id="es-chat-btn" aria-label="Open chat">💬</button>\
<div id="es-chat-panel" role="dialog" aria-label="' + BRAND + ' chat">\
  <div class="es-head"><b>' + BRAND + ' Assistant</b><span>Typically replies in seconds</span></div>\
  <div class="es-msgs" id="es-msgs"></div>\
  <div class="es-inrow">\
    <input id="es-input" type="text" placeholder="Type your message…" maxlength="1000" />\
    <button id="es-send" aria-label="Send">➤</button>\
  </div>\
  <div class="es-note">AI assistant — final deliverables are human-reviewed.</div>\
</div>';
    document.body.appendChild(root);

    var btn = document.getElementById("es-chat-btn"),
        panel = document.getElementById("es-chat-panel"),
        msgs = document.getElementById("es-msgs"),
        input = document.getElementById("es-input"),
        send = document.getElementById("es-send"),
        greeted = false, busy = false;

    function add(text, who) {
      var d = document.createElement("div");
      d.className = "es-m " + (who === "user" ? "es-user" : "es-bot");
      d.textContent = text;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    btn.addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        if (!greeted) { add(GREETING, "bot"); greeted = true; }
        input.focus();
      }
    });

    function setBusy(b) { busy = b; send.disabled = b; input.disabled = b; }

    function submit() {
      var text = input.value.trim();
      if (!text || busy) return;
      add(text, "user");
      input.value = "";
      setBusy(true);
      var t = document.createElement("div");
      t.className = "es-typing"; t.textContent = "Typing…";
      msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight;

      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId,
          visitorId: visitorId,
          message: text,
          channel: "lovable_website",
          sourcePage: location.pathname,
          language: (navigator.language || "en").slice(0, 2),
          selectedLanguage: (navigator.language || "en").slice(0, 2),
          campaign: new URLSearchParams(location.search).get("utm_campaign") || ""
        })
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        t.remove();
        add(data.reply || "Thanks for reaching out! Would you like to book a Free AI Growth Audit?", "bot");
      })
      .catch(function () {
        t.remove();
        add("Sorry — I couldn't connect just now. Please try again, or book a Free AI Growth Audit through our contact page.", "bot");
      })
      .finally(function () { setBusy(false); input.focus(); });
    }

    send.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/**
 * Factor AI Chat Widget — embeddable loader (Gemini 2.5 Flash Lite)
 *
 * Usage on any website:
 *   <script src="https://YOUR_DEPLOYED_URL/embed.js"></script>
 */
(function () {
  var DEPLOYED_URL = 'YOUR_DEPLOYED_URL'; // e.g. https://your-app.lovable.app
  var CONFIG = {
    apiKey: 'YOUR_GEMINI_API_KEY',
    systemPrompt: 'You are a helpful assistant.',
    botName: 'Factor Assistant',
    logoUrl: 'https://yoursite.com/logo.png',
    primaryColor: '#00BFA5',
  };

  var script = document.createElement('script');
  script.type = 'module';
  script.src = DEPLOYED_URL + '/assets/index.js';
  script.onload = function () {
    if (window.FactorChatWidget && typeof window.FactorChatWidget.init === 'function') {
      window.FactorChatWidget.init(CONFIG);
    }
  };
  document.head.appendChild(script);
})();

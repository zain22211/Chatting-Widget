(function() {
    // Inject Stylesheet
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
    document.head.appendChild(style);

    // Inject Chatbox HTML
    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = `
        <style>
            :root {
                --wc_rp-bg-color: #fff;
                --wc_rp-header-bg: #008000;
                --wc_rp-chat-bg: #fff;
                --wc_rp-user-color: #006600;
            }

            .wc_rp_chatbox {
                width: 100%;
                max-width: 350px;
                height: 400px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                background: #fff;
                position: fixed;
                bottom: 20px;
                right: 30px;
                z-index: 999;
                display: flex;
                flex-direction: column;
                margin-bottom: 65px;
                transition: opacity 0.3s, transform 0.3s;
            }

            .wc_rp_header {
                background: var(--wc_rp-header-bg);
                color: white;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .wc_rp_messages {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
                background: var(--wc_rp-chat-bg);
                display: flex;
                flex-direction: column;
            }

            .wc_rp_message {
                background: var(--wc_rp-user-color);
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                max-width: 50%;
                width: fit-content;
                margin-bottom: 8px;
                display: inline-block;
                word-wrap: break-word;
                white-space: pre-wrap;
            }

            .wc_rp_input_area {
                display: flex;
                align-items: center;
                padding: 10px;
                border-top: 1px solid #565656;
                background: #fff;
            }

            .wc_rp_input {
                flex: 1;
                padding: 5px;
                border: none;
                outline: none;
            }

            .wc_rp_emoji, .wc_rp_attach {
                cursor: pointer;
                margin: 0 5px;
            }

            .wc_rp_toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #008000;
                color: white;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .hidden {
                opacity: 0;
                transform: scale(0.9);
                pointer-events: none;
            }
        </style>

        <div class="wc_rp_chatbox hidden">
            <div class="wc_rp_header">
                <span>Chat</span>
                <span class="wc_rp_menu"><i class="fa-solid fa-bars"></i></span>
            </div>
            <div class="wc_rp_messages">
                <div class="wc_rp_message">Hello!</div>
            </div>
            <div class="wc_rp_input_area">
                <input type="text" class="wc_rp_input" placeholder="Type a message and press Enter...">
                <span class="wc_rp_emoji"><i class="fa-regular fa-face-smile"></i></span>
                <span class="wc_rp_attach"><i class="fa-solid fa-paperclip"></i></span>
            </div>
        </div>
        <div class="wc_rp_toggle"><i class="fa-solid fa-message"></i></div>
    `;

    document.body.appendChild(chatContainer);

    // Chatbox Functionality
    const toggleButton = document.querySelector(".wc_rp_toggle");
    const chatbox = document.querySelector(".wc_rp_chatbox");
    const chatInput = document.querySelector(".wc_rp_input");
    const messagesContainer = document.querySelector(".wc_rp_messages");
    let isChatVisible = false;

    toggleButton.addEventListener("click", () => {
        isChatVisible = !isChatVisible;
        chatbox.classList.toggle("hidden", !isChatVisible);
        toggleButton.innerHTML = isChatVisible
            ? `<i class="fa-solid fa-xmark"></i>`
            : `<i class="fa-solid fa-message"></i>`;
    });

    function appendMessage(text) {
        if (text.trim() === "") return;
        const messageElement = document.createElement("div");
        messageElement.classList.add("wc_rp_message");
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        chatInput.value = "";
    }

    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            appendMessage(chatInput.value);
        }
    });
})();

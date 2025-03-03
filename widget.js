// Chatbox HTML structure
const chatboxHTML = `
    <div class="wc_rp_chatbox">
        <div class="wc_rp_header">
            <img src="" class="wc_rp_logo" id="chatLogo">
            <span>Chat</span>
            <span class="wc_rp_menu" id="wc_rp_menuBtn">
                <i class="fa-solid fa-bars"></i>
            </span>
            <div class="wc_rp_dropdown" id="wc_rp_dropdownMenu">
                <a href="#"><i class="fa-regular fa-pen-to-square"></i> Change Name</a>
                <a href="#"><i class="fa-regular fa-envelope"></i> Email transcript</a>
                <a href="#"><i class="fa-regular fa-bell"></i> Sound On</a>
                <a href="#"><i class="fa-regular fa-circle-xmark"></i> End Chat Session</a>
            </div>
        </div>
        <div class="wc_rp_messages">
            <div class="wc_rp_message">Hello!</div>
        </div>
        <div class="wc_rp_input_area">
            <input type="text" class="wc_rp_input" placeholder="Type a message and press Enter...">
            <span class="wc_rp_emoji"><i class="fa-regular fa-face-smile"></i></span>
            <input type="file" id="wc_rp_file_input" style="display: none;">
            <span class="wc_rp_attach"><i class="fa-solid fa-paperclip"></i></span>
        </div>
    </div>
    <div class="wc_rp_toggle"><i class="fa-solid fa-xmark"></i></div>
`;

// Chatbox CSS (Injected Dynamically)
const chatboxCSS = `
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
        transition: opacity 0.3s, transform 0.3s;
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
`;

// Append chatbox to the page
document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = chatboxHTML;
    document.body.appendChild(chatContainer);

    // Inject CSS dynamically
    const styleTag = document.createElement("style");
    styleTag.innerHTML = chatboxCSS;
    document.head.appendChild(styleTag);

    // Load FontAwesome icons
    const faStyle = document.createElement("link");
    faStyle.rel = "stylesheet";
    faStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
    document.head.appendChild(faStyle);

    // Chatbox logic
    const chatInput = document.querySelector(".wc_rp_input");
    const emojiButton = document.querySelector(".wc_rp_emoji");
    const toggleButton = document.querySelector(".wc_rp_toggle");
    const chatbox = document.querySelector(".wc_rp_chatbox");
    const messagesContainer = document.querySelector(".wc_rp_messages");
    const fileInput = document.querySelector("#wc_rp_file_input");
    let isChatVisible = true;

    // Initialize Emoji Picker
    const picker = new EmojiButton({ position: "top-start", theme: "light" });

    let pickerVisible = false;

    // Toggle emoji picker
    emojiButton.addEventListener("click", (event) => {
        event.stopPropagation();
        pickerVisible ? picker.hidePicker() : picker.showPicker(emojiButton);
        pickerVisible = !pickerVisible;
    });

    // Insert selected emoji into input field
    picker.on("emoji", (selection) => {
        chatInput.value += selection.emoji || selection;
    });

    // Toggle chat visibility
    toggleButton.addEventListener("click", () => {
        isChatVisible = !isChatVisible;
        chatbox.classList.toggle("hidden", !isChatVisible);
        toggleButton.innerHTML = isChatVisible
            ? `<i class="fa-solid fa-xmark"></i>`
            : `<i class="fa-regular fa-message"></i>`;
    });

    // File attachment functionality
    document.querySelector(".wc_rp_attach").addEventListener("click", () => {
        fileInput.click();
    });

    // Send message when pressing Enter
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            appendMessage(chatInput.value);
        }
    });

    // Append message function
    function appendMessage(text) {
        if (text.trim() === "") return;
        const messageElement = document.createElement("div");
        messageElement.classList.add("wc_rp_message");
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        chatInput.value = "";
    }

    // Listen for file selection
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            appendMessage(`📎 File attached: ${fileInput.files[0].name}`);
        }
    });
});

# LeetCode Hint Helper

LeetCode Hint Helper is a Chrome extension that provides helpful hints for LeetCode problems. The extension uses an API to fetch hints based on the name of the currently open LeetCode problem.

## Features
- Automatically detects the LeetCode problem name from the active tab.
- Fetches hints using a backend server connected to an external API.
- Displays the hints in a clean and intuitive popup interface.

https://github.com/user-attachments/assets/94593e7b-c00a-48bd-8a13-8c9a05f7fdb3

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/leetcode-hint-helper.git
   ```
2. Navigate to the project directory:
   ```bash
   cd leetcode-hint-helper
   ```
3. Install dependencies for the server:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your-api-key-here
   ```
5. Build the Chrome extension:
   - Ensure the `manifest.json` and related files are correctly set up.
   - Place the `icon.png` file in the root directory.

## Usage
1. Load the extension:
   - Go to `chrome://extensions/` in your browser.
   - Enable "Developer mode" in the top-right corner.
   - Click "Load unpacked" and select the project directory.
2. Start the server:
   ```bash
   node server.mjs
   ```

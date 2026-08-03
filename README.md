# Mr AI - RAG Frontend 🚀

A modern, responsive, and high-performance Retrieval-Augmented Generation (RAG) knowledge workspace frontend. Built with **React**, **Vite**, and **Tailwind CSS**, this interface allows users to upload documents (PDF, TXT, DOCX) and converse with an AI assistant grounded in the uploaded context.

---

## ✨ Features

- **Document Ingestion**: Seamless file selector/upload modal to ingest knowledge documents (PDFs, TXT, DOCX) to the RAG backend.
- **Context-Grounded Chat**: Interact with an AI assistant that answers queries with citations and source references from your uploaded documents.
- **Conversation Management**: Easily create, view, switch, and delete conversation history via a dynamic sidebar.
- **Sleek Dark Mode Design**: Premium aesthetic featuring glassmorphism elements, custom gradients, and micro-interactions optimized for low-light environments.
- **Fully Responsive**: Optimized experience across desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd rag-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

1. Start the Vite development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

### Building for Production

To build the application for production:
```bash
npm run build
```
This generates optimized static assets inside the `dist/` directory, ready to be hosted on any static hosting provider.

---

## 🔌 API Integration & Configuration

The application communicates with a RAG backend API. You can configure the API endpoint in:
- **File**: `src/api/axios.js`
- **Default Endpoint**: `http://127.0.0.1:8000/api`

### Expected Backend Endpoints

The frontend integrates with the following backend API endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/chat/conversations/` | `GET` | Retrieve the list of recent conversations. |
| `/chat/conversation/create/` | `POST` | Create a new conversation session. |
| `/chat/conversation/<id>/delete/` | `DELETE` / `POST` | Delete a specific conversation. |
| `/chat/` | `POST` | Send a question and receive a RAG-grounded answer with sources. |
| `/documents/upload/` | `POST` | Upload knowledge base documents (`multipart/form-data`). |

---

## 📁 Project Structure

```text
rag-frontend/
├── src/
│   ├── api/          # Axios configuration and API helper instance
│   ├── components/   # Reusable UI components (Sidebar, ChatWindow, UploadBox, etc.)
│   ├── hooks/        # React custom hooks
│   ├── pages/        # Application pages (Home, Chat)
│   ├── App.css       # App-wide specific styles
│   ├── App.jsx       # Main app layout and routing
│   ├── index.css     # Tailwind imports and base styles
│   └── main.jsx      # React DOM rendering entrypoint
├── public/           # Static public assets
├── package.json      # Dependencies and build scripts
└── vite.config.js    # Vite configuration
```

---

## 🎨 Design and Customization

This UI utilizes a slate-based dark background (`bg-slate-950`) combined with blue/cyan gradient accents.
- To modify theme colors, update Tailwind classes in components.
- The UI features custom radial backgrounds located inside the `ChatWindow` component to create a high-end feel.

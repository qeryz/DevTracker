## 🧠 DevTracker

A Jira-style task management app featuring modern UI, drag-and-drop task board, commenting, authentication, and more.

## ✨ Features

- JWT authentication
- Create/update/delete tasks
- Drag-and-drop task board
- Assign users, priority, tags
- Commenting system
- Zod validation + React Hook Form
- Zustand + React Query state management
- Jest unit testing & Cypress E2E
- Best practices (modularization, code splitting, lazy loading, etc)

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State:** Zustand, React Query
- **Forms & Validation:** React Hook Form, Zod
- **Testing:** Jest, Cypress
- **Auth:** JWT

## 📸 Screenshots

| Dashboard                |  Detailed Task Card |
:-------------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/e69df2fc-c8e3-4aad-92ac-228d1f79f010) | ![image](https://github.com/user-attachments/assets/c18132cd-e6d3-4107-afe6-4a647ba5850d)

## 🚀 Getting Started

Check out the deployed app [here](https://devtrackerapp.netlify.app/dashboard)

```bash
# Clone the repo
git clone https://github.com/your-username/devtracker.git

# Install dependencies
npm install

# Start the dev server
npm run dev

```

## 📝 Testing

✅ Unit Testing: via Jest
```
npm test
```

✅ E2E Testing: via Cypress for full user MVP flow and interaction coverage
```
npm run cypress:open
```

| Jest                |  Cypress E2E |
:-------------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/4805e723-2fc5-4b7a-99cf-15d1093f0cd2) | ![image](https://github.com/user-attachments/assets/b17f8c0c-e500-4a29-94b6-a868e1a76ec4)

## ⚡ Google Lighthouse Metrics
<img src="https://github.com/user-attachments/assets/62ed053e-3223-4a8f-bd6c-2a509f733db5" width="400" />

## 📰 Entity Relationship Model
```mermaid
flowchart TD
    User[User] -->|creates| Epic
    User -->|assigns| Task
    User -->|writes| Comment

    Epic -->|has many| Task
    Epic -->|has| Status
    Epic --> Comment

    Sprint -->|has many| Task
    Sprint -->|has| Status

    Task -->|has| Status
    Task -->|has| Priority
    Task -->|has many| Tag
    Task --> Comment

    Tag -->|used in| Task
```

```mermaid
graph LR
  subgraph Client
    U[👤 User Browser]
  end
  subgraph Frontend [Next.js]
    FE[Static/SSR Pages]
  end
  subgraph Backend [Django REST API]
    API[/Gunicorn + DRF/]
    DB[(PostgreSQL)]
  end

  U -- HTTPS --> FE
  FE -- REST/JSON --> API
  API --> DB
```

## 📂 Folder Structure
```
src/
├── app/ # Main application routes
│ ├── layout.tsx # Root layout
│ ├── dashboard/ # Dashboard feature
│ │ ├── page.tsx # Dashboard page
│ │ └── components/ # Dashboard components
│ │ ├── TaskCard/ # Reusable task component
│ │ ├── TaskForm/ # Task creation form
│ │ └── Column/ # Kanban column component
│ ├── login/ # Login feature
│ └── components/ # Shared UI components
│ ├── BackendSpinUpNotice.tsx # Display notice while BE spins up
│ ├── CustomModal.tsx
│ ├── NavBar.tsx
│ └── FilterButton/ # Filter component with sub-components
│
├── lib/ # Core application logic
│ ├── api/ # API service layer
│ │ ├── tasks.ts # Task-related API calls
│ │ └── auth.ts # Authentication service
│ └── types/ # TypeScript definitions
│
├── hooks/ # Custom React hooks
│ ├── useTasks.ts # Task management hook
│ ├── useUsers.ts # User data hook
│ └── useClickOutside.ts # UI interaction hook
│
├── context/ # React context providers
│ ├── AuthProvider.tsx # Authentication context
│ └── QueryClientProvider.tsx # React Query provider
│
├── store/ # Zustand/state management
│ ├── useTaskStore.ts # Task state
│ └── useUsersStore.ts # User state
| └── useMiscStore.ts # Status, priorities, etc state
│
├── assets/ # Static assets
└── middleware.ts # Middleware
```

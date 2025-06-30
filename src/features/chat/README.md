# Chat Feature

This directory contains the refactored chat functionality following best practices for code organization and maintainability.

## Architecture

### Directory Structure
```
src/features/chat/
├── components/          # Reusable chat components
├── constants/          # Chat-related constants
├── hooks/              # Custom hooks for chat logic
├── pages/              # Chat page components
├── services/           # API and storage services
├── types/              # TypeScript interfaces
├── utils/              # Utility functions
└── index.ts            # Main exports
```

### Key Components

#### Services
- **ChatStorageService**: Handles localStorage operations for chat messages
- **ChatApiService**: Manages API calls for sending messages

#### Hooks
- **useChatState**: Custom hook that manages all chat state and operations

#### Components
- **ChatSidebar**: Displays list of available bots and conversation previews
- **ChatArea**: Main chat interface with messages and input
- **ChatPageHeader**: Header component with navigation and actions

#### Utils
- **formatTimestamp**: Formats message timestamps
- **getTruncatedMessage**: Truncates long messages for previews
- **generateMessageId**: Creates unique message IDs
- **createInitialMessage**: Creates initial bot greeting messages

### Benefits of This Architecture

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reusability**: Components and utilities can be easily reused
3. **Maintainability**: Changes are isolated to specific areas
4. **Type Safety**: Strong TypeScript typing throughout
5. **Testability**: Each piece can be tested independently
6. **Scalability**: Easy to add new features without affecting existing code

### Usage

```typescript
import { useChatState, ChatSidebar, ChatArea } from '@/features/chat';

const ChatPage = () => {
  const chatState = useChatState(bots);
  
  return (
    <div>
      <ChatSidebar {...chatState} />
      <ChatArea {...chatState} />
    </div>
  );
};
```
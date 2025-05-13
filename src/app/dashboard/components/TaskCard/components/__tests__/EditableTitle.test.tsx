import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EditableTitle from "../EditableTitle";
import { Task } from "@/lib/types/api/tasks";
import { useMutation, QueryClient, QueryClientProvider } from "react-query";
import useTaskStore from "@/store/useTaskStore";
import { TITLE_MIN_MESSAGE, TITLE_EXCEEDED_MESSAGE } from "../utils";

jest.mock("@/store/useTaskStore");
const mockSetIsEditing = jest.fn();
const mockUseTaskStore = useTaskStore as jest.MockedFunction<
  typeof useTaskStore
>;
mockUseTaskStore.mockImplementation(() => ({
  isEditing: {},
  setIsEditing: mockSetIsEditing,
}));

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useMutation: jest.fn(),
}));

const mockUseMutation = useMutation as jest.Mock;
const mockMutate = jest.fn();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe("EditableTitle", () => {
  const task: Task = {
    id: 1,
    title: "Updated Task",
    description: "Testing.",
    status: {
      id: 4,
      title: "Done",
      category: "task",
      order: 4,
      is_default: false,
      color: null,
      created_at: "2025-04-21T19:29:13.741Z",
      modified_at: "2025-04-21T19:29:13.741Z",
    },
    epic: {
      id: 1,
      title: "Agile",
      description: "Testing description",
      status: {
        id: 1,
        title: "To Do",
        category: "task",
        order: 1,
        is_default: true,
        color: null,
        created_at: "2025-04-17T20:31:07.169Z",
        modified_at: "2025-04-17T20:31:07.169Z",
      },
      creator: {
        id: 1,
        username: "admin",
        email: "czkmaz@gmail.com",
        first_name: "Marcos",
        last_name: "Padilla",
        is_active: true,
        is_superuser: true,
        last_login: "2025-04-17T00:39:12.848Z",
        date_joined: "2025-04-17T00:38:54.404Z",
      },
      created_at: "2025-04-17T20:32:49.210Z",
      modified_at: "2025-04-18T00:42:39.493Z",
    },
    sprint: {
      id: 1,
      title: "Sprint 1",
      start_date: "2025-01-01T00:00:00",
      end_date: "2025-03-31T00:00:00",
      created_by: {
        id: 2,
        username: "the_batman",
        email: "secret@batman.com",
        first_name: "Bruce",
        last_name: "Wayne",
        is_active: true,
        is_superuser: false,
        last_login: null,
        date_joined: "2025-04-17T00:51:38.444Z",
      },
      created_at: "2025-04-17T20:33:04.868Z",
      modified_at: "2025-04-17T20:33:04.868Z",
    },
    assignee: {
      id: 4,
      username: "staff",
      email: "staff@live.com",
      first_name: "John",
      last_name: "Doe",
      is_active: true,
      is_superuser: false,
      last_login: null,
      date_joined: "2025-04-27T00:39:49.943Z",
    },
    created_by: {
      id: 2,
      username: "the_batman",
      email: "secret@batman.com",
      first_name: "Bruce",
      last_name: "Wayne",
      is_active: true,
      is_superuser: false,
      last_login: null,
      date_joined: "2025-04-17T00:51:38.444Z",
    },
    tags: [
      {
        id: 1,
        name: "TASK",
        created_at: "2025-04-17T20:33:17.929Z",
        modified_at: "2025-04-22T00:22:08.131Z",
      },
    ],
    priority: {
      id: 1,
      title: "High",
      order: 1,
      color: null,
      is_default: false,
      category: "task",
      created_at: "2025-04-17T20:36:56.803Z",
      modified_at: "2025-04-17T20:36:56.803Z",
    },
    created_at: "2025-04-17T20:37:13.763Z",
    modified_at: "2025-04-30T03:41:17.083Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });
    mockUseTaskStore.mockImplementation(() => ({
      isEditing: {},
      setIsEditing: mockSetIsEditing,
    }));
  });

  it("renders the title in non-edit mode", () => {
    renderWithProviders(<EditableTitle task={task} />);
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /edit title/i }),
    ).toBeInTheDocument();
  });

  it("switches to edit mode when edit button is clicked", async () => {
    renderWithProviders(<EditableTitle task={task} />);
    await userEvent.click(screen.getByRole("button", { name: /edit title/i }));
    expect(mockSetIsEditing).toHaveBeenCalledWith(task.id, true);
  });

  it("cancels edit mode when cancel button is clicked", async () => {
    const mockStore = {
      isEditing: { [task.id]: true },
      setIsEditing: jest.fn((id, value) => {
        mockStore.isEditing = { ...mockStore.isEditing, [id]: value };
      }),
    };

    mockUseTaskStore.mockImplementation(() => mockStore);

    renderWithProviders(<EditableTitle task={task} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /cancel title edit/i }),
    );

    expect(await screen.findByText(task.title)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("shows error message when title is empty", async () => {
    mockUseTaskStore.mockImplementation(() => ({
      isEditing: { [task.id]: true },
      setIsEditing: mockSetIsEditing,
    }));

    renderWithProviders(<EditableTitle task={task} />);

    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.click(
      screen.getByRole("button", { name: /save title edit/i }),
    );

    expect(screen.getByText(TITLE_MIN_MESSAGE)).toBeInTheDocument();
  });

  it("shows error message when title is too long", async () => {
    mockUseTaskStore.mockImplementation(() => ({
      isEditing: { [task.id]: true },
      setIsEditing: mockSetIsEditing,
    }));
    renderWithProviders(<EditableTitle task={task} />);
    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.type(screen.getByRole("textbox"), "a".repeat(51));
    await userEvent.click(
      screen.getByRole("button", { name: /save title edit/i }),
    );
    expect(screen.getByText(TITLE_EXCEEDED_MESSAGE)).toBeInTheDocument();
  });

  it("saves changes when save button is clicked", async () => {
    mockUseTaskStore.mockImplementation(() => ({
      isEditing: { [task.id]: true },
      setIsEditing: mockSetIsEditing,
    }));

    renderWithProviders(<EditableTitle task={task} />);

    await userEvent.clear(screen.getByRole("textbox"));
    await userEvent.type(screen.getByRole("textbox"), "Testing Task");
    await userEvent.click(
      screen.getByRole("button", { name: /save title edit/i }),
    );

    expect(mockMutate).toHaveBeenCalledWith({
      id: task.id,
      updates: {
        title: "Testing Task",
        description: "Testing.",
        status: 4,
        epic: 1,
        sprint: 1,
        assignee: 4,
        created_by: 2,
        priority: 1,
        tags: [1],
      },
    });
    expect(mockSetIsEditing).toHaveBeenCalledWith(task.id, false);
  });
});

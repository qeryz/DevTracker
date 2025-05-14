describe("Dashboard Flow", () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit("http://localhost:3000/login");

    // Log in with valid credentials
    cy.get("input[aria-label='username']").type("staff");
    cy.get("input[aria-label='password']").type("pass123");
    cy.get("button[aria-label='login']").click();

    // Verify redirection to the dashboard
    cy.url().should("include", "http://localhost:3000/dashboard");
  });

  it("should add a task and move it to 'Done'", () => {
    // Open the Add Task form
    cy.get("button[aria-label='Add Task']").click();

    // Fill in the task details
    cy.get("input[aria-label='Task Title']").type("New Task Title");
    cy.get("textarea[aria-label='Task Description']").type(
      "This is a description for the new task.",
    );

    // Submit the form
    cy.get("button[type='submit']").click();

    // Verify the task appears in the default column (e.g., "To Do")
    cy.contains("New Task Title")
      .parents("[data-task-id]")
      .within(() => {
        // Click on options menu of the task
        cy.get("[aria-label='Options']").click();
        // Click on the "Status" option
        cy.get("[aria-label='Select Status']").click();
        // Select "Done" from the dropdown
        cy.get("[aria-label='Select Done']").click();
      });

    // Verify the task is now in the "Done" column
    cy.get("[data-column-title='Done']").within(() => {
      cy.contains("New Task Title").should("exist");
    });

    // Delete the task
    cy.contains("New Task Title")
      .parents("[data-task-id]")
      .within(() => {
        // Click on options menu of the task
        cy.get("[aria-label='Options']").click();
        // Click on the "Delete" option
        cy.get("[aria-label='Delete Task']").click();
      });
  });
});

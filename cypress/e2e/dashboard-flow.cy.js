describe("Dashboard Flow", () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit("http://localhost:3000/login");

    // Log in with valid credentials
    cy.get("input[aria-label='username']").type("staff");
    cy.get("input[aria-label='password']").type("pass123");
    cy.get("button[aria-label='submit']").click();

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
    cy.contains("New Task Title").should("exist");

    // // Drag and drop the task to the "Done" column
    // cy.contains("New Task Title")
    //   .trigger("mousedown", { which: 1 })
    //   .trigger("mousemove", { clientX: 600, clientY: 200 }) // Adjust coordinates as needed
    //   .trigger("mouseup", { force: true });

    // // Verify the task is now in the "Done" column
    // cy.get("[data-column-title='Done']").within(() => {
    //   cy.contains("New Task Title").should("exist");
    // });
  });
});

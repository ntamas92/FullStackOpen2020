describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", { username: "dog", password: "dog" });

    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    // cy.get("#login-form").as("loginForm") //Find by id
    cy.get("[data-cy=login-form]").as("loginForm");
    cy.get("@loginForm").should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("[data-cy=login-form]").as("loginForm");
      cy.get("input[name=username]").type("dog");
      cy.get("input[name=password]").type("dog");
      cy.get("button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("[data-cy=login-form]").as("loginForm");
      cy.get("@loginForm").should("be.visible");
      cy.get("input[name=username]").type("dog");
      cy.get("input[name=password]").type("wrong");
      cy.get("button").click();

      cy.contains("Error during login").and("have.css", "color", "rgb(255, 0, 0)");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: "dog", password: "dog" });
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();

        cy.get("#author").type("testAuthor");
        cy.get("#title").type("testTitle");

        cy.get("#submitCreateBlog").click();

        cy.contains("testTitle by testAuthor");
      });

      describe("When blog created", function () {
        beforeEach(function () {
          cy.createBlog({ title: "testTitle", author: "testAuthor", likes: 0 });
        });

        it("A blog can be liked", function () {
          cy.contains("show").click();

          cy.get("#likeButton").click();
          cy.contains("likes: 1");
        });

        it("A blog can be deleted", function () {
          cy.contains("show").click();

          cy.get("#removeBlogButton").click();
          cy.contains("testAuthor").should("not.exist");
        });

        it("Blogs ordered relative to the number of likes", function () {
          cy.createBlog({ title: "testTitle2", author: "testAuthor2", likes: 1 });
          cy.createBlog({ title: "testTitle3", author: "testAuthor3", likes: 2 });

          cy.get("div[data-cy=blogContainer]").then(function (blogs) {
            expect(blogs).to.have.lengthOf(3);
            expect(blogs[0]).to.contain("testTitle3")
            expect(blogs[1]).to.contain("testTitle2")
            expect(blogs[2]).to.contain("testTitle")
          });
        });
      });
    });
  });
});

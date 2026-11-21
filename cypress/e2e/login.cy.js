describe("Login Formu", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("Başarılı form doldurulduğunda submit edip success sayfasını açabiliyorum", () => {
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("Sifre1234");
      cy.get('[data-cy="terms-input"]').check();
      cy.get('[data-cy="submit-button"]').should("not.be.disabled").click();
      cy.url().should("include", "/success");
      cy.get('[data-cy="success-title"]').should("be.visible");
    });
  
    describe("Hatalı durumlar", () => {
      it("email yanlış girildiğinde", () => {
        cy.get('[data-cy="email-input"]').type("yanlis-email");
        cy.get('[data-cy="password-input"]').type("Sifre1234");
        cy.get(".error").should("have.length", 1);
        cy.get('[data-cy="email-error"]').should(
          "have.text",
          "Geçerli bir email adresi giriniz."
        );
        cy.get('[data-cy="submit-button"]').should("be.disabled");
      });
  
      it("email ve password yanlış girildiğinde", () => {
        cy.get('[data-cy="email-input"]').type("yanlis-email");
        cy.get('[data-cy="password-input"]').type("123");
        cy.get(".error").should("have.length", 2);
        cy.get('[data-cy="password-error"]').should("be.visible");
        cy.get('[data-cy="submit-button"]').should("be.disabled");
      });
  
      it("email ve password doğru ama şartlar kabul edilmediğinde", () => {
        cy.get('[data-cy="email-input"]').type("test@example.com");
        cy.get('[data-cy="password-input"]').type("Sifre1234");
        cy.get('[data-cy="submit-button"]').should("be.disabled");
      });
    });
  });
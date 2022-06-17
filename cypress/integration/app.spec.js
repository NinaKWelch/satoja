const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set

describe("Login", function () {
  // beforeEach(async function(){
  //   await cy.request("POST", "http://localhost:3003/api/test/reset")
  // })

  it("front page can be opened", function () {
    cy.visit("http://localhost:3003")
    cy.contains("Tunne tuottaja!")
  })
  it("can login and logout", async function () {
    await cy.request("POST", "http://localhost:3003/api/users", {
      firstname: "TestiEtunimi",
      lastname: "TestiSukunimi",
      email: "testi@email.com",
      phonenumber: "4923i4923",
      password: "12345678",
    })

    cy.visit("http://localhost:3003")
    cy.get("#user-email").type("testi@email.com")
    cy.get("#user-password").type("12345678")
    cy.get("#login-button").click()
    cy.contains("Kirjaudu ulos")
    cy.get("#logout-button").click()
    cy.contains("Tunne tuottaja!")
  })
})

describe("Adding Product", function () {
  it("can add product", async function () {
    await cy.request("POST", "http://localhost:3003/api/users", {
      firstname: "TestiEtunimi",
      lastname: "TestiSukunimi",
      email: "testi@email.com",
      phonenumber: "4923i4923",
      password: "12345678",
    })

    await cy.request("POST", "http://localhost:3003/api/auth/email", {
      email: "testi@email.com",
      password: "12345678",
    })

    cy.visit("http://localhost:3003")
    cy.get("#seller-button").click()
    cy.get("#add-link").click()
    cy.get("#title").type("TestiOtsikko")
    cy.get("#description").type("Testikuvaus")
    cy.get("#organic-checkbox").click()
    cy.contains("Valitse kategoria").click()
    cy.contains("Munat").click()
    cy.contains("Valitse yksikkö").click()
    cy.contains("Kg").click()
    cy.get('input[type="range"]').then(($range) => {
      // get the DOM node
      const range = $range[0]
      // set the value manually
      nativeInputValueSetter.call(range, 15)
      // now dispatch the event
      range.dispatchEvent(new Event("change", { value: 15, bubbles: true }))
    })
    cy.contains("Tilaus sulkeutuu 15 ennen noutotilaisuuden alkua")
    cy.contains("Poista tuoterivi").click()
    cy.contains("Lisää tuoterivi").click()
    cy.contains("Poista tuoterivi").click()
    cy.contains("Lisää tuoterivi").click()
    cy.get("#unit_price").type("10")
  })
})

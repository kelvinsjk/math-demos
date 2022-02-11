/// <reference types="cypress" />
describe('home page runs', ()=>{
  it('should start', ()=>{
    // visit homepage
    cy.visit('/');
    // button for Fraction Arithmetic
    cy.contains('Arithmetic');
    // katex is working
    cy.get('.katex').contains('x');
    // mathlive is present
    cy.get('math-field').should('be.visible');
  })
})

describe('fraction arithmetic', ()=>{
  it('should navigate', ()=>{
    // visit homepage
    cy.visit('/');
    // click button to navigate
    cy.contains('Arithmetic').click();
    // checks url
    cy.url().should('include', 'fractions');
  })
})


const raf = require('raf') //fix raf warning, redux!

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router';

// Console errors cause test failures
console['error'] = (errorMessage) => { 
  if(typeof errorMessage === "string"){ //why is sometimes not a string?
    expect(errorMessage.split('\n', 1)[0]).toBe("") 
  }
}

//solution classes
import App from  './src/components/App';
import { AboutNav } from './src/components/Nav';

/* Begin the tests */

describe('The single-page pet adoption app', () => {   

  it('shows the About Page at the correct route', () => {
    render(<MemoryRouter initialEntries={['/about']}><App/></MemoryRouter>);
    expect(screen.getByText("Here is some information about us. Lorem ipsum dolor sit amet, consectetur adipisicing.")).toBeInTheDocument()
    expect(screen.queryByText("Interested in adopting a pet?")).not.toBeInTheDocument() //not nested
    expect(screen.queryByText("Dogs for Adoption")).not.toBeInTheDocument() //replaced pet list
  })

  it('shows the Resources Page at the correct route', () => {
    render(<MemoryRouter initialEntries={['/resources']}><App/></MemoryRouter>);
    expect(screen.getByText("Below are a list of Community Support links from the Seattle Human Society.")).toBeInTheDocument()
    expect(screen.queryByText("Interested in adopting a pet?")).not.toBeInTheDocument() //not nested
  })

  it('shows the Pet Page at the correct route', () => {
    render(<MemoryRouter initialEntries={['/adopt']}><App/></MemoryRouter>);
    expect(screen.getByText("Interested in adopting a pet?")).toBeInTheDocument()
  })

  it('shows the Pet List at the correct route', () => {
    render(<MemoryRouter initialEntries={['/adopt']}><App/></MemoryRouter>);
    expect(screen.getByText("Interested in adopting a pet?")).toBeInTheDocument() //nested
    expect(screen.getByText("Dogs for Adoption")).toBeInTheDocument()

    expect(screen.getAllByRole('heading', {level: 3}).length).toBe(5); //show 5 dog names
    expect(screen.getByText('Spot')).toBeInTheDocument(); //spot check name    
  })

  it('redirects to the root on an invalid route', () => {
    render(<MemoryRouter initialEntries={['/error']}><App/></MemoryRouter>);
    expect(screen.getByText("Dogs for Adoption")).toBeInTheDocument() //shows PetList
  })

  it('includes a Link in the header', async () => {
    const {container} = render(<MemoryRouter initialEntries={['/about']}><App/></MemoryRouter>);
    const link = container.querySelector('h1 > a');
    await userEvent.click(link); //click link
    expect(screen.getByText("Dogs for Adoption")).toBeInTheDocument() //shows PetList now
  })

  it('contains highlighted navigation links', async () => {
    render(<MemoryRouter initialEntries={['/adopt']}><AboutNav/></MemoryRouter>);

    await userEvent.click(screen.getByText("About Us")) //click on the about link
    expect(screen.getByText("About Us")).toHaveClass('active');
    expect(screen.getByText("Adopt a Pet")).not.toHaveClass('active');

    await userEvent.click(screen.getByText("Adopt a Pet")) //click on the adopt link
    expect(screen.getByText("Adopt a Pet")).toHaveClass('active');
    expect(screen.getByText("Resources")).not.toHaveClass('active');

    await userEvent.click(screen.getByText("Resources")) //click on the resources link
    expect(screen.getByText("Resources")).toHaveClass('active');
    expect(screen.getByText("About Us")).not.toHaveClass('active');
  })

  it('shows Pet detail pages at the correct route', () => {
    const spotComponent = render(<MemoryRouter initialEntries={['/adopt/Spot']}><App/></MemoryRouter>);
    expect(screen.getByText("Interested in adopting a pet?")).toBeInTheDocument() //nested

    expect(screen.getByText("Adopt Spot")).toBeInTheDocument(); //shows correct dog
    expect(screen.getByText("Female Terrier")).toBeInTheDocument(); //includes details for correct dog

    spotComponent.unmount();
  
    const sparkyComponent = render(<MemoryRouter initialEntries={['/adopt/Sparky']}><App/></MemoryRouter>);
    expect(screen.getByText("Adopt Sparky")).toBeInTheDocument(); //shows correct dog
    expect(screen.getByText("Female Husky")).toBeInTheDocument(); //includes details for correct dog

    sparkyComponent.unmount();

    render(<MemoryRouter initialEntries={['/adopt/missing']}><App/></MemoryRouter>);
    expect(screen.getByText("No pet specified")).toBeInTheDocument();
  })

  it('navigates to pet details pages on button clicks', async () => {
    render(<MemoryRouter initialEntries={['/adopt']}><App/></MemoryRouter>);

    await userEvent.click(screen.getByText("Meet Spot"))
    expect(screen.getByText("Adopt Spot")).toBeInTheDocument(); //shows correct dog

    await userEvent.click(screen.getAllByText("Adopt a Pet")[0]) //click title

    await userEvent.click(screen.getByText("Meet Rover"))
    expect(screen.getByText("Adopt Rover")).toBeInTheDocument(); //shows correct dog
  })
})

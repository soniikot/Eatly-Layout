
# Vite.js setup for creating layouts using 
 

the 7-1 architecture pattern and sticking to Sass Guidelines writing conventions.

Read more: [Sass Boilerplate](https://github.com/KittyGiraudel/sass-boilerplate/tree/master)

## Project Setup

This project is set up using Vite.js for fast development and build processes. It follows the 7-1 architecture pattern for organizing Sass files, ensuring maintainability and scalability in your stylesheets.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone the repository:
   ```sh
    git clone https://github.com/Taneros/vite-for-making-layouts <folder-name>
    cd <folder-name>

2. Install dependencies:
    ```sh
    npm install

### Available Scripts

In the project directory, you can run:

* Development Server:
    ```sh
    npm run dev

* Build:
    ```sh
    npm run build

* Preview:
   ```sh
    npm run preview

### Project Structure

This project uses the 7-1 Sass architecture pattern, which organizes stylesheets into separate directories based on their purpose. Here’s a brief overview:

base/: Global styles, such as resets, typography, etc.

components/: Reusable components, such as buttons, cards, etc.

layout/: Styles related to the layout, such as header, 
footer, grid system, etc.

pages/: Page-specific styles.

themes/: Theme-related styles.

utils/: Helper functions, mixins, and variables.

vendors/: Third-party stylesheets.

Learn More
For more details on the 7-1 architecture pattern and Sass guidelines, visit the Sass Boilerplate repository.
=======
In this project I am recreating responsible website with this layout (https://www.figma.com/design/jHDVsiVR8JBpkMsYehKCEj/Eatly?node-id=1-11265)

I am using SCSS, Bite and BEM to divide code in modules and make it easier to mantain.





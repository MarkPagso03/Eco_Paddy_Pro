# Eco Paddy Pro 🌾

Eco Paddy Pro is a browser-based calculator designed to estimate
greenhouse-gas (GHG) emissions associated with rice-farming activities.
Users enter farm and agricultural-input data, select irrigated or
rainfed cultivation, calculate estimated emissions, view a chart of
emission categories, and export a PDF report.

> **Important:** Results depend on the emission factors and assumptions
> implemented in the JavaScript calculation logic. Verify those factors
> against the project's intended scientific methodology before using
> results for research, policy, or operational decisions.

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [How It Works](#how-it-works)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Using the Application](#using-the-application)
-   [Calculation Notes and
    Limitations](#calculation-notes-and-limitations)
-   [Troubleshooting](#troubleshooting)
-   [Development and Contributions](#development-and-contributions)
-   [License](#license)
-   [Author](#author)

## Overview

Rice cultivation can involve emissions from agricultural inputs,
machinery and fuel use, soil processes, irrigation, and residue
management. Eco Paddy Pro organizes selected farming data into an
estimate of greenhouse-gas emissions, helping users inspect how
different categories contribute to the total.

The current repository implements a **client-side web application**
using HTML, CSS, and JavaScript. It does not require a separate
application server or database for its main calculation workflow.

## Features

-   **Farm information:** Enter harvested area, cultivation period, and
    yield.
-   **Agricultural inputs:** Enter seed, pesticide, fertilizer, manure,
    and compost quantities.
-   **Farm operations:** Record machinery hours and fuel consumption for
    land preparation, transplanting, harvesting, threshing, and
    irrigation pumping.
-   **Cultivation and soil inputs:** Enter cultivation days for rice
    grown with or without straw and provide straw-burning data.
-   **Cultivation type:** Select irrigated or rainfed cultivation.
-   **Emission summary:** Display category-level estimates, total
    emissions, and emissions per hectare.
-   **Chart visualization:** Compare selected emission categories in a
    bar chart.
-   **PDF export:** Generate a PDF report containing a results table and
    chart.
-   **Responsive interface:** Includes a stylesheet for screens up to
    600 pixels wide.

## Technology Stack

  ----------------------------------------------------------------------------------------------------------
  Technology                                                             Purpose
  ---------------------------------------------------------------------- -----------------------------------
  HTML5                                                                  Page structure, input fields,
                                                                         results table, and chart canvas

  CSS3                                                                   Layout, styling, and responsive
                                                                         presentation

  JavaScript                                                             Input handling, calculation logic,
                                                                         page interactions, and report
                                                                         generation

  [Chart.js](https://www.chartjs.org/)                                   Bar-chart visualization

  [jsPDF](https://github.com/parallax/jsPDF)                             Client-side PDF generation

  [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)   Tabular report formatting

  Google Fonts                                                           Typography
  ----------------------------------------------------------------------------------------------------------

Chart.js, jsPDF, jsPDF-AutoTable, and Google Fonts are referenced
externally. An internet connection is therefore needed to load these
resources when they are not otherwise cached.

## How It Works

1.  The user opens the welcome page and selects **Calculate**.
2.  The application presents input fields for farm characteristics and
    agricultural activities.
3.  The user enters values and chooses **Irrigated** or **Rainfed**
    cultivation.
4.  Selecting **Compute** opens a confirmation prompt.
5.  After confirmation, JavaScript reads the input values and applies
    the emission factors currently defined in `static/js/script.js`.
6.  The results table and bar chart are updated.
7.  The user can select the PDF download control to export the report.

The current implementation calculates in the browser. The repository
does not show a backend API or database requirement for this workflow.

## Project Structure

The main files referenced by the current HTML page are:

``` text
Eco_Paddy_Pro/
├── index.html
└── static/
    ├── css/
    │   ├── style.css
    │   └── style@600.css
    ├── js/
    │   └── script.js
    └── images/
        ├── logo and favicon assets
        ├── rice.jpg
        └── other interface images
```

The image directory listing above is illustrative of the asset paths
referenced by `index.html`; filenames may vary. Keep the existing
repository assets and their relative paths intact.

### File responsibilities

-   `index.html` --- welcome page, farming input interface, results
    table, chart canvas, and external library references.
-   `static/css/style.css` --- primary interface styles.
-   `static/css/style@600.css` --- responsive styles for narrower
    screens.
-   `static/js/script.js` --- page switching, input handling, emission
    calculations, chart creation, and PDF export.
-   `static/images/` --- branding and visual assets used by the
    interface.

## Getting Started

### Requirements

-   A modern web browser.
-   Git, if cloning the repository.
-   Internet access to load externally hosted fonts and JavaScript
    libraries.

### Option 1: Download the repository

1.  Open the [Eco Paddy Pro
    repository](https://github.com/MarkPagso03/Eco_Paddy_Pro).
2.  Select **Code → Download ZIP**.
3.  Extract the ZIP file.
4.  Open `index.html` in a modern browser.

### Option 2: Clone with Git

``` bash
git clone https://github.com/MarkPagso03/Eco_Paddy_Pro.git
cd Eco_Paddy_Pro
```

Open `index.html` in your browser.

### Option 3: Run a local development server

If direct file opening causes browser restrictions or asset-loading
issues, run a local static server from the project directory. For
example, if Python is installed:

``` bash
python -m http.server 8000
```

Then visit:

``` text
http://localhost:8000
```

Stop the server with `Ctrl+C`.

No package installation or build command is defined by the current
repository structure. The project references its front-end libraries
through CDN URLs.

## Using the Application

1.  Start on the welcome page and select **Calculate**.
2.  Enter the harvested area and the available farm activity inputs.
3.  Use the units displayed beside each input field.
4.  Choose the appropriate cultivation type: **Irrigated** or
    **Rainfed**.
5.  Select **Compute**, then confirm the calculation.
6.  Review the results table and emissions chart.
7.  Select the PDF download control to save a report.

Follow the in-app fertilizer reminder carefully. Avoid entering the same
fertilizer amount as additional fertilizer in multiple fields unless the
calculation methodology explicitly requires it.

## Calculation Notes and Limitations

-   **Estimates, not measurements:** Results are calculated estimates
    and should not be interpreted as direct measurements of emissions.
-   **Emission-factor provenance:** The current JavaScript contains
    hard-coded factors. Their authoritative sources, version, geographic
    applicability, and assumptions should be documented before the
    calculator is used for formal reporting.
-   **Input relevance:** The interface collects cultivation-period and
    yield values, but the current calculation routine does not appear to
    use those values in the emissions total. Confirm the intended model
    before relying on them.
-   **Area validation:** Ensure harvested area is greater than zero. The
    current calculation routine divides total emissions by harvested
    area when calculating emissions per hectare.
-   **Input validation:** Validate negative values, missing required
    values, and unreasonable quantities before interpreting the results.
-   **Browser-only processing:** The main workflow runs in the browser;
    the repository does not provide server-side persistence or user
    accounts.
-   **External libraries:** CDN availability and network access can
    affect fonts, charts, and PDF generation.
-   **PDF layout:** Long tables and charts should be tested for page
    overflow and print readability.

For scientific or institutional use, publish the calculation
methodology, list each emission factor with its source and units,
describe assumptions, and test results against independently verified
examples.

## Troubleshooting

### The page is unstyled or images are missing

-   Keep the `static/` directory alongside `index.html`.
-   Check that filenames and relative paths match the repository,
    including capitalization.
-   Check the browser console for failed asset requests.

### The chart does not appear

-   Confirm that the browser can load Chart.js from its CDN.
-   Open Developer Tools and check the Console for JavaScript errors.
-   Confirm that calculation completes after the confirmation prompt.

### PDF export does not work

-   Check internet access to the jsPDF and AutoTable CDN resources.
-   Review the browser console for errors.
-   Try a current version of a mainstream browser.

### The emissions-per-hectare result is invalid

-   Enter a harvested area greater than zero.
-   Check that all quantities use the units shown in the form.
-   Review the formula and emission-factor assumptions before using the
    result.

## Development and Contributions

Contributions that improve correctness, usability, accessibility,
maintainability, and documentation are welcome.

Suggested improvements include:

-   Documenting the scientific source and units for each emission
    factor.
-   Validating inputs and preventing division by zero.
-   Clarifying or using all collected inputs, including cultivation
    period and yield.
-   Separating calculation logic from DOM manipulation.
-   Adding automated tests with known input/output cases.
-   Improving PDF pagination and report metadata.
-   Adding an explicit methodology and limitations section in the
    interface.

For a proposed change, describe the issue, explain the expected
behavior, and provide test cases where possible.

## License

***

## Author

**MarkPagso03**

-   GitHub: [@MarkPagso03](https://github.com/MarkPagso03)
-   Repository:
    [Eco_Paddy_Pro](https://github.com/MarkPagso03/Eco_Paddy_Pro)

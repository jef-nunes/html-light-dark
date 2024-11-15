// MIT License
// Copyright (c) 2024 Jeferson

// Structure for the ColorScheme constructor argument object:
 interface ColorSchemeInit {
    documentRef: Document,  // references the "document" variable
    lightCSS: HTMLElement,  // references the "light" CSS stylesheet
    darkCSS: HTMLElement,   // references the "dark" CSS stylesheet
    defaultScheme: string,  // choose between "light" or "dark" if not defined, the default is "light"
    schemeButton: HTMLButtonElement, // the button that triggers the color scheme change
  }

// Example usage:
// const colorScheme = new ColorScheme({
//   documentRef: document,
//   windowRef: window,
//   lightCSS: document.getElementById("light-css"),
//   darkCSS: document.getElementById("dark-css"),
//   schemeButton: document.getElementById("bt-change-scheme")
// })


// Class containing the light/dark color scheme logic
export class ColorScheme {
    constructor(settings: ColorSchemeInit) {
        if (!settings) {
            throw new Error("ColorScheme: No arguments provided");
        }

        // References to the HTML document and the CSS stylesheets
        this.documentRef = settings.documentRef;
        const _lightCSS = settings.lightCSS;
        const _darkCSS = settings.darkCSS;

        // Throws an error if the CSS elements are not found
        if (!_lightCSS || !_darkCSS) {
            throw new Error("CSS elements not found");
        }

        this.lightCSS = _lightCSS;
        this.darkCSS = _darkCSS;

        // Sets the default color scheme if none is provided
        if (settings.defaultScheme === null || settings.defaultScheme === undefined) {
            this.defaultScheme = "dark";
        }
        this.defaultScheme = settings.defaultScheme;

        // Ensures that the default scheme is either "dark" or "light"
        if (this.defaultScheme !== "dark" && this.defaultScheme !== "light") {
            this.defaultScheme = "light";
        }

        this.schemeButton = settings.schemeButton;
        this.isDarkMode = (this.defaultScheme === "dark");

        // Apply the initial scheme without toggling
        this.useScheme({ skipToggle: true });

        // Add event listener to the button to toggle the color scheme
        this.schemeButton.addEventListener("click", () => { 
            this.useScheme({}); 
        });
    }

    // Function to apply the current color scheme
    public useScheme(args: object) {
        // Toggle the scheme if not skipping the toggle action
        if (!args.skipToggle) {
            this.isDarkMode = !this.isDarkMode;
        }

        // Apply the dark scheme if enabled
        if (this.isDarkMode) {
            this.lightCSS.disabled = true;
            this.darkCSS.disabled = false;
        } else {
            this.lightCSS.disabled = false;
            this.darkCSS.disabled = true;
        }
    }

    // Function to apply the browser's preferred color scheme (dark or light)
    public useBrowserTheme(windowRef: Window){
        const browserDarkMode = windowRef.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = browserDarkMode;
        this.useScheme({ skipToggle: true });
    }
}

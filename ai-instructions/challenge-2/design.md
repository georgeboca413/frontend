**Overall color design**

The overall design of the website should be as follows, There should not be any color in the website with the following exceptions:
    - #000000 for the background of the website
    - bg-orange-500/20 or text-orange-500 for highlighted text or items.
    - for the agent network tab or operations tab, the risks should use a gradient from #ffffff to bg-orange-500 to #ff00000 for risks ranging from "Low" to "Medium", "High" "Critical" 
    - card background color should be bg-neutral-900
    - while the color of big text/main text is white, the color of the smaller text / second header is text-neutral-400

For the cards that include operations like "Compromised" or "Critical Threats", the icon, text and the number included should all be red.

The progress bar progress should use the mentioned orange color while the background of the progress bar should use bg-neutral-800.
In the systems monitor page, the icon for each card should be white and not any shade of gray. For the server cards the online text should have a gray outline.

When pressing on any server in the systems tab, a new card opens in the middle, there is a bug there where the last two buttons named "View Logs' and "Schedule Maintenance" are completely blacked out and should instead be the card color, a.k.a bg-neutral-900

For the intelligence tab, on any card, for example "Network Analysis", the tags named "international", "financial", "cybercrime", their outline should not be transparent but a whiter color bg-neutral-800

**LAYOUT PROBLEMS AND FIXES**
 
Be careful so that the navigation bar doesn't cover any information on each page, it may cover the buttons and titles and i dont want that.
On the operations page when i click on the card i want to see also 3 buttons on the bottom left of the card : 1. Update Status inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white , 2. View Reports wtih inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent and 3.Assign Agents same as View Reports
 
 
On the SYSTEMS page when you click the card be careful that the buttons View Logs and Scheudle Maintance to have the following structure inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent  

 
**Typography**
    Base font: [e.g., Inter or system font stack]
    Headings: Consistent hierarchy (h1, h2, h3)
    Body text: Clear, readable font size
    Avoid using more than two font weights in one component
 
###
/* -------------------------
   Font Families
------------------------- */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
}
 
/* -------------------------
   Font Sizes & Line Heights
------------------------- */
.text-xs    { font-size: 0.75rem; line-height: 1rem; }
.text-sm    { font-size: 0.875rem; line-height: 1.25rem; }
.text-base  { font-size: 1rem; line-height: 1.5rem; }
.text-lg    { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl    { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl   { font-size: 1.5rem; line-height: 2rem; }
.text-3xl   { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl   { font-size: 2.25rem; line-height: 2.5rem; }
.text-\[0\.8rem\] { font-size: 0.8rem; } /* custom size */
 
/* -------------------------
   Font Weights
------------------------- */
.font-normal     { font-weight: 400; }
.font-medium     { font-weight: 500; }
.font-semibold   { font-weight: 600; }
.font-bold       { font-weight: 700; }
 
/* -------------------------
   Text Alignment
------------------------- */
.text-left   { text-align: left; }
.text-center { text-align: center; }
 
/* -------------------------
   Text Transformations
------------------------- */
.uppercase { text-transform: uppercase; }
 
/* -------------------------
   Line Height Utilities
------------------------- */
.leading-none    { line-height: 1; }
.leading-relaxed { line-height: 1.625; }
 
/* -------------------------
   Letter Spacing (Tracking)
------------------------- */
.tracking-tight   { letter-spacing: -0.025em; }
.tracking-wider   { letter-spacing: 0.05em; }
.tracking-widest  { letter-spacing: 0.1em; }
 
/* -------------------------
   Placeholder Styling
------------------------- */
.placeholder-neutral-400::placeholder {
  color: rgb(163 163 163 / 1);
}
 
/* -------------------------
   Underline Utility
------------------------- */
.underline-offset-4 {
  text-underline-offset: 4px;
}
 
/* -------------------------
   Font Smoothing
------------------------- */
.antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
 
/* -------------------------
   Numeric Spacing
------------------------- */
.tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
 
**intelligence layout fix**
 
on the intelligence page make sure the name of the tab in the top left corner is visible(and not placed under the top bar) same for the 2 buttons.
 
On the next line make sure the search and the 3 counter occupy the full line and all are in an area of its own(4 in total)
 
On the inteligence reports make sure the tags how secret is the report( top secret, secret, confidential)the one for importance ( medium critical, high)and the one for the status( verified , pending etc.) are place on the same line and the rest of the detail one under the other)
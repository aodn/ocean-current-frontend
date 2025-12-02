You are an expert QA Automation Engineer. We need to implement E2E tests for the IMOS Live application (https://oceancurrent.production.aodn.org.au/) using Playwright.
We have two sets of test cases to implement: **Home Page** and **Detail Page**.
### Home Page Test Cases
```csv
Test Case ID,Title,Description,Preconditions,Steps,Expected Result
TC001,Ocean Current Page Loads Successfully,"Verify that the Ocean current page loads without errors and all main elements are visible.",User is logged in and has access to the Ocean current page.,"Navigate to the Ocean current page URL. | Wait for the page to fully load.","Ocean current page loads successfully without errors. | Top header with dropdown menus is visible. | Map is displayed on the home page. | Zoom In and Zoom Out buttons are visible. | Bottom horizontal scroll bar is visible."
TC002,Top Header Dropdown Menus Display Correctly,"Verify that the top header displays dropdown menus for Maps, In-water, News, Guided tour, and Legacy site.",Ocean current page is loaded.,"Locate the top header menu. | Check for presence of dropdown menus labeled Maps, In-water, News, Guided tour, and Legacy site.","All five dropdown menus (Maps, In-water, News, Guided tour, Legacy site) are present and visible in the top header."
TC003,Hovering on Maps Dropdown Displays Correct Suboptions,"Verify that hovering over the Maps dropdown displays suboptions such as 4 hour SST, daily SST, etc.",Ocean current page is loaded.,"Hover mouse pointer over the Maps dropdown menu in the top header.","Suboptions under Maps dropdown appear, including 4 hour SST, daily SST, and other relevant categories."
TC004,Hovering on In-water Dropdown Displays Correct Suboptions,"Verify that hovering over the In-water dropdown displays suboptions such as Argo, gliders, Tidal current, etc.",Ocean current page is loaded.,"Hover mouse pointer over the In-water dropdown menu in the top header.","Suboptions under In-water dropdown appear, including Argo, gliders, Tidal current, and other relevant categories."
TC005,News Button Opens IMOS Ocean Current News Page,"Verify that clicking the News button opens the IMOS ocean current news page in the same or new tab.",Ocean current page is loaded.,"Click on the News button in the top header.","IMOS ocean current news page opens successfully. | Page content corresponds to ocean current news."
TC006,Map Displays with Animated Subcategory Options,"Verify that the map on the home page displays with animated subcategory options that change every 3 seconds.",Ocean current page is loaded.,"Observe the map area on the home page. | Watch the subcategory options displayed on the map for 3 seconds animation","Map is visible and functional. | Subcategory options animate and change automatically every 3 seconds."
TC007,Zoom In Button Works for Mapbox Map,"Verify that clicking the Zoom In button increases the zoom level on the Mapbox map.",Ocean current page is loaded with map visible.,"Locate the Zoom In button top right of the map. | Click the Zoom In button once > Observe the map zoom level.","Zoom level increases appropriately after clicking Zoom In."
TC008,Zoom Out Button Works for Mapbox Map,"Verify that clicking the Zoom Out button decreases the zoom level on the Mapbox map.",Ocean current page is loaded with map visible.,"Locate the Zoom Out button top right of the map. | Click the Zoom Out button once > Observe the map zoom level.","Zoom level decreases appropriately after clicking Zoom Out."
TC009,Clicking on Region Box Opens Related Category Detail,"Verify that clicking on a region box on the map opens the related category detail for the selected region.",Ocean current page is loaded with map visible and regions displayed.,"Identify a region box on the map. | Click on the region box.","Related category detail page or panel for the selected region opens. | Details correspond to the selected region’s ocean current data."
TC010,Bottom Horizontal Scroll Displays Maps and In-water Subcategories,"Verify that the bottom horizontal scroll bar displays subcategories of Maps and In-water categories.",Ocean current page is loaded.,"Locate the bottom horizontal scroll bar on the page. | Scroll through the horizontal scroll bar > Observe the subcategories displayed.","Subcategories related to Maps and In-water categories are visible in the scroll bar. | Subcategories correspond to those in the top header dropdowns."
TC011,Clicking Bottom Scroll Subcategory Opens Selected Category Details,"Verify that clicking on a subcategory in the bottom horizontal scroll opens the selected category details.",Ocean current page is loaded with bottom horizontal scroll visible.,"Scroll to a subcategory under Maps or In-water in the bottom horizontal scroll. | Click on the subcategory.","Selected category detail page or panel opens. | Details correspond to the clicked subcategory."
```
### Detail Page Test Cases
```csv
Test Case ID,Title,Description,Preconditions,Steps,Expected Result
TC-767,Open Category Details Page from Home Page,"Verify that clicking on any category from the home page opens the details page for that particular category.",User is on the home page with categories displayed.,"Navigate to the home page. | Click on a category from the list of categories displayed.","The details page for the selected category opens.The page displays region boxes on the map corresponding to the selected category."
TC-768,Display Region Boxes on Map for Selected Category,"Verify that the details page displays region boxes on the map for the selected category.",User has opened a category details page.,"Observe the map area on the category details page.","Region boxes are displayed on the map representing different regions for the selected category."
TC-769,Open Data Details and Image by Clicking Region Box,"Verify that clicking on any region box opens data details and an image for that particular category and region.",User is on the category details page with region boxes visible on the map.,"Click on any region box displayed on the map.","Data details related to the selected region and category are displayed. | Map image/GIF relevant to the selected category and region is shown."
TC-770,Date Selector Default to Latest Available Data Date,"Verify that the date selector on top defaults to the latest available data date when the category details page is opened.",User is on the category details page for specific region.,"Observe the date selector on the top of the page.","The date selector displays the latest available data date by default."
TC-771,Change Date Using Date Selector,"Verify that the user can change the date using the date selector and the data image updates accordingly.",User is on the category details page with date selector visible.,"Click on the date selector. | Select a different valid date from the available options.","The selected date is updated in the date selector. | The data details and map update to reflect data for the selected date."
TC-772,Refresh Button Resets Date to Latest Available Data Date,"Verify that clicking the refresh button after changing the date resets the date selector to the latest available data date.",User is on the category details page and has changed the date using the date selector.,"Click the refresh button located after the date selector.","The date selector resets to the latest available data date."
TC-773,Left Arrow Changes Date to Previous Available Data,"Verify that clicking the left arrow changes the date to the previous available data time.",User is on the category details page.,"Click the left arrow beside the date selector.","The date changes to the previous available data time and updates the data accordingly."
TC-774,Right Arrow Changes Date to Next Available Data,"Verify that clicking the right arrow changes the date to the next available data time.",User is on the category details page.,"Click the right arrow beside the date selector.","The date changes to the next available data time and updates the data accordingly."
```
**Implementation Guide:**
Here are the suggested implementation steps for each test case.
#### Home Page Tests
*   **TC001: Ocean Current Page Loads Successfully**
    *   Navigate to `https://oceancurrent.production.aodn.org.au/`.
    *   Verify `title` or main header.
    *   Verify Map container is visible.
    *   Verify Header menu (Maps, In-water, etc.) is visible.
    *   Verify Bottom scroll bar is visible.
*   **TC002: Top Header Dropdown Menus Display Correctly**
    *   Locate the header nav.
    *   Verify texts: "Maps", "In-water", "News", "Guided tour", "Legacy site".
*   **TC003 & TC004: Hovering on Dropdowns**
    *   Hover over "Maps". Verify sub-menu appears with "4 hour SST", etc.
    *   Hover over "In-water". Verify sub-menu appears with "Argo", "Gliders", etc.
*   **TC005: News Button**
    *   Click "News".
    *   Verify it opens the news page (check URL or new tab).
*   **TC006: Map Displays with Animated Subcategory Options**
    *   Observe the map.
    *   Wait for a few seconds.
    *   Verify that the overlay text/content on the map changes (indicating animation).
*   **TC007 & TC008: Zoom In/Out**
    *   Click Zoom In (+). Check zoom level or map scale change.
    *   Click Zoom Out (-). Check zoom level or map scale change.
*   **TC009: Clicking on Region Box Opens Related Category Detail**
    *   Click on a region box on the map (e.g., a rectangle overlay).
    *   Verify URL changes to a detail page or a panel opens.
*   **TC010: Bottom Horizontal Scroll**
    *   Scroll the bottom bar.
    *   Verify items like "Maps" and "In-water" subcategories are present.
*   **TC011: Clicking Bottom Scroll Subcategory**
    *   Click an item in the bottom scroll (e.g., "SST").
    *   Verify it navigates to the detail page for that category.
#### Detail Page Tests
*   **TC-767: Open Category Details Page from Home Page**
    *   Start at Home.
    *   Click a category (e.g., "SST").
    *   Verify URL contains the category name.
    *   Verify map shows region boxes.
*   **TC-768: Display Region Boxes on Map**
    *   On a category page, verify region boxes (polygons/rectangles) are rendered on the map.
*   **TC-769: Open Data Details and Image by Clicking Region Box**
    *   Click a region box.
    *   Verify a data panel/image loads for that specific region.
*   **TC-770: Date Selector Default**
    *   Open a region detail.
    *   Check the date picker value.
    *   Compare it with "today" or the latest expected date (might need to fetch latest date from API or assume it's recent).
*   **TC-771: Change Date**
    *   Open date picker.
    *   Select a past date.
    *   Verify the displayed image/data updates.
*   **TC-772: Refresh Button**
    *   Change date (as in TC-771).
    *   Click "Refresh" (or "Reset") button next to date.
    *   Verify date returns to the default (latest).
*   **TC-773 & TC-774: Arrow Navigation**
    *   Click Left Arrow (<). Verify date goes back one step.
    *   Click Right Arrow (>). Verify date goes forward one step.
**Your Task:**
1.  Use the existing Playwright project.
2.  Create new test files: `tests/home-page.spec.ts` and `tests/detail-page.spec.ts`.
3.  **Implement the test cases one by one**, following the order above.
4.  Follow the **Implementation Guide** for logic.
5.  After implementing a test, run it to verify it passes.

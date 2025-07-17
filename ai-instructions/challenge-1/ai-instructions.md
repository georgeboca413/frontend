**Overview**

For the provided project, please generate a website for completing cybersecurity missions. The website should be used to get our agents information, command center info, etc. Please note that the project is in dark mode but highlighted text, selected objects and anything that should stand out is orange. The project is also made as art so please use random data and don't expect any api or back-end to give the data.

**Page Structure**

The website should have a gray navigation bar that always sits on top of the page, on the navigation bar, there is a text saying what page we are currently on, there is also another text on the right of it saying when the information was last updated on the website (mock-up). On the navigation bar there is also an icon of the user (just a normal default icon) and his name ("Demo User"), on the right of the username it says "ADMIN". There are three buttons on the right of the navbar: notifications, refresh and exit. They shouldn't do anything right now.

On the left of the page there should be a menu, on top of the menu it's the logo: "TACTICAL OPS" and a little text saying "v2.1.7 classified" on which we could select out of 5 pages: "Command Center", "Agent Network", "Operations", "Intelligence", "Systems". The user shoud be able to pick one of them and navigate to the desired page. Please note, that the left menu and the navigation bar never changes, just the rest of the page with the needed information. On the menu next to the logo there is a button where we can minimize the menu only showing the icons of each page and hiding the rest. On the menu there is also a small box saying "System Online", with Uptime, Active Agents and how many Missions are active (all mock-up information). The color of the menu is a bit darker than that of the navigation bar, but lighter than the background.


**Command Center Page**
As we use Shadcn please use the needed cards and components to generate this page. There are a total of 5 cards on this page:
    - The title of the first one is "AGENT ALLOCATION", where we can see how many active agents we have. there should be three big numbers: Agents active in the field, Undercover agents, Training agents. In the same card but under these numbers we should be able to see the newest agents added, with they name (example: G-078W) and their codename (example: VENGEFUL SPIRIT)
    - The second card should be on the right of the first, it's named "ACTIVITIY LOG", in there we can see the latest activity completed by the agents. For each activity we should be able to see the date at which it was completed, and the text with the completed activity (For example: "Agent dragon_vein extracted high-value target in Cairo"). On the card there should be enough activities where we can scroll with the mouse through them vertically. 
    - The third card is on the right of the second one and is named "Encrypted Chat Activity". In which we have an image of a radar and the following text. "# 2025-06-17 14:23 UTC > [AGT:gh0stfire] ::: INIT >> ^^^ loading secure channel > CH#2 | 1231.9082464.500...xR3 > KEY LOCKED > MSG >> "...mission override initiated... awaiting delta node clearance". You may use the same text or generate a new one that should look like a hacker terminal
    - The fourth card should be under the ones i mentioned before and should be named "MISSION ACTIVITY OVERVIEW". On it is a graph, for the content of the graph there should only be mock-up information. The x-axis of the graph is a date, spanning from Jan 28, 2025 to Feb 28, 2025, the y-axis is a maximum of 500 and increases by 100. Under the line rendered on the graph which shows the activity of the missions there is a jagged line showing just an average of the first line. Please note that this card is the size of the first two cards and is exactly under them.
    -The fifth card and the latest is named "MISSION INFORMATION", there are two columns here: "Successful Missions" and "Failed Missions". The failed text is colored Red. For both columns there are the rows, "High Risk Missions", "Medium Risk Missions", "Low Risk Missions", and some mock-up numbers on the right of them.

**Agent network page**
For the page AGENT NETWORK i want two orange buttons on the top right side (one with Deploy Agent and one with Filter). On the top left side i want the title AGENT NETWORK with bold and below without bold and a smaller size  with "Manage and monitor field operatives". The buttons and title should be on the same row. Below this i want 4 areas: 1. on the left side with "Search agents" and a input box to search that will update automatically the list of agents that will be displayed below the 4 areas, 2. after the first "ACTIVE AGENTS" with the number of it, 3. after this one with "COMPROMISED" and the number of it , 4. the last one with "IN TRAINING" and the percent. For 2, 3, and 4 choose an shield icon and color it with: 2.white, 3.red and 4.orange. Below this 4 areas will be displayed the list of agents. The title of this whole list will be AGENT ROSTER. The column will be AGENT-ID (the agent id), CODENAME (agent codename), STATUS (the status of the agent: active with a white dot on the left, STANDBY with a grey dot on the left, COMPROMISED with a red dot on the left, TRAINING with an orange dot on the left), LOCATION(with an icon that suggest the pinpoint of a map on the left), LAST SEEN(with the structure : number of minute + min ago), MISSIONS(the number of missions), RISK (the risk: HIGH with orange, MEDIUM with grey, CRITICAL with red, LOW with WHITE), ACTIONS ( with three dots on every agent and when you press it, a card will be desplayed with the name of the operation hes working on with bold, below the id of it, below these should be desplayed again the status, location, missions completed and the risk level of the agent placed on a 2x2 table without lines, and below all of these, on the bottom of the card desplayed should be an orange button with Assign Mission on the bottom left side and after this button two grey buttons with View History and Send Message) . Each agent will be desplayed based on the input of the search agents area( if its empty, display all).

**Operations page**
I want for the OPERATIONS page two orange buttons on the top right side (one with New Operation and one with Mission Brief). On the top left side i want the title OPERATIONS CENTER with bold and below without bold and a smaller size  with "Mission planning and execution oversight". The buttons and title should be on the same row. Below this i want 4 areas: 1. on the left side with "ACTIVE OPS" and the numbers of it, 2. after the first "COMPLETED" with the numbers of it, 3. after this one with "COMPROMISED" and the number of it , 4. the last one with "SUCCES RATE" and the percent. All should be on the same row. Below this 4 areas i want cards with the operation. First i want the name of it and on the same row an icon that represents the state of the operation ACTIVE, COMPLETED, COMRPOMISED. below the name i want a subname of the operation. Below this i want also the state written ACTIVE, PLANNING, COMPROMISED and a suggestive color for each one. Below these should be a description of the operation. Below those i want the location, the numbers of agents assigned, and the estimated completion time ( yyyy-mm-dd). And on the buttom of the card of the specific operation i want a progression bar. When i click on the card i want to show a biggers size of that card with more information (start date, objectives).

**Intelligence page**

On the intelligence tab whant to see the name of  the tab in the top left corner near the sidebar saing "Intelligence center" in bold and on the same line but in the right part 2 butons "new report" and "filter", one layer down in the left part we shod have a search bar wher you can searc intelligence reports a bit to the right we shod have counter that shows the total reports number more right we shod have a critical treats counter  in red and again abit to the right a active sources counter(all of the conter shod contain the name and a the curent number)
 
Ok after that down under the second layer will have a list with all the inteligence reports. The format of one intelligence report will be the following:
    - the title of the intelligence report(ex network analysis)
    - lets say an id like INT-2025-001 INT-2025-002 etc
    - a short description of the intelligence report (Detailed analysis of emerging cybercrime syndicate operating across multiple jurisdictions)
    - some tags under the description like international financial etc.
    - on the top right other kind of tags like one for how secret is the report( top secret, secret, confidential) one for importance ( medium critical, high) and one for the status( verified , pending etc.)
    -a bit down on the right we shod have one under the other the place of the report the date and the institution
    
if you click on one of the reports a pop up screen will appear with more details and 3 buttons (view full report, download and share intel)

**Systems Page**
The SYSYEMS tab looks like this:
    - the theme will be black background, a lighter black cards interior.
    - i want to have a BOLD header with the section name "SYSTEMS MONITOR", under that, i want to write "Infrastructure health and performance monitoring" smaller than the title
    - on the right side of the screen, upright, i want 2 buttons, 1 for "System scan", 1 for "Maintenance Mode", both orange color with rounded corners
    - under the header and buttons i want 4 rectangular cards, aligned in line, each card having different status info:
    - first card with the text "SYSTEMS ONLINE '/n' 24/26" with a 'check symbol';
    - second card i want it to have "Warnings", with a hazard symbol and a bold number "3" orange text;
    - 3 th card i want it to be with "AVG UPTIME", showing "99.7%" white  bold text;
    - 4th card i want it to have "maintenance", and "1" with bold white text, with a settings symbol in the right of it.
 
Under all these cards i want 6 responsive design cards, clickable, when i hover i want them to be with orange borders;
These 6 cards will have the folowing info:
    - 1. "COMMAND SERVER ALPHA"
    
    - 2. "DATABASE CLUSTER BETA"
    - 3. "SECURITY GATEWAY"
    - 4. COMMUNICATION HUB"
    - 5. "BACKUP STORAGE ARRAY"
    - 6. "ANALYTICS ENGINE"
 
all of them will have:
    - a SYSTEM HEALTH bar, varying from 76% to 98%,
    - structured in 3 columns: CPU, MEMORY, STORAGE usage bars,   varying from 1 to another
    - "Uptime" indicators in days
    - "Location:" with the folowing locations based on the cards:
        1. COMMAND SERVER ALPHA location: Data Center 1;
        2. DATABASE CLUSTER BETA
        location: Data Center 2;
        3. SECURITY GATEWAY
        location: DMZ
        4. COMMUNICATION HUB
        location: Network Core
        5. BACKUP STORAGE ARRAY
        location: Backup Facility
        6. ANALYTICS ENGINE
        location: Data Center 1;
        - "ONLINE" indicator
 
When i click on the cards will open a modal with detailed info about that card, with and exit button top right of the modal, SYSTEM STATUS
ONLINE
SYSTEM INFORMATION
Location:
Data Center 1
Uptime:
247 days
Last Maintenance:
2025-05-15
Health Score:
98%
RESOURCE USAGE
CPU Usage
45%
Memory Usage
67%
Storage Usage
34%
for example
 
I also want 3 Buttons: 1 orange "Restart System" button, and 2 black "View Logs" and "Schedule Maintenance" buttons
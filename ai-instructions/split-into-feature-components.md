# Split into feature components

## Guideline

- Start first with app/operations/page.tsx
- Split the pages that we now have in app folder into feature components.
- Create the "features" folder in root.
- Use the component exemplified in this document but don't limit yourself to them.
- Each feature should have its own folder with the components related to it.
- Use the same naming convention as the components in this document. Notice the prefix used for each component.
- Use the pattern of item and item list, meaning there should be components that display a single item using only props, then there are components that are loading the data from the api and using the item component to display the list of items.
- Notice that I've used the AI_TIP comment to exemplify how to split some components.
- Analyze the "components" folder and make sre you are not creating components that already exist.
- Shared components should be placed in "components" folder
- Use the kebab naming convention for the files.
- Use named exports for all the files.
- Do not use default exports unless it's absolutely necessary, e.g. for next.js pages.
- Use types only.
- Do not use interfaces.
- Instead of using specific names for the components props, e.g. AgentSearchProps, use a single generic name `type Props`
- Create a single component per file.
- Do not use index.ts file pattern that exports multiple components from a single file.

###

## Generic components

- <Sidebar />
- <TopBar />
- <NotificationsDropdown />
- <PageTitle />
- <PageSubtite />

## Feature components

### Feature: Command Center

- <CmdChatActivity />
-

### Feature: Agents

- <AgentTable />
- <AgentSearch />
- <AgentStats />
- <AgentForm />
- <AgentFormAdd />
- <AgentFormEdit />
- <AgentDetails />
- <AgentAllocation />
- <AgentActivityLog />

### Feature: Operations

- <OpsMissionsStatsCards />
- <OpsMissionsStatsList />
- <OpsOperationThumbnail />
- <OpsOperationDetails />
- <OpsMissionsOverviewChart />
- <OpsMissionsStats />

### Feature: Intelligence

- <IntSearch />
- <IntStats />
- <IntReportThumbnail />
- <IntReportSummary />
- <IntReportDetails />

### Feature: Systems

- <SysStats />
- <SysSystemThumbnail />
- <SysSystemDetails />

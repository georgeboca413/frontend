**Restructure the App folder**

In the "app" folder there are more pages (e.g "agent-network"), I want you to look inside of each folder and look at the structure of the code.
    - For each page, restructure it so it will use separated components with prompts instead of the whole code in the jsx file
    - While doing it, make sure that the code does not change or stop working
    - Use best-practices and what you think is gonna look and work better
    - If you have any questions please ask them before starting the process
    - Create a "features" folder
    - You can use the prisma models and decide for yourself which are the features that go in the folder
    - I want all my types to be in a single file inside the "features" folder (e.g. ./features/[feature_name]/types/[feature_name]-types.ts)
    - I want all constants that go in the same file inside the "features" folder (e.g. ./features/[feature_name]/config/[feature_name]-config.ts)
    - I want you to suffix all the constants with the word "_CONFIG" 
    - I want all my files from the features folder to be prefixed with the feature name if the name is no longer than 5 characters of with the feature prefix which should not be longer than 4characters. E.g. for the feature "agents" you can prefix all the files with "agent" word. For the feature systems, you can prefix the feature with the prefix "sys".
    Decide when to use the entire feature name or the prefix based on feature name lenght. 
    for hooks, make sure to start with use and then the feature name or prefix, e.g. use-sys-system-list.tsx 
    - As granular as possible to respect the singular responsability principle
    - consider using use swr hook (https://swr.vercel.app/)
    - Move the existing types from types.ts to individual feature type files
    - Keep the same structure in the api folder
    - When restructuring the code, DO NOT modify the visuals of the cards, and make sure each button works as intended and no functionality is stripped away
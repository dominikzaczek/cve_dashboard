# CVE Dashboard

This is the front end part of the CVE Dashboard I am working on. It reads a CVE.json file from public folder. 

## Components

### Dashboard
A stateful component handling state for all the other components. If I had more time, I would break it down to smaller components as it has become quite long and difficult to navigate. 

### Data Grid
This is a grid delivered by Material-UI Labs. I decided to choose it because it has built-in filtration and sorting, that can be passed in props. This was very convenient, because the project required me to build it quickly and creating a grid from scratch would take much more time. Ideally, I would improve the usability but I would use the component anyway. At the moment, I allow sorting and filtration on almost every column. The search component uses the filtration to search using CVE-ID. One of my initial ideas for presenting the data was implementation of endless scroll but I believe that wouldn't be very clear for the dashboard's front page. This could be implemented on a dedicated page. 

### Search
It is a simple component that uses filtration built in the Data Grid. Users can filter the data by CVE-ID. 

### Chart
Is not functional as I did not have a chance to implement the back-end that would process the data on the server side. I could have an attempt to process that on the client side but, in my opinion, it would be inefficient. The chart uses the Recharts library that allowed me to create the chart quickly. I used it because it was recommended by Material-UI. 

### Sidebar
- Select Year: Dashboard extracts all the years from the CVE.json and creates a Set converted to an array to present all the years in the document. It is linked to the chart which is my initial attempt to implementation of filtering. 
- Severity: This is a set-in-stone checkbox that is not dynamically generated. At the moment, it affects the visibility of the lines in the chart. In the future, if I had more time, I would like to link it to the data grid - to filter the data by severity. I was not sure if this was an expected functionality. 
- Buttons: At the moment, we can see the reset button that resets the input from the sidebar. In the specification, we had two buttons - Apply and Reset. I decided to leave just the reset button as I believed it would make the app more dynamic. But after further consideration, I would implement the Apply button as well to execute the chosen filtering only when the button is clicked. I think this would make the app more predictable and intuitive. 

## Conclusion
This is what I achieved with my limited time (I spent around 3 hours on the app). If I had more time, I would implement the back-end (preferably NextJs, as this would handle fetching and processing data really well). I was close to reaching the specification and I will continue the project in my spare time. 

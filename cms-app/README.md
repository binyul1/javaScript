
```

authorization and authentication

# SDLC

    -`Requirement Gathering And Analysis`
        -Clean requirement in the form of feature documentation
    -`Designing`
        -Web Interface Design
            -Figma, Stitch Ai
        -Database Design
        -Architecture design
        -Test framework
        -Deployment strategy(Optional)
    -`Development`
        -FE -> React component development
        -BE -> API development
        -FE -> Integration with BE API
    -`Testing`
        -QA Developed project/service test
        -Opern Bug ticket for any issues
    -`Develoyment`
        -DevOps deploy to the server
    -`Maintenance and Support`
        -Statusm, SEO Tracking, updated/upgrades

# HTML

    - Tags in HTML `<tag>` or `<tag></tag>`
    - Singleton/open tag
        -`<tag>`
    -closed/Paired tags
        `<tag> Inner HTML </tag>

five different header structure

-Design
-Cards
-Tables
-Forms
-Tropography(text structure)
-Layouts
-Footers
-Buttons
-Lists

-Colors
-Background, Foreground, border, shadow
-Sizing
-width, height, max-width, min-width, max-height. min-height, borders
-Spacing
-margin,padding,gap
-Layouts
-grid, flex, table
-Css animitations
-transitions, animite
-Background
-color, url....
-Typography
-font, text-
-Position
-relative, fixed, sticky, absoulte, top, bottom, left, right

Metrics: px, em, rm,vh, vw, %, mm, cm, in
-1em=16px

align-items-vertical
justify-content: horizontal

                          margin

                          border

                          padding

margin border padding content padding border margin

                           padding

                           border

                           margin

Responsive design
global design
(small)mobile
(medium)tablet
(large)ipad
(extralarge)laptop
(extra extra large)monitors

css from begining to now
-bootstrap
-materilize
-tailwind css

###Nodejs
-Runtie environment -> provides js exeutable
-Single Threaded programing
how js handle multipe request(thread)
-v8 engine, libUv, async-await(async), service workers, Event Driven program
-call stack, Memory Heap, Garbage collector
React is a single page application because it starts from index.html

#Setup
-"pnpm create vite"
-Follow the step to step react ' typescript + react Compiler '
##folder Architecture
-keep everything inside `/src`

```jsx
    /src //keep every codes inside src
      /pages  //to keep all the url
        /<folder>  //to keep modularity in projects
      /components  //to keep small components for overall project
      /assets   //to keep all the resources required
        /css
        /images
      /config  //all the configurations required
      /lib //library to keep any configurations or services developed
      main.tsx //entry point for react


#Props Drilling

```jsx 
    const AComp = () => {
        return (<BCompo props = {"dta"}>)
    }
    const Bmp = ({props}) => {
        return (<CCompo data = {props}>)
    }
    const AComp = ({data}) => {
        return (<BCompo props = {"data"}>)
    }
    const AComp = (props) => {
        return (props)
    }

````WebHooks
    -can only be use with react function component
    -Always starts with `use` keyword
    -Never call/manipulate any state hook before first component

    a. state maintainance 
        `useState()`
        if any state og a component is manipulated(changed/created),component will re-render
    b. performance optimization
        `useMemo()`,`useCallback()`

    c. global state management
        `useContext()` , `useReducer()`

    d. side effect
        `useEffect()`, `use()`

```
useEffect(() => {
    console.log("i am always loaded");
    //tracking logs
  });

  console.log("I will always render only once when component is mounted");
  useEffect(() => {
    //first time data load
    return () => {
      setCredentials({
        ...setCredentials,
        username: "Binyul",
        password: "password"
      });
    };
  }, []);

  useEffect(() => {
    //tracking logs
    console.log(
      "I will always render only when credentials state is updated",
      credentials,
    );
  }, [credentials]);
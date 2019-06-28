/***
 * 在这个例子中，我们有3个'Page'组件处理<Router>。注意：而不是<a href="/">我们使用<Link to="/">。
 *  */
// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// function Index() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

// function AppRouter() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about/">About</Link>
//             </li>
//             <li>
//               <Link to="/users/">Users</Link>
//             </li>
//           </ul>
//         </nav>
//         <Route path="/" exact component={Index} />
//         <Route path="/about/" component={About} />
//         <Route path="/users/" component={Users} />
//       </div>
//     </Router>
//   );
// }

// export default AppRouter;


/***
 * 此示例显示嵌套路由的工作原理。该路由/topics加载Topics组件，该组件<Route>有条件地在路径上呈现任何:id值 
 *  */
// import React from "react";
// import { BrowserRouter as Router, Route, Link,Switch,NavLink,Redirect } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/topics" component={Topics} />
//           <Route path="/children" children={(props) => (<Topics {...props}/>)} />
//           <Route component={Topics} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topic({ match }) {
//   return <h3>Requested Param: {match.params.id}</h3>;
// }

// function Topics({ match }) {
//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Route path={`${match.path}/:id`} component={Topic} />
//       <Route
//         exact
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     </div>
//   );
// }

// function Header() {
//   return (
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/about">About</Link>
//       </li>
//       <li>
//         <Link to="/topics">Topics</Link>
//       </li>
//       <li>
//         <Link to="/xxxx">xxxx</Link>
//       </li>
//       <li>
//       <NavLink to="/react" activeClassName="hurray">
//         React
//       </NavLink>
//       </li>
//       <li>
//         <Redirect to="/topics" />
//       </li>
//     </ul>
//   );
// }

// export default App;



/**
 * React Router中有三种类型的组件：路由器组件，路由匹配组件和导航组件
 * 路由器组件： BrowserRouter  HashRouter
 * 路由匹配组件: Route Switch
 * 导航组件: Link NavLink Redirect
 *  */
// import { BrowserRouter,HashRouter, Route,Switch, Link,NavLink } from "react-router-dom";



// import React from 'react';
// import {
//   BrowserRouter,
//   Route,
//   Link
// } from 'react-router-dom';

// class App extends React.PureComponent {
//   render(){
//     return (
//       <div>
//         <h1>App</h1>
//         <ul>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/inbox">Inbox</Link></li>
//         </ul>
//         {this.props.children}
//       </div>
//     )
//   }
// }

// class About extends React.PureComponent {
//   render() {
//     return <h3>About</h3>
//   }
// }

// class Inbox extends React.PureComponent {
//   render(){
//     return (
//       <div>
//         <h2>Inbox</h2>
//         {this.props.children || "Welcome to your Inbox"}
//       </div>
//     )
//   }
// }

// class Message extends React.PureComponent {
//   render(){
//     return <h3>Message {this.props.params.id}</h3>
//   }
// }

// // class Router extends React.PureComponent {
// //   render(){
// //     return (
// //       <BrowserRouter>
// //         <div>
// //           <Route path="/" component={App}>
// //             <Route path="about" component={About} />
// //             <Route path="inbox" component={Inbox}>
// //               <Route path="messages/:id" component={Message} />
// //             </Route>
// //           </Route>
// //         </div>
// //       </BrowserRouter>
// //     )
// //   }
// // }

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <div>
//         <Route path="/" component={App} />
//           <Route path="about" component={About} />
//           <Route path="inbox" component={Inbox} />
//           <Route path="messages/:id" component={Message} />
//           <Route path="messages/:id" component={Message} />
//       </div>
//     </BrowserRouter>
//   )
// }

// export default Router


// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// // import './index.css'
// const CustomLinkExample = () => (
//   <Router>
//     <div>
//       <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
//       <OldSchoolMenuLink to="/about" label="About" />
//       <hr />
//       <Route exact path="/" component={Home} />
//       <Route path="/about" component={About} />
//     </div>
//   </Router>
// );

// /*
// * 有时您需要渲染路径是否与位置匹配。在这些情况下，您可以使用儿童道具功能。它的工作方式与渲染完全相同，只是它会被调用，无论是否匹配。子渲染道具接收与组件和渲染方法相同的所有路径道具，除非路径无法匹配URL，否则匹配为空。这允许您根据路径是否匹配动态调整UI。如果路线匹配，我们在这里添加一个活动类
// * */
// const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
//   <Route
//     path={to}
//     exact={activeOnlyWhenExact}
//     children={({ match }) => {
//       console.log(match)
//       return (
//         <div className={match ? "active" : ""}>
//           {match ? "> " : ""}
//           <Link to={to}>{label}</Link>
//         </div>
//       )
//     }}
//   />
// );

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// );

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// );

// export default CustomLinkExample;



// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// // first our route components
// const Sandwiches = () => <h2>Sandwiches</h2>;

// const Tacos = ({ routes }) => (
//   <div>
//     <h2>Tacos</h2>
//     <ul>
//       <li>
//         <Link to="/tacos/bus">Bus</Link>
//       </li>
//       <li>
//         <Link to="/tacos/cart">Cart</Link>
//       </li>
//     </ul>
//     {renderRoutes(routes)}
//   </div>
// );

// const renderRoutes = (routes) => { return (routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)) };

// const Bus = ({ routes }) => {
//   console.log(routes)
//   return (
//     <div>
//       <h3>Bus constructor
//                 <ul>
//           <li> <Link to="/tacos/bus/bus2">/tacos/bus/bus2</Link> </li>
//           <li> <Link to="/tacos/bus/bus3">/tacos/bus/bus3</Link> </li>
//         </ul>
//       </h3>
//       {renderRoutes(routes)}
//     </div>
//   )
// };
// const Bus2 = () => <h3>Bus2</h3>;
// const Bus3 = () => <h3>Bus3</h3>;
// const Cart = () => <h3>Cart</h3>;

// ////////////////////////////////////////////////////////////
// // then our route config
// const routes = [
//   {
//     path: "/sandwiches",
//     component: Sandwiches
//   },
//   {
//     path: "/tacos",
//     component: Tacos,
//     routes: [
//       {
//         path: "/tacos/bus",
//         component: Bus,
//         routes: [
//           {
//             path: "/tacos/bus/bus2",
//             component: Bus2
//           },
//           {
//             path: "/tacos/bus/bus3",
//             component: Bus3
//           }
//         ]
//       },
//       {
//         path: "/tacos/cart",
//         component: Cart
//       }
//     ]
//   }
// ];

// // wrap <Route> and use this everywhere instead, then when
// // sub routes are added to any route it'll work
// const RouteWithSubRoutes = route => (
//   <Route
//     path={route.path}
//     render={props => {
//       console.log(props)
//       console.log(route)
//       return (
//         // pass the sub-routes down to keep nesting
//         <route.component {...props} routes={route.routes} />
//       )
//     }}
//   />
// );

// const RouteConfigExample = () => (
//   <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/tacos">Tacos</Link>
//         </li>
//         <li>
//           <Link to="/sandwiches">Sandwiches</Link>
//         </li>
//       </ul>

//       {renderRoutes(routes)}
//     </div>
//   </Router>
// );

// export default RouteConfigExample;



import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './index.css'

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
const Login = () => <h2>login</h2>;

const Tacos = ({ routes }) => (
  <div >
    <h2>Tacos</h2>
    <ul className="slider">
      {slideMenu(routes)}
    </ul>
    <div className="content">
      {renderRoutes(routes)}
    </div>
  </div>
);

const slideMenu = (routes) => Array.isArray(routes) && routes.map(item => (
  <li key={item.path}>
    {/*<Link to={item.path}>{item.name}</Link>*/}
    <OldSchoolMenuLink to={item.path} label={item.name} exact={item.exact}></OldSchoolMenuLink>
    {Array.isArray(item.routes) && item.routes.length > 0 && (
      <ul>
        {slideMenu(item.routes)}
      </ul>
    )}
  </li>
)
);


const renderRoutes = (routes) => { return (routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)) };

const Bus = ({ routes }) => {
  return (
    <div>
      <h3>Bus constructor
            </h3>
      {renderRoutes(routes)}
    </div>
  )
};
const Bus2 = () => <h3>Bus2</h3>;
const Bus3 = () => <h3>Bus3</h3>;
const Cart = () => <h3>Cart</h3>;

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/login",
    name: 'Login',
    component: Login
  },
  {
    path: "/tacos",
    name: 'Tacos',
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        name: "/tacos/bus",
        component: Bus,
        routes: [
          {
            path: "/tacos/bus/bus2",
            name: "/tacos/bus/bus2",
            component: Bus2
          },
          {
            path: "/tacos/bus/bus3",
            name: "/tacos/bus/bus3",
            component: Bus3
          }
        ]
      },
      {
        path: "/tacos/cart",
        name: "/tacos/Cart",
        component: Cart
      }
    ]
  }
];

const OldSchoolMenuLink = ({ label, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => {
      return (
        <React.Fragment >
          {match ? "> " : ""}
          <Link to={to} className={match ? "active" : ""}>{label}</Link>
        </React.Fragment>
      )
    }}
  />
);


// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => {
      console.log(props)
      console.log(route)
      return (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )
    }}
  />
);

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/tacos">Tacos</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  </Router>
);

export default RouteConfigExample;
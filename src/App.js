import {Route, Redirect, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App

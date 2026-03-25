import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        {/*Parent route*/}
        <Route path="/" element={<App />}>

          {/*Children route*/}
          <Route index element={<Home />} />

          <Route
            path="login"
            element={
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            }
          />

          <Route
            path="signup"
            element={
              <AuthLayout authentication={false}>
                <Signup />
              </AuthLayout>
            }
          />

          <Route
            path="all-posts"
            element={
              <AuthLayout authentication>
                <AllPosts />
              </AuthLayout>
            }
          />

          <Route
            path="add-post"
            element={
              <AuthLayout authentication>
                <AddPost />
              </AuthLayout>
            }
          />

          <Route
            path="edit-post/:slug"
            element={
              <AuthLayout authentication>
                <EditPost />
              </AuthLayout>
            }
          />

          <Route path="post/:slug" element={<Post />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

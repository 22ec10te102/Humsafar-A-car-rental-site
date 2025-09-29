import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from "./UserContext";
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cars from './pages/Cars/Cars.jsx'
import CarDetail from './pages/Cars/CarDetail.jsx'
import Reviews from './pages/Reviews.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Terms from './pages/Terms.jsx'
import PrivacyPolicy from './pages/Privacy.jsx'
import AuthRequired from './components/AuthRequired.jsx'
import RentForm from "./pages/Rentform.jsx"
import ThankYou from "./pages/ThankYou.jsx"


export default function App() {
  return (
   <UserProvider>
    <div className='app-container'>
    <BrowserRouter>
         <Routes>
           <Route element={<Layout />}>
             <Route index element={< Home />} />
             <Route path="about" element={< About />} />
             <Route path="terms&condition" element={< Terms />} />
             <Route path="privacypolicy" element={< PrivacyPolicy />} />
             <Route path="cars/:id/rent" element={<RentForm />} />
             <Route path="login" element={<Login />} />
             <Route path="signup" element={<Signup />} />
             <Route path="thankyou" element={<ThankYou />} />

            <Route element={<AuthRequired />}>
             <Route path="cars" element={< Cars />} />
             <Route path="cars/:id" element={< CarDetail />} />
            </Route>

            <Route element={<AuthRequired />}>
              <Route path="reviews" element={< Reviews />} />
            </Route>

          </Route>
             <Route path="*" element={< NotFound />} />
         </Routes>
    </BrowserRouter>
    </div>
   </UserProvider>

  )
}





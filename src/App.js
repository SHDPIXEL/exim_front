import React from 'react';
import './assets/css/style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MainHeader from './pages/MainHeader.jsx';
// import MainFooter from './pages/MainFooter.jsx';
import { ScrollToTop } from './pages/ScrollToTop.jsx';
import SubscribePage from './pages/SubscribePage.jsx';
import PaymentDone from './pages/HomeBannerSlider/PaymentDone.jsx';
import Dashboard from './pages/UserPages/Dashboard.jsx';
import RegistrationForm from './pages/RegistrationForm.jsx';
import PaymentSummary from './pages/PaymentSummary.jsx';
import MainFooter from './pages/MainFooter.jsx';
import Login from './pages/Login.jsx';
import ForgotPass from './pages/ForgotPass.jsx';
import ViewPage from './pages/UserPages/ViewPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NewsDetails from './pages/NewsDetails.jsx';
import EventsPage from './pages/EventsPage.jsx';
import ExchangeRates from './pages/ExchangeRates.jsx';
import DailyEximNews from './pages/DailyEximNews.jsx';
import VideoGalleryNews from './pages/VideoGalleryNews.jsx';
import VideGalleryDetails from './pages/VideoGalleryDetails.jsx';
import Appointments from './pages/Appointments.jsx';
import CustomRates from './pages/CustomRates.jsx';
import News from './pages/News.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import ShippingAndDeliveryPolicy from './pages/ShippingAndDeliveryPolicy.jsx';
import CancellationAndRefundPolicy from './pages/CancellationAndRefundPolicy.jsx';
import MyDevice from './pages/UserPages/MyDevice.jsx';
import PaymentHistory from './pages/UserPages/PaymentHistory.jsx';
import ProfilePage from './pages/UserPages/ProfilePage.jsx';
import EximIndia from './pages/InnerPages/EximIndia.jsx';
import OurEditors from './pages/InnerPages/OurEditors.jsx';
import OurReaders from './pages/InnerPages/OurReaders.jsx';
import Catergory from './pages/Catergory.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import DownloadFiles from './pages/DownloadFiles.jsx';



function Layout({ children }) {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/eximApp">
      <AuthProvider>
        <UserProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/subscribePage" element={<Layout><SubscribePage /></Layout>} />
            <Route path="/newsDetails/:id" element={<Layout><NewsDetails /></Layout>} />
            <Route path="/videoGallery" element={<Layout><VideoGalleryNews /></Layout>} />
            <Route path="/videoGalleryDetails" element={<Layout><VideGalleryDetails /></Layout>} />
            <Route path="/events" element={<Layout><EventsPage /></Layout>} />
            <Route path="/rates" element={<Layout><ExchangeRates /></Layout>} />
            <Route path="/Customrates" element={<Layout><CustomRates /></Layout>} />
            <Route path="/eximnews" element={<Layout><News /></Layout>} />
            <Route path="/dailyeximnews" element={<Layout><DailyEximNews /></Layout>} />
            <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
            <Route path="/EximIndia" element={<Layout><EximIndia /></Layout>} />
            <Route path="/oureditions" element={<Layout><OurEditors /></Layout>} />
            <Route path="/ourReaders" element={<Layout><OurReaders /></Layout>} />
            <Route path="/Category" element={<Layout><Catergory /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/registrationPage" element={<Layout><RegistrationForm /></Layout>} />
            <Route path="/Forgotpass" element={<Layout><ForgotPass /></Layout>} />
            <Route path="/paymentSummary" element={<ProtectedRoute><Layout><PaymentSummary /></Layout></ProtectedRoute>} />
            <Route path="/paymentDone" element={<Layout><PaymentDone /></Layout>} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/mydevice" element={<Layout><MyDevice /></Layout>} />
            <Route path="/paymentHistory" element={<Layout><PaymentHistory /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/viewpage" element={<Layout><ViewPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/privacypolicy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/termsandconditions" element={<Layout><TermsAndConditions /></Layout>} />
            <Route path="/shippingAndDeliveryPolicy" element={<Layout><ShippingAndDeliveryPolicy /></Layout>} />
            <Route path="/cancellationAndRefundPolicy" element={<Layout><CancellationAndRefundPolicy /></Layout>} />
            <Route path='/download' element={<Layout><DownloadFiles /></Layout>} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

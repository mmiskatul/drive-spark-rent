import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import Cars from "@/pages/Cars";
import CarDetails from "@/pages/CarDetails";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import CustomerOverview from "@/pages/customer/Overview";
import CustomerBookings from "@/pages/customer/Bookings";
import CustomerBookingDetails from "@/pages/customer/BookingDetails";
import CustomerNotifications from "@/pages/customer/Notifications";
import CustomerProfile from "@/pages/customer/Profile";

import PartnerOverview from "@/pages/partner/Overview";
import PartnerCars from "@/pages/partner/Cars";
import PartnerAddCar from "@/pages/partner/AddCar";
import PartnerRequests from "@/pages/partner/Requests";
import PartnerCalendar from "@/pages/partner/Calendar";
import PartnerReports from "@/pages/partner/Reports";
import PartnerProfile from "@/pages/partner/Profile";

import AdminOverview from "@/pages/admin/Overview";
import AdminUsers from "@/pages/admin/Users";
import AdminVerifications from "@/pages/admin/Verifications";
import AdminCars from "@/pages/admin/Cars";
import AdminBookings from "@/pages/admin/Bookings";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminSettings from "@/pages/admin/Settings";

import NotFound from "@/pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/customer" element={<CustomerOverview />} />
          <Route path="/customer/bookings" element={<CustomerBookings />} />
          <Route path="/customer/bookings/:id" element={<CustomerBookingDetails />} />
          <Route path="/customer/notifications" element={<CustomerNotifications />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />

          <Route path="/partner" element={<PartnerOverview />} />
          <Route path="/partner/cars" element={<PartnerCars />} />
          <Route path="/partner/cars/new" element={<PartnerAddCar />} />
          <Route path="/partner/requests" element={<PartnerRequests />} />
          <Route path="/partner/calendar" element={<PartnerCalendar />} />
          <Route path="/partner/reports" element={<PartnerReports />} />
          <Route path="/partner/profile" element={<PartnerProfile />} />

          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/verifications" element={<AdminVerifications />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

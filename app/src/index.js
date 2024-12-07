import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages';
import UploadAbort from './pages/upload-abort';
import DragAndDrop from './pages/drag-drop/drag-drop';
import ClickFocus from './pages/click-focus/click-focus';
import DragAndDrop2 from './pages/drag-drop-2/drag-drop-2';
import UploadtoCloudinary from './pages/upload-to-cloudinary/uploadtoCloudinary';
import StripePayment from './pages/stripe_payment/stripePayment';
import Complete from './pages/stripe_payment/complete';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  }, {
    path: '/upload-abort',
    element: <UploadAbort />
  }, {
    path: '/drag-drop',
    element: <DragAndDrop />
  }, {
    path: '/click-focus',
    element: <ClickFocus />
  }, {
    path: '/drag-drop-2',
    element: <DragAndDrop2 />
  }, {
    path: '/uploadtocloudinary',
    element: <UploadtoCloudinary />
  }, {
    path: '/stripe-payment',
    element: <StripePayment />
  }, {
    path: '/complete',
    element: <Complete />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

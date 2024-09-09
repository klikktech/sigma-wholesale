import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import { authOptions } from './app/auth/[...nextauth]/route';

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // Access token is expired or not present
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      try {
        // Refresh the access token using the refresh token
        const response = await axios.post('/api/auth/refresh', {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Store the new access token in local storage
        localStorage.setItem('accessToken', accessToken);

        // Redirect to the original requested route (if within SSR context and URL is defined)
        if (res.redirect && req.url) {
          res.redirect(req.url);
        } else {
          // Handle non-SSR scenarios (e.g., navigate client-side)
          console.warn('Non-SSR context detected. Access token refreshed, but redirect not possible.');
        }
      } catch (error) {
        // Handle refresh token expiration or other errors
        res.redirect('/signin');
      }
    } else {
      // No refresh token present, redirect to sign in
      res.redirect('/signin');
    }
  } else {
    // Access token is valid, continue to protected route
    // No need for res.next()
  }
}
/** @format */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value; // Or use headers if token is sent there

    // Define protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Optionally verify token with Django backend here (see Step 4)
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'], // Apply middleware to /dashboard and subroutes
};

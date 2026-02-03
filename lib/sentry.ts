/**
 * Sentry Error Tracking Configuration
 * 
 * To enable Sentry:
 * 1. Sign up at https://sentry.io
 * 2. Create a new Next.js project
 * 3. Add SENTRY_DSN to your .env file
 * 4. Uncomment the initialization code below
 */

// import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // Uncomment to enable Sentry
    /*
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      
      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      
      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Ignore common errors
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        'chrome-extension://',
        'moz-extension://',
        // Network errors
        'NetworkError',
        'Network request failed',
        // Random plugins/extensions
        'atomicFindClose',
        // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
        'Can\'t find variable: ZiteReader',
        'jigsaw is not defined',
        'ComboSearch is not defined',
        // Facebook borked
        'fb_xd_fragment',
        // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
        // reduce this. (thanks @acdha)
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
        'conduitPage',
      ],
      
      beforeSend(event, hint) {
        // Filter out development errors
        if (process.env.NODE_ENV === 'development') {
          console.error('Sentry Event:', event, hint);
          return null;
        }
        
        // Check if it's an exception, and if so, show the report dialog
        if (event.exception) {
          // Optionally show a report dialog
          // Sentry.showReportDialog({ eventId: event.event_id });
        }
        
        return event;
      },
      
      integrations: [
        // Additional integrations can be added here
      ],
    });
    */
  }
}

/**
 * Capture an exception manually
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error, context);
    return;
  }
  
  // Uncomment to enable Sentry
  /*
  Sentry.captureException(error, {
    contexts: context ? { custom: context } : undefined,
  });
  */
}

/**
 * Capture a message manually
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${level.toUpperCase()}]`, message);
    return;
  }
  
  // Uncomment to enable Sentry
  /*
  Sentry.captureMessage(message, level);
  */
}

/**
 * Set user context for error tracking
 */
export function setUser(_user: { id: string; email?: string; name?: string } | null) {
  // Uncomment to enable Sentry
  /*
  Sentry.setUser(user);
  */
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Breadcrumb:', message, data);
    return;
  }
  
  // Uncomment to enable Sentry
  /*
  Sentry.addBreadcrumb({
    message,
    data,
    level: 'info',
  });
  */
}


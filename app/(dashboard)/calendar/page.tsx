export default function CalendarPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="heading-1 mb-2">Calendar</h1>
        <p className="text-muted-foreground">Schedule and manage your events</p>
      </div>

      <div className="glass-panel rounded-[28px] p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Calendar Coming Soon</h3>
        <p className="text-muted-foreground">Event scheduling and calendar integration will be available soon</p>
      </div>
    </div>
  );
}

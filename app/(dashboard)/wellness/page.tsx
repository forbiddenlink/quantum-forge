export default function WellnessPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="heading-1 mb-2">Wellness</h1>
        <p className="text-muted-foreground">Track your focus time and wellbeing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Today&apos;s Focus</div>
          <div className="heading-1 text-accent-primary">2h 45m</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Focus Score</div>
          <div className="heading-1 text-accent-success">87</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Weekly Streak</div>
          <div className="heading-1">5 days</div>
        </div>
      </div>

      <div className="glass-panel rounded-[28px] p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-success to-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Wellness Features Coming Soon</h3>
        <p className="text-muted-foreground">Detailed focus tracking, break reminders, and wellness resources will be available soon</p>
      </div>
    </div>
  );
}

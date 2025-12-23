'use client';

import { useQuery } from '@tanstack/react-query';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  title: string | null;
  department: string | null;
  role: string;
  _count: {
    tasks: number;
    posts: number;
    comments: number;
  };
}

export default function TeamPage() {
  const { data: members = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ['team-members'],
    queryFn: async () => {
      const res = await fetch('/api/team');
      if (!res.ok) throw new Error('Failed to fetch team members');
      return res.json();
    },
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-accent-critical/20 text-accent-critical border-accent-critical';
      case 'MANAGER': return 'bg-accent-primary/20 text-accent-primary border-accent-primary';
      case 'MEMBER': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['member-1', 'member-2', 'member-3'].map((id) => (
              <div key={id} className="glass-panel rounded-[28px] p-6 h-56"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const departments = Array.from(new Set(members.map((m) => m.department).filter(Boolean)));
  const totalTasks = members.reduce((sum, m) => sum + m._count.tasks, 0);
  const totalPosts = members.reduce((sum, m) => sum + m._count.posts, 0);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Team</h1>
          <p className="text-muted-foreground">Connect with colleagues and collaborate</p>
        </div>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors animate-smooth font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Team Members</div>
          <div className="heading-1">{members.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Departments</div>
          <div className="heading-1 text-accent-primary">{departments.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Active Tasks</div>
          <div className="heading-1 text-accent-success">{totalTasks}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Posts</div>
          <div className="heading-1">{totalPosts}</div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg caption font-medium whitespace-nowrap">
          All Members
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg caption font-medium whitespace-nowrap transition-colors animate-smooth"
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="glass-panel rounded-[28px] p-6 hover:scale-[1.02] transition-transform animate-smooth cursor-pointer"
          >
            {/* Avatar & Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-primary flex items-center justify-center text-primary-foreground font-semibold text-xl flex-shrink-0">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(member.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1 truncate">{member.name}</h3>
                {member.title && (
                  <p className="caption text-muted-foreground mb-2 truncate">{member.title}</p>
                )}
                <div className="flex items-center gap-2">
                  <span className={`caption px-2 py-1 rounded border ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                  {member.department && (
                    <span className="caption px-2 py-1 rounded bg-muted text-muted-foreground truncate">
                      {member.department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-4">
              <a
                href={`mailto:${member.email}`}
                className="caption text-accent-primary hover:underline flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{member.email}</span>
              </a>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              <div className="text-center">
                <div className="font-semibold">{member._count.tasks}</div>
                <div className="caption text-muted-foreground">Tasks</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{member._count.posts}</div>
                <div className="caption text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{member._count.comments}</div>
                <div className="caption text-muted-foreground">Comments</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {members.length === 0 && (
        <div className="glass-panel rounded-[28px] p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">No team members yet</h3>
          <p className="text-muted-foreground mb-4">Invite colleagues to join your workspace</p>
        </div>
      )}
    </div>
  );
}

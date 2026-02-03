import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cn, getRelativeTime, formatNumber, formatPercentage } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'visible')).toBe('base visible');
  });

  it('merges tailwind classes correctly', () => {
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null, undefined)).toBe('');
  });
});

describe('getRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-03T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for times less than a minute ago', () => {
    const date = new Date('2026-02-03T11:59:30Z');
    expect(getRelativeTime(date)).toBe('just now');
  });

  it('returns minutes ago for times less than an hour ago', () => {
    const date = new Date('2026-02-03T11:45:00Z');
    expect(getRelativeTime(date)).toBe('15m ago');
  });

  it('returns hours ago for times less than a day ago', () => {
    const date = new Date('2026-02-03T09:00:00Z');
    expect(getRelativeTime(date)).toBe('3h ago');
  });

  it('returns days ago for times less than a week ago', () => {
    const date = new Date('2026-02-01T12:00:00Z');
    expect(getRelativeTime(date)).toBe('2d ago');
  });

  it('returns formatted date for times more than a week ago', () => {
    const date = new Date('2026-01-20T12:00:00Z');
    const result = getRelativeTime(date);
    // Result is locale-dependent, just verify it's not a relative time
    expect(result).not.toMatch(/ago$/);
  });

  it('accepts string dates', () => {
    const dateStr = '2026-02-03T11:30:00Z';
    expect(getRelativeTime(dateStr)).toBe('30m ago');
  });
});

describe('formatNumber', () => {
  it('returns number as-is for values under 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(10000)).toBe('10.0K');
    expect(formatNumber(999999)).toBe('1000.0K');
  });

  it('formats millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(10000000)).toBe('10.0M');
  });
});

describe('formatPercentage', () => {
  it('rounds to nearest integer and adds % suffix', () => {
    expect(formatPercentage(0)).toBe('0%');
    expect(formatPercentage(50)).toBe('50%');
    expect(formatPercentage(100)).toBe('100%');
  });

  it('rounds decimal values', () => {
    expect(formatPercentage(33.33)).toBe('33%');
    expect(formatPercentage(66.67)).toBe('67%');
    expect(formatPercentage(99.5)).toBe('100%');
  });

  it('handles values over 100', () => {
    expect(formatPercentage(150)).toBe('150%');
  });
});

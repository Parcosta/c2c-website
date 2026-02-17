import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AudioPlayer } from "@/components/custom/AudioPlayer";

// Mock HTMLMediaElement methods
window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();

Object.defineProperty(window.HTMLMediaElement.prototype, "currentTime", {
  writable: true,
  value: 0
});

Object.defineProperty(window.HTMLMediaElement.prototype, "duration", {
  writable: true,
  value: 180
});

describe("AudioPlayer", () => {
  it("renders audio player with title", () => {
    render(<AudioPlayer src="/audio/test.mp3" title="Test Track" />);

    expect(screen.getByText("Test Track")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reproducir/i })).toBeInTheDocument();
  });

  it("renders audio player without title", () => {
    render(<AudioPlayer src="/audio/test.mp3" />);

    expect(screen.getByRole("button", { name: /reproducir/i })).toBeInTheDocument();
  });

  it("toggles play/pause when button is clicked", () => {
    render(<AudioPlayer src="/audio/test.mp3" title="Test Track" />);

    const playButton = screen.getByRole("button", { name: /reproducir/i });
    fireEvent.click(playButton);

    // After clicking, should show pause button
    expect(screen.getByRole("button", { name: /pausar/i })).toBeInTheDocument();
  });

  it("displays time progress", () => {
    render(<AudioPlayer src="/audio/test.mp3" title="Test Track" />);

    // Should show time format like "0:00/3:00"
    expect(screen.getByText(/\d+:\d{2}\/\d+:\d{2}/)).toBeInTheDocument();
  });
});

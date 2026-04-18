"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function getInternalNavigationTarget(event: MouseEvent) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest("a[href]");

  if (!(anchor instanceof HTMLAnchorElement)) {
    return null;
  }

  if (
    isModifiedClick(event) ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download") ||
    anchor.origin !== window.location.origin
  ) {
    return null;
  }

  const nextUrl = new URL(anchor.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) {
    return null;
  }

  return nextUrl;
}

export function RouteChangeLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    function beginLoading() {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      setIsLoading(true);
    }

    function handleClick(event: MouseEvent) {
      if (getInternalNavigationTarget(event)) {
        beginLoading();
      }
    }

    function handlePopState() {
      beginLoading();
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [pathname, searchParams]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="fixed right-4 top-4 z-[100] grid h-10 w-10 place-items-center rounded-full border border-border bg-background/95 shadow-soft backdrop-blur"
      role="status"
      aria-label="Loading page"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
    </div>
  );
}

import type { ReactNode } from "react";

export type NavigationItem = { label: string; href: string };

export function NavigationLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="cdi-link" href={href}>{children}</a>;
}

export function SiteHeader({ brand, items, action, brandHref = "#top", trailing }: { brand: ReactNode; items: NavigationItem[]; action: NavigationItem; brandHref?: string; trailing?: ReactNode }) {
  return (
    <header className="cdi-site-header">
      <a className="cdi-site-header__brand" href={brandHref}>{brand}</a>
      <nav className="cdi-site-header__desktop" aria-label="Primary">
        {items.map((item) => <NavigationLink key={item.href} {...item}>{item.label}</NavigationLink>)}
        <NavigationLink {...action}>{action.label}</NavigationLink>
      </nav>
      <details className="cdi-mobile-navigation">
        <summary aria-label="Open or close primary navigation"><span className="mobile-navigation__open">Menu</span><span className="mobile-navigation__close">Close menu</span></summary>
        <nav className="cdi-mobile-navigation__panel" aria-label="Primary mobile">
          <p className="type-label">NAVIGATION · TOUCH CONTEXT</p>
          {items.map((item) => <NavigationLink key={item.href} {...item}>{item.label}</NavigationLink>)}
          <NavigationLink {...action}>{action.label}</NavigationLink>
        </nav>
      </details>
      {trailing}
    </header>
  );
}

export function Breadcrumbs({ items }: { items: Array<NavigationItem & { current?: boolean }> }) {
  return (
    <nav className="cdi-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            {item.current ? <span aria-current="page">{item.label}</span> : <NavigationLink href={item.href}>{item.label}</NavigationLink>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pagination({ previous, pages, next }: {
  previous: NavigationItem;
  pages: Array<NavigationItem & { current?: boolean }>;
  next: NavigationItem;
}) {
  return (
    <nav className="cdi-pagination" aria-label="Pagination">
      <NavigationLink {...previous}><span className="pagination-arrow" aria-hidden="true">←</span><span>{previous.label}</span></NavigationLink>
      <ol>
        {pages.map((page) => <li key={page.href}>{page.current ? <span aria-current="page">{page.label}</span> : <NavigationLink href={page.href}>{page.label}</NavigationLink>}</li>)}
      </ol>
      <NavigationLink {...next}><span>{next.label}</span><span className="pagination-arrow" aria-hidden="true">→</span></NavigationLink>
    </nav>
  );
}

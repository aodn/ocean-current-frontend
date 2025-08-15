import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import LinkOrAnchor from './LinkOrAnchor';

describe('LinkOrAnchor', () => {
  it('renders Link for internal routes', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="/internal" className="test-class">
          Internal
        </LinkOrAnchor>
      </MemoryRouter>,
    );

    const link = screen.getByText('Internal');
    expect(link).toBeInTheDocument();
    // Should not force target on internal link
    expect(link).not.toHaveAttribute('target');
    // Router renders an anchor under the hood
    expect(link.tagName.toLowerCase()).toBe('a');
  });

  it('renders anchor with target and rel for external http(s) URLs', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="https://example.com" className="test-class">
          External
        </LinkOrAnchor>
      </MemoryRouter>,
    );

    const anchor = screen.getByText('External');
    expect(anchor).toBeInTheDocument();
    expect(anchor.tagName.toLowerCase()).toBe('a');
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noreferrer');
  });

  it('treats mixed-case HTTP scheme as external', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="HTTP://EXAMPLE.COM">MixedCase</LinkOrAnchor>
      </MemoryRouter>,
    );

    const anchor = screen.getByText('MixedCase');
    expect(anchor.tagName.toLowerCase()).toBe('a');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noreferrer');
  });

  it('treats protocol-relative URLs as internal (per current rule)', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="//example.com">ProtocolRelative</LinkOrAnchor>
      </MemoryRouter>,
    );

    const link = screen.getByText('ProtocolRelative');
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).not.toHaveAttribute('target');
  });

  it('treats mailto as internal (per current rule)', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="mailto:test@example.com">Mailto</LinkOrAnchor>
      </MemoryRouter>,
    );

    const link = screen.getByText('Mailto');
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).not.toHaveAttribute('target');
  });

  it('treats ftp as internal (per current rule)', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="ftp://example.com/file.txt">FTP</LinkOrAnchor>
      </MemoryRouter>,
    );

    const link = screen.getByText('FTP');
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).not.toHaveAttribute('target');
  });

  it('treats hash links as internal', () => {
    render(
      <MemoryRouter>
        <LinkOrAnchor to="#section">Hash</LinkOrAnchor>
      </MemoryRouter>,
    );

    const link = screen.getByText('Hash');
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).not.toHaveAttribute('target');
  });
});

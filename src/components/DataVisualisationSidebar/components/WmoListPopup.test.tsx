import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WmoListPopup from './WmoListPopup';

vi.mock('@/data/argo/wmoFloatsList', () => ({
  REPORTED_FLOAT_IDS: ['1234567'],
  REPORTED_FLOATS_HEADER: 'Reporting floats',
  NOT_REPORTED_FLOAT_IDS: ['9876543'],
  NOT_REPORTED_FLOATS_HEADER: 'Non-reporting floats',
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockFetchQuery = vi.fn();
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return { ...actual, useQueryClient: () => ({ fetchQuery: mockFetchQuery }) };
});

const mockCycles = [
  { cycle: 10, date: '20240101' },
  { cycle: 44, date: '20240601' },
];

describe('WmoListPopup', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
    mockFetchQuery.mockResolvedValue(mockCycles);
    mockNavigate.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders nothing when closed', () => {
    render(<WmoListPopup isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the popup with WMO IDs when open', () => {
    render(<WmoListPopup isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('[1234567]')).toBeInTheDocument();
    expect(screen.getByText('[9876543]')).toBeInTheDocument();
  });

  it('navigates in-app after selecting an ID', async () => {
    render(<WmoListPopup isOpen={true} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText('[1234567]'));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/product/argo?wmoid=1234567&cycle=44&depth=0-2000m&date=20240601');
    });
    expect(window.open).not.toHaveBeenCalled();
  });

  it('opens in a new tab after selecting an ID when openInNewTab is true', async () => {
    const mockTab = { location: { href: '' }, close: vi.fn() };
    vi.spyOn(window, 'open').mockReturnValue(mockTab as unknown as Window);
    render(<WmoListPopup isOpen={true} onClose={vi.fn()} openInNewTab />);
    fireEvent.click(screen.getByText('[1234567]'));
    await waitFor(() => {
      expect(mockTab.location.href).toBe('/product/argo?wmoid=1234567&cycle=44&depth=0-2000m&date=20240601');
    });
    expect(window.open).toHaveBeenCalledWith('', '_blank');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('disables all buttons while any ID is loading', async () => {
    let resolveFetch!: (val: typeof mockCycles) => void;
    mockFetchQuery.mockReturnValue(
      new Promise((res) => {
        resolveFetch = res;
      }),
    );

    render(<WmoListPopup isOpen={true} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText('[1234567]'));

    await waitFor(() => {
      expect(screen.getByText('[9876543]').closest('button')).toBeDisabled();
    });

    resolveFetch(mockCycles);

    await waitFor(() => {
      expect(screen.getByText('[9876543]').closest('button')).not.toBeDisabled();
    });
  });

  it('closes the blank tab when the fetch fails', async () => {
    const mockTab = { location: { href: '' }, close: vi.fn() };
    vi.spyOn(window, 'open').mockReturnValue(mockTab as unknown as Window);
    mockFetchQuery.mockRejectedValue(new Error('network'));
    render(<WmoListPopup isOpen={true} onClose={vi.fn()} openInNewTab />);
    fireEvent.click(screen.getByText('[1234567]'));
    await waitFor(() => {
      expect(mockTab.close).toHaveBeenCalled();
    });
    expect(mockTab.location.href).toBe('');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('closes the blank tab when no cycles are returned', async () => {
    const mockTab = { location: { href: '' }, close: vi.fn() };
    vi.spyOn(window, 'open').mockReturnValue(mockTab as unknown as Window);
    mockFetchQuery.mockResolvedValue([]);
    render(<WmoListPopup isOpen={true} onClose={vi.fn()} openInNewTab />);
    fireEvent.click(screen.getByText('[1234567]'));
    await waitFor(() => {
      expect(mockTab.close).toHaveBeenCalled();
    });
    expect(mockTab.location.href).toBe('');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate when no cycles are returned', async () => {
    mockFetchQuery.mockResolvedValue([]);
    render(<WmoListPopup isOpen={true} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText('[1234567]'));
    await waitFor(() => {
      expect(screen.getByText('[1234567]').closest('button')).not.toBeDisabled();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(window.open).not.toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { ProductsFacade } from './products.facade';
import { ProductsService } from './products.service';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { ProductSummary } from '../models/product-summary';
import { ApiResponse } from '../../../shared/models/api-response';
import { PagedResponse } from '../../../shared/models/paged-response';
import { describe, it, expect, beforeEach, vi, afterEach, Mock } from 'vitest';

describe('ProductsFacade', () => {
  let facade: ProductsFacade;
  let productsServiceSpy: { getProducts: Mock };
  let queryParamsSubject: BehaviorSubject<ParamMap>;

  const mockProducts: ProductSummary[] = [
    {
      product_id: '1',
      product_name: 'Test Product',
      product_price: 1000,
      product_slug: 'slug',
      product_image: 'test.jpg',
      product_rating: 4.5,
      product_stock: 10,
    },
  ];

  const mockResponse: ApiResponse<PagedResponse<ProductSummary>> = {
    timestamp: '2024-01-01T00:00:00Z',
    status: 200,
    message: 'OK',
    data: {
      content: mockProducts,
      totalPages: 5,
      totalElements: 50,
      size: 10,
      page: 0,
      last: false,
    },
  };

  beforeEach(() => {
    vi.useFakeTimers();
    // Arrange
    productsServiceSpy = {
      getProducts: vi.fn(),
    };
    queryParamsSubject = new BehaviorSubject<ParamMap>(convertToParamMap({}));

    TestBed.configureTestingModule({
      providers: [
        ProductsFacade,
        { provide: ProductsService, useValue: productsServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamsSubject.asObservable(),
            snapshot: { queryParamMap: convertToParamMap({}) },
          },
        },
      ],
    });

    productsServiceSpy.getProducts.mockReturnValue(of(mockResponse));
    facade = TestBed.inject(ProductsFacade);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should initialize and load products with default parameters', () => {
    // Act
    TestBed.flushEffects();
    vi.advanceTimersByTime(500);

    // Assert
    expect(productsServiceSpy.getProducts).toHaveBeenCalledWith({ search: '', page: 0 });
    expect(facade.products()).toEqual(mockProducts);
    expect(facade.totalPages()).toBe(5);
    expect(facade.loading()).toBe(false);
    expect(facade.error()).toBe(null);
  });

  it('should reload products when search query param changes', () => {
    // Arrange
    const searchTerm = 'laptop';

    // Act
    queryParamsSubject.next(convertToParamMap({ search: searchTerm }));
    TestBed.flushEffects();

    // Assert
    expect(facade.search()).toBe(searchTerm);
    expect(productsServiceSpy.getProducts).toHaveBeenCalledWith({ search: searchTerm, page: 0 });
  });

  it('should reload products when page query param changes', () => {
    // Arrange
    const pageNumber = 2;

    // Act
    queryParamsSubject.next(convertToParamMap({ page: pageNumber }));
    TestBed.flushEffects();

    // Assert
    expect(facade.page()).toBe(pageNumber);
    expect(productsServiceSpy.getProducts).toHaveBeenCalledWith({ search: '', page: pageNumber });
  });

  it('should indicate loading state while fetching', () => {
    // Arrange
    const responseSubject = new Subject<ApiResponse<PagedResponse<ProductSummary>>>();
    productsServiceSpy.getProducts.mockReturnValue(responseSubject.asObservable());

    // Act
    queryParamsSubject.next(convertToParamMap({ search: 'loading-test' }));
    TestBed.flushEffects();

    // Assert
    expect(facade.loading()).toBe(true);

    // Act
    responseSubject.next(mockResponse);
    responseSubject.complete();
    vi.advanceTimersByTime(500);

    // Assert
    expect(facade.loading()).toBe(false);
    expect(facade.products()).toEqual(mockProducts);
  });

  it('should set error signal when service fails', () => {
    // Arrange
    productsServiceSpy.getProducts.mockReturnValue(throwError(() => new Error('Network Error')));

    // Act
    queryParamsSubject.next(convertToParamMap({ search: 'fail' }));
    TestBed.flushEffects();

    // Assert
    expect(facade.error()).toBe('Oh no! Something went wrong!');
    expect(facade.loading()).toBe(false);
  });
});

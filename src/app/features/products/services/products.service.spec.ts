import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environement';
import { ApiResponse } from '../../../shared/models/api-response';
import { PagedResponse } from '../../../shared/models/paged-response';
import { ProductSummary } from '../models/product-summary';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}products`;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({
      providers: [ProductsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products with default parameters', () => {
    // Arrange
    const mockResponse: ApiResponse<PagedResponse<ProductSummary>> = {
      timestamp: '2024-01-01T00:00:00Z',
      status: 200,
      message: 'OK',
      data: {
        content: [],
        totalPages: 1,
        totalElements: 0,
        size: 10,
        page: 0,
        last: true,
      },
    };

    // Act
    service.getProducts().subscribe((response) => {
      // Assert
      expect(response).toEqual(mockResponse);
    });

    // Assert
    const req = httpMock.expectOne(
      (req) =>
        req.url === apiUrl && req.params.get('page') === '0' && req.params.get('size') === '10',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch products with search and pagination parameters', () => {
    // Arrange
    const query = { search: 'phone', page: 2, size: 20 };

    // Act
    service.getProducts(query).subscribe();

    // Assert
    const req = httpMock.expectOne(
      (req) =>
        req.url === apiUrl &&
        req.params.get('search') === 'phone' &&
        req.params.get('page') === '2' &&
        req.params.get('size') === '20',
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should include categoryId if provided', () => {
    // Arrange
    const query = { categoryId: '123' };

    // Act
    service.getProducts(query).subscribe();

    // Assert
    const req = httpMock.expectOne(
      (req) => req.url === apiUrl && req.params.get('categoryId') === '123',
    );
    req.flush({});
  });
});

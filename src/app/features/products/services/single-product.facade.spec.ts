import { TestBed } from '@angular/core/testing';
import { SingleProductFacade } from './single-product.facade';
import { ProductsService } from './products.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError, Subject } from 'rxjs';
import { ProductResponse } from '../models/product-response';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

describe('SingleProductFacade', () => {
  let service: SingleProductFacade;
  let productsServiceSpy: { getProductBySlug: Mock };
  let routeMock: { snapshot: { paramMap: { get: Mock } } };

  const mockProduct: ProductResponse = {
    product_id: '1',
    product_name: 'Test Product',
    product_price: 100,
    product_description: 'Description',
    product_stock: 10,
    product_images: [],
    vendor: {
      vendor_id: 'v1',
      vendor_name: 'Vendor',
      vendor_rating: 5,
      vendor_image: 'img',
    },
  };

  beforeEach(() => {
    productsServiceSpy = {
      getProductBySlug: vi.fn(),
    };

    routeMock = {
      snapshot: {
        paramMap: {
          get: vi.fn().mockReturnValue('test-slug'),
        },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        SingleProductFacade,
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(SingleProductFacade);
    expect(service).toBeTruthy();
  });

  it('should load product when slug is present', async () => {
    // Arrange
    productsServiceSpy.getProductBySlug.mockReturnValue(of(mockProduct));

    // Act
    service = TestBed.inject(SingleProductFacade);
    TestBed.flushEffects();

    // Assert
    expect(productsServiceSpy.getProductBySlug).toHaveBeenCalledWith('test-slug');
    expect(service.product()).toEqual(mockProduct);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should handle error when product loading fails', async () => {
    // Arrange
    productsServiceSpy.getProductBySlug.mockReturnValue(
      throwError(() => new Error('Network error')),
    );

    // Act
    service = TestBed.inject(SingleProductFacade);
    TestBed.flushEffects();

    // Assert
    expect(productsServiceSpy.getProductBySlug).toHaveBeenCalledWith('test-slug');
    expect(service.product()).toBeNull();
    expect(service.loading()).toBe(false);
    expect(service.error()).toBe('Produit introuvable');
  });

  it('should not load product when slug is missing', async () => {
    // Arrange
    routeMock.snapshot.paramMap.get.mockReturnValue(null);

    // Act
    service = TestBed.inject(SingleProductFacade);
    TestBed.flushEffects();

    // Assert
    expect(productsServiceSpy.getProductBySlug).not.toHaveBeenCalled();
    expect(service.product()).toBeNull();
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should set loading state while fetching', async () => {
    // Arrange
    const subject = new Subject<ProductResponse>();
    productsServiceSpy.getProductBySlug.mockReturnValue(subject.asObservable());

    // Act
    service = TestBed.inject(SingleProductFacade);
    TestBed.flushEffects();

    // Assert
    expect(service.loading()).toBe(true);

    subject.next(mockProduct);
    subject.complete();

    expect(service.loading()).toBe(false);
    expect(service.product()).toEqual(mockProduct);
  });
});

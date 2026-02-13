export interface CategoryResponse {
  category_id: string;
  category_name: string;
  children: CategoryResponse[];
}

import { LinkDocument } from 'src/schemas/link.schema';

export type PaginatedResponse<T = LinkDocument> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

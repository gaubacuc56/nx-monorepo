import { Result } from "@Domain/result";

export const paginate = async <T, R>(
  repositoryQuery: () => Promise<[T[], number]>,
  pageSize = 10,
  pageNumber = 1,
  mapper?: (entity: T) => R,
): Promise<Result<R[]>> => {
  const [data, totalCount] = await repositoryQuery();

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPreviousPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  const mappedData = mapper ? data.map(mapper) : (data as unknown as R[]);

  return {
    data: mappedData,
    pageSize: pageSize > totalCount && pageNumber === 1 ? totalCount : pageSize,
    pageNumber,
    totalPages,
    totalCount,
    hasPreviousPage,
    hasNextPage,
  };
};
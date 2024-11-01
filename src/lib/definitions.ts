export type ServiceResponse<TData = null> = Promise<{
  error: string | null;
  data: TData | null;
}>;

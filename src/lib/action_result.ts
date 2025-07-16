type ErrorResult = {
  error: string;
  data?: never;
};

type DataResult<DataType> = {
  data: DataType;
  error?: never;
};

export type ActionResult<DataType = undefined> =
  | ErrorResult
  | DataResult<DataType>;

export function success<DataType>(result: DataType): DataResult<DataType>;
export function success(): DataResult<undefined>;
export function success(result: undefined = undefined): DataResult<undefined> {
  return {
    data: result,
  };
}

export function error(message: string): ErrorResult {
  return {
    error: message,
  };
}

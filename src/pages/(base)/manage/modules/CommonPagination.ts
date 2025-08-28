interface CommonPaginationProps {
  searchParams: any;
  setSearchParams: (params: any) => void;
  total: number;
}

export function getPaginationConfig({
  searchParams,
  setSearchParams,
  total,
}: CommonPaginationProps) {
  return {
    current: searchParams.SkipCount / searchParams.MaxResultCount + 1,
    pageSize: searchParams.MaxResultCount,
    pageSizeOptions: ["10", "20", "50", "100"],
    showQuickJumper: false,
    showSizeChanger: true,
    total,
    showTotal: (total: number, range: number[]) =>
      `${range[0]}-${range[1]} of ${total} items`,
    onChange: (page: number, pageSize: number) => {
      setSearchParams({
        ...searchParams,
        SkipCount: (page - 1) * pageSize,
        MaxResultCount: pageSize,
      });
    },
  };
}

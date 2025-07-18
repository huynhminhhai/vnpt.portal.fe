export type StatisticalUse = {
    id: number;
    userName: string;
    name: string;
    emailAddress: string;
    tenantId: number;
    tenancyName: string;
    tenantName: string;
    goiSuDungId: number;
    tenGoiSuDung: string;
    ngayKeThuc: string;
}

export type UserListParams = {
    Sorting: string;
    SkipCount: number;
    MaxResultCount: string;
}

export type UserListResponse = {
    items: StatisticalUse[];
    totalCount: number;
}
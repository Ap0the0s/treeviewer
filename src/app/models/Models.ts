export interface User {
    uuid: string;
    login: string;
    password?: string;
    name?: string | null;
    gender?: number | null;
    birthdate?: string | null;
    email?: string | null;
}

export interface ListNode {
    // uuid: string;
    name: string;
    children?: ListNode[];
}

export interface TreeBuildAccumulator {
    helper?: ListNode[],
    root: ListNode[]
}
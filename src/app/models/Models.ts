export interface ListNode {
    // uuid: string;
    name: string;
    children?: ListNode[];
}

export interface TreeBuildAccumulator {
    helper?: ListNode[],
    root: ListNode[]
}
class TreeNode<T> {
    data: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(data: T) { this.data = data; }
}

export default TreeNode;
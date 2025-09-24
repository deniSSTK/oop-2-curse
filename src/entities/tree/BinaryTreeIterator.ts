import TreeNode from "@entity/tree/TreeNode";

class BinaryTreeIterator<T> implements Iterator<T> {
    private stack: TreeNode<T>[];
    private current: TreeNode<T> | null;

    constructor(root: TreeNode<T> | null) {
        this.stack = [];
        this.current = root;
    }

    next(): IteratorResult<T> {
        while (this.current) {
            this.stack.push(this.current);
            this.current = this.current.left;
        }
        if (this.stack.length === 0) {
            return { value: undefined, done: true };
        }
        const node = this.stack.pop()!;
        const value = node.data;
        this.current = node.right;
        return { value, done: false };
    }
}

export default BinaryTreeIterator;
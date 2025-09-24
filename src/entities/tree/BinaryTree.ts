import TreeNode from "@entity/tree/TreeNode";
import BinaryTreeIterator from "@entity/tree/BinaryTreeIterator";

class BinaryTree<T> implements Iterable<T> {
    root: TreeNode<T> | null = null;
    compareCallBack: (a: T, b: T) => number

    constructor(compareCallBack: (a: T, b: T) => number) {
        this.compareCallBack = compareCallBack;
    }

    insert(data: T) {
        const newNode = new TreeNode(data)
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
        if (this.compareCallBack(newNode.data, node.data) < 0) {
            if (!node.left) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if (!node.right) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    inorder(node: TreeNode<T> | null = this.root, callback: (data: T) => void) {
        if (!node) return;
        this.inorder(node.left, callback);
        callback(node.data);
        this.inorder(node.right, callback);
    }

    [Symbol.iterator](): Iterator<T> {
        return new BinaryTreeIterator(this.root);
    }

    printTree() {
        const traverse = (node: TreeNode<T> | null, prefix = '', isLeft = true) => {
            if (!node) return;

            console.log(prefix + (isLeft ? '├─ ' : '└─ ') + `${node.data}`);

            const newPrefix = prefix + (isLeft ? '│  ' : '   ');
            traverse(node.left, newPrefix, true);
            traverse(node.right, newPrefix, false);
        };

        traverse(this.root, '', false);
    }
}

export default BinaryTree;
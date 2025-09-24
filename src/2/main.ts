//compile to .js using:
//npx esbuild src/2/main.ts --bundle --outfile=src/2/main.js --platform=browser --alias:@entity=./src/entities

import BinaryTree from "@entity/tree/BinaryTree";
import Student from "@entity/Student";
import TreeNode from "@entity/tree/TreeNode";

const compareStudents = (a: Student, b: Student): number => a.age - b.age;

function generateTree(count: number): BinaryTree<Student> {
    const tree = new BinaryTree<Student>(compareStudents);
    const students = Student.generateRandomsList(count);

    for (const s of students) {
        tree.insert(s);
    }
    return tree;
}

function renderTree(tree: BinaryTree<Student>): string {
    let output = "";

    function traverse(node: TreeNode<Student> | null, prefix = "", isLeft = true) {
        if (!node) return;

        output += prefix + (isLeft ? "├─ " : "└─ ") + node.data.toString() + "\n";

        const newPrefix = prefix + (isLeft ? "│  " : "   ");
        traverse(node.left, newPrefix, true);
        traverse(node.right, newPrefix, false);
    }

    traverse(tree.root, "", false);
    return output;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("count") as HTMLInputElement;
    const btn = document.getElementById("generate") as HTMLButtonElement;
    const output = document.getElementById("tree-output") as HTMLPreElement;

    btn.addEventListener("click", () => {
        const count = parseInt(input.value, 10) || 0;
        const tree = generateTree(count);
        output.textContent = renderTree(tree);
    });
});

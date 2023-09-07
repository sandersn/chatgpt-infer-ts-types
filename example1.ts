/** This is a test of the infer from body refactor */
export function parseLogsFromCsv(text) {
    return text.split('\n').map(line => {
        const [timestamp, level, message] = line.split(',');
        return { timestamp, level, message };
    })
}


export interface Node<T> {
    value: T;
    children: Node<T>[]
}
/** this is a test of the extract local refactor
 * 
 * Finds all nodes in the tree that match and returns an array of them.
 * I don't think extracting the locals improves the readability but it shows off the refactor.
 */
export function findAllTree<T>(root: Node<T>, predicate: (t: T) => boolean): Node<T>[] {
    return [
        ...(predicate(root.value) ? [root] : []), 
        ...root.children.flatMap(child => findAllTree(child, predicate))
    ]
}

type Position = {
    start: number;
    end: number;
};

/**
 * this is a test of the extract interface/extract type refactors
 * 
 * PosNode is a node that has a start and end position.
 */
abstract class PosNode implements Node<{ start: number, end: number }> {
    value: { start: number, end: number}
    children: PosNode[]
    abstract emit(): string
    constructor(value: Position, children: PosNode[]) {
        this.value = value
        this.children = children
    }
    /** find a node whose span covers a given position */
    find(pos: number): PosNode | undefined {
        if (this.value.start <= pos && pos < this.value.end) {
            return this
        }
        else {
            for (const child of this.children) {
                if (child.value.start <= pos && pos < child.value.end) {
                    return child.find(pos)
                }
            }
            return undefined
        }
    }
    /** This is a test of suggesting a name for an inferred return type */
    childSpans() {
        return this.children.map(child => child.value)
    }
}
/** This is a test of the implement interface refactor
 * 
 * Synthetic terminal nodes have no children and their payload is just a kind identifier.
 */
class SyntheticTerminalNode implements Node<string & { __tag: any }> {
}

/**
 * This is a test of the implement abstract class refactor
 * 
 * BinaryExpression is a node that has left and right children with an operator in the middle.
 */
class BinaryExpression extends PosNode {
    op: string;
    left: PosNode;
    right: PosNode;

    constructor(op: string, left: PosNode, right: PosNode) {
        super({ start: left.value.start, end: right.value.end }, [left, right]);
        this.op = op;
        this.left = left;
        this.right = right;
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


/**
 * Node for to-do item
 */
export class TreeItemNode {
  id: string;
  children: TreeItemNode[];
  item: string;
  code: string;
}

/** Flat to-do item node with expandable and level information */
export class TreeItemFlatNode {
  id: string;
  item: string;
  level: number;
  expandable: boolean;
  code: string;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = [
  { text: 'Turkiye', code: '0.1' },
  { text: 'istanbul', code: '0.1.1' },
  { text: 'Beykoz', code: '0.1.1.1' },
  { text: 'Fatih', code: '0.1.1.1' },
  { text: 'Ankara', code: '0.1.2' },
  { text: 'Cankaya', code: '0.1.2.1' },
  { text: 'Etimesgut', code: '0.1.2.1' },
  { text: 'Elazig', code: '0.1.3' },
  { text: 'Palu', code: '0.1.3.1' },
  { text: 'Baskil', code: '0.1.3.2' },
  { text: 'Sivrice', code: '0.1.3.3' }
];

@Injectable()
export class MstreeService {
  dataChange = new BehaviorSubject<TreeItemNode[]>([]);
  treeData: any[];
  get data(): TreeItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.treeData = TREE_DATA;
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, '0');
    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */

  buildFileTree(obj: any[], level: string, parentId: string = '0'): TreeItemNode[] {
    return obj.filter(o =>
      (o.code as string).startsWith(level + '.')
      && (o.code.match(/\./g) || []).length === (level.match(/\./g) || []).length + 1
    )
      .map((o, idx) => {
        const node = new TreeItemNode();
        node.item = o.text;
        node.code = o.code;

        /**
         * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
         * By passing parentId to buildFileTree, it constructs a path of indexes which make
         * it possible find the exact sub-array that the node was grabbed from when dropped.
         */
        node.id = `${parentId}/${idx}`;

        console.log(node.id)

        const children = obj.filter(so => (so.code as string).startsWith(level + '.'));
        if (children && children.length > 0) {
          node.children = this.buildFileTree(children, o.code, node.id);
        }
        console.log(node)
        return node;
      });
  }

  public filter(filterText: string) {
    let filteredTreeData;
    if (filterText) {
      filteredTreeData = this.treeData.filter(d => d.text.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1);
      Object.assign([], filteredTreeData).forEach(ftd => {
        let str = (ftd.code as string);
        while (str.lastIndexOf('.') > -1) {
          const index = str.lastIndexOf('.');
          str = str.substring(0, index);
          if (filteredTreeData.findIndex(t => t.code === str) === -1) {
            const obj = this.treeData.find(d => d.code === str);
            if (obj) {
              filteredTreeData.push(obj);
            }
          }
        }
      });
    } else {
      filteredTreeData = this.treeData;
    }

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    // file node as children.
    const data = this.buildFileTree(filteredTreeData, '0');
    // Notify the change.
    this.dataChange.next(data);
  }

}
